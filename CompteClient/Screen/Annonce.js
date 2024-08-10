import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { Video } from 'expo-av';
import { FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';
import Color from '../../Styles/Color';

const { width, height } = Dimensions.get('window');

const videoData = [
  {
    id: '1',
    uri: require('../../assets/Videos/1.mp4'),
    profileImage: require('../../assets/Images/boutique1.jpg'),
  },
  {
    id: '2',
    uri: require('../../assets/Videos/2.mp4'),
    profileImage: require('../../assets/Images/boutique2.jpg'),
  },
  
];

const VideoItem = ({ uri, profileImage, isVisible }) => {
  const videoRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleVideoPress = () => {
    if (isPaused) {
      videoRef.current.playAsync();
      setIsPaused(false);
    } else {
      videoRef.current.pauseAsync();
      setIsPaused(true);
    }
  };

  if (videoRef.current) {
    if (isVisible && !isPaused) {
      videoRef.current.playAsync();
    } else {
      videoRef.current.pauseAsync();
    }
  }

  return (
    <View style={styles.videoContainer}>
      <TouchableOpacity style={styles.videoTouchable} onPress={handleVideoPress}>
        <Video
          ref={videoRef}
          source={uri}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={false}
          isLooping
          style={styles.video}
        />
        {isPaused && (
          <FontAwesome
            name="play"
            size={100}
            color={Color.orange}
            style={styles.pauseIcon}
          />
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreButtonText}>En savoir plus</Text>
      </TouchableOpacity>

      <View style={styles.iconColumn}>
        <TouchableOpacity style={styles.profileIcon}>
          <Image
            source={profileImage}
            style={styles.profileImage}
          />
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

const Annonce = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setVisibleIndex(viewableItems[0].index);
    }
  });

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // Se déclenche quand 50% de l'élément est visible
  };

  return (
    <FlatList
      data={videoData}
      renderItem={({ item, index }) => (
        <VideoItem
          uri={item.uri}
          profileImage={item.profileImage}
          isVisible={visibleIndex === index}
        />
      )}
      keyExtractor={item => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig}
      snapToInterval={height} // Chaque élément occupe la pleine hauteur de l'écran
      decelerationRate="fast" // Pour un défilement rapide entre les éléments
    />
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width,
    height,
    justifyContent: 'flex-end', // Positionner les éléments en bas
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
  pauseIcon: {
    position: 'absolute',
    alignSelf: 'center',
    opacity: 0.7, // Semi-transparence
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
