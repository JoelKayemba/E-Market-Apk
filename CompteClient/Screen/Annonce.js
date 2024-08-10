import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Video } from 'expo-av';
import { FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';
import Color from '../../Styles/Color';

const { width, height } = Dimensions.get('window');

const Annonce = () => {
  const [annonces, setAnnonces] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const videoRefs = useRef([]);

  const fetchAnnonces = async () => {
    try {
      const response = await fetch('http://192.168.21.25:3300/annonce/annonces');
      const result = await response.json();
      setAnnonces(result.annonces);
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAnnonces();
    }, [])
  );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const currentIndex = viewableItems[0].index;
      setVisibleIndex(currentIndex);

      videoRefs.current.forEach((videoRef, index) => {
        if (videoRef && index !== currentIndex) {
          videoRef.stopAsync();
        }
      });

      const currentVideoRef = videoRefs.current[currentIndex];
      if (currentVideoRef) {
        currentVideoRef.playAsync();
      }
    }
  });

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  // Filtrer les annonces selon la recherche
  const filteredAnnonces = annonces.filter((annonce) =>
    annonce.titre.toLowerCase().includes(searchText.toLowerCase()) ||
    annonce.description.toLowerCase().includes(searchText.toLowerCase())
  );

  // Utiliser les annonces filtrées ou toutes les annonces si aucune correspondance
  const dataToRender = filteredAnnonces.length > 0 ? filteredAnnonces : annonces;

  const renderItem = ({ item, index }) => (
    <VideoItem
      uri={item.video ? `http://192.168.21.25:3300/uploads/${item.video}` : `http://192.168.21.25:3300/uploads/${item.image}`} 
      profileImage={item.image ? `http://192.168.21.25:3300/uploads/${item.image}` : null} 
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
    if (isVisible && !isPaused) {
      videoRefInternal.current.playAsync();
    }
  }, [isVisible, isPaused]);

  const handleVideoPress = () => {
    if (isPaused) {
      videoRefInternal.current.playAsync();
      setIsPaused(false);
    } else {
      videoRefInternal.current.pauseAsync();
      setIsPaused(true);
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
            isLooping
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
    backgroundColor: 'black',
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
