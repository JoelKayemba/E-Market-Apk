import React from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Video } from 'expo-av';

// Dimensions de l'écran pour faire en sorte que la vidéo occupe toute la largeur et hauteur
const { width, height } = Dimensions.get('window');

const videoData = [
  { id: '1', uri: require('../../assets/Videos/1.mp4') },
  { id: '2', uri: require('../../assets/Videos/1.mp4') },
  
];

const VideoItem = ({ uri }) => (
  <View style={styles.videoContainer}>
    <Video
      source={{ uri }}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      resizeMode="cover"
      shouldPlay
      isLooping
      style={styles.video}
    />
  </View>
);

const Annonce = () => {
  return (
    <FlatList
      data={videoData}
      renderItem={({ item }) => <VideoItem uri={item.uri} />}
      keyExtractor={item => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width,
    height,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default Annonce;
