import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Video } from 'expo-av';
import { FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';
import Color from '../../Styles/Color';
import API_BASE_URL from '../../ApiConfig';

const { width, height } = Dimensions.get('window');

const Annonce = () => {
  const [annonces, setAnnonces] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const videoRefs = useRef([]);

  const fetchAnnonces = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/annonce/annonces`);
      const result = await response.json();
      setAnnonces(result.annonces);
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAnnonces();

      return () => {
        videoRefs.current.forEach((videoRef) => {
          if (videoRef) {
            try {
              videoRef.stopAsync();
            } catch (error) {
              console.error('Erreur lors de l\'arrêt de la vidéo:', error);
            }
          }
        });
      };
    }, [])
  );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const currentIndex = viewableItems[0].index;
      setVisibleIndex(currentIndex);
    }
  });

  useEffect(() => {
    const manageVideoPlayback = async () => {
      for (let i = 0; i < videoRefs.current.length; i++) {
        const videoRef = videoRefs.current[i];
        if (videoRef && videoRef.current) {
          try {
            if (i === visibleIndex) {
              await videoRef.current.playAsync();
            } else {
              await videoRef.current.pauseAsync();
            }
          } catch (error) {
            console.error(`Erreur lors de la gestion de la vidéo à l'index ${i}:`, error);
          }
        }
      }
    };

    manageVideoPlayback();

  }, [visibleIndex]);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const filteredAnnonces = annonces.filter((annonce) =>
    annonce.titre.toLowerCase().includes(searchText.toLowerCase()) ||
    annonce.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const dataToRender = filteredAnnonces.length > 0 ? filteredAnnonces : annonces;

  const renderItem = ({ item, index }) => (
    <VideoItem
      uri={item.video ? `${API_BASE_URL}/uploads/${item.video}` : `${API_BASE_URL}/uploads/${item.image}`} 
      profileImage={item.image ? `${API_BASE_URL}/uploads/${item.image}` : null} 
      isVisible={visibleIndex === index}
      videoRef={(ref) => (videoRefs.current[index] = ref)} 
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="white" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Rechercher..."
          placeholderTextColor="white"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <FlatList
        data={dataToRender}
        renderItem={renderItem}
        keyExtractor={(item) => item.idannonce.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
        snapToInterval={height}
        decelerationRate="fast"
      />
    </View>
  );
};

const VideoItem = ({ uri, profileImage, isVisible, videoRef }) => {
  const videoRefInternal = useRef(null);
  const [liked, setLiked] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [videoSize, setVideoSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const playVideo = async () => {
      if (isVisible && !isPaused) {
        try {
          await videoRefInternal.current.playAsync();
        } catch (error) {
          console.error('Erreur lors de la lecture de la vidéo:', error);
        }
      } else {
        try {
          await videoRefInternal.current.pauseAsync();
        } catch (error) {
          console.error('Erreur lors de la pause de la vidéo:', error);
        }
      }
    };

    playVideo();

    return () => {
      if (videoRefInternal.current) {
        try {
          videoRefInternal.current.pauseAsync();
        } catch (error) {
          console.error('Erreur lors de l\'arrêt de la vidéo:', error);
        }
      }
    };
  }, [isVisible]);

  const handleVideoPress = async () => {
    try {
      if (isPaused) {
        await videoRefInternal.current.playAsync();
        setIsPaused(false);
      } else {
        await videoRefInternal.current.pauseAsync();
        setIsPaused(true);
      }
    } catch (error) {
      console.error('Erreur lors du contrôle de la vidéo:', error);
    }
  };

  const onVideoLoad = (status) => {
    const { width, height } = status.naturalSize || {};
    if (width && height) {
      setVideoSize({ width, height });
    }
  };

  const isLandscape = videoSize.width > videoSize.height;

  return (
    <View style={styles.videoContainer}>
      {uri.endsWith('.mp4') ? (
        <TouchableOpacity style={styles.videoTouchable} onPress={handleVideoPress}>
          <Video
            ref={(ref) => {
              videoRef(ref);
              videoRefInternal.current = ref;
            }}
            source={{ uri }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode={isLandscape ? 'contain' : 'cover'}
            shouldPlay={false}
            isLooping={true} // La vidéo se répète à l'infini
            onLoad={onVideoLoad}
            style={[
              styles.video,
              isLandscape && {
                width: '100%',
                height: '70%',
                alignSelf: 'center',
              }
            ]}
          />
          {isPaused && (
            <FontAwesome
              name="play"
              size={100}
              color='white'
              style={styles.pauseIcon}
            />
          )}
        </TouchableOpacity>
      ) : (
        <Image
          source={{ uri }}
          style={styles.video}
        />
      )}

      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreButtonText}>En savoir plus</Text>
      </TouchableOpacity>

      <View style={styles.iconColumn}>
        <TouchableOpacity style={styles.profileIcon}>
          {profileImage && (
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLiked(!liked)}>
          <FontAwesome
            name={liked ? "heart" : "heart-o"}
            size={25}
            color={liked ? "red" : "white"}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon}>
          <Entypo name="share" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    width,
    height,
    justifyContent: 'flex-end',
  },
  videoTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  searchContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    borderRadius: 20,
    marginHorizontal: 20,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchBar: {
    height: 40,
    color: 'white',
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 16,
    flex: 1,
  },
  pauseIcon: {
    position: 'absolute',
    alignSelf: 'center',
    opacity: 0.7,
  },
  moreButton: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    backgroundColor: Color.bleuTransparent,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  moreButtonText: {
    color: 'white',
    fontSize: 16,
  },
  iconColumn: {
    position: 'absolute',
    right: 10,
    bottom: 300,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  profileIcon: {
    marginBottom: 20,
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 25,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Annonce;
