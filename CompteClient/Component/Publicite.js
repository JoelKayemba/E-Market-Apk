// Publicite.js
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet,Text, View, Image, Animated, Pressable,Dimensions } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import ClientStyle from '../../Styles/ClientStyle';
import Color from '../../Styles/Color';
import { useNavigation } from '@react-navigation/native';

const { width: viewportWidth } = Dimensions.get('window');

const Publicite = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();

  const images = [
    { source: require('../../assets/Images/pub.jpg'), text: 'Texte sur l\'image 1' },
    { source: require('../../assets/Images/boutique1.jpg'), text: 'Texte sur l\'image 2' },
    { source: require('../../assets/Images/boutique2.jpg'), text: 'Texte sur l\'image 3' },
    { source: require('../../assets/Images/boutique3.jpg'), text: 'Texte sur l\'image 4' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      scrollViewRef.current.scrollTo({
        x: viewportWidth * ((currentIndex + 1) % images.length),
        animated: true,
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / viewportWidth);
    setCurrentIndex(index);
  };

  return (
    <View style={ClientStyle.containerPub}>
      <View style={ClientStyle.textPub}>
        <Text style={ClientStyle.textPourToi}>#PourToi</Text>
        
      </View>
      <View style={ClientStyle.containerImagePub}>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          ref={scrollViewRef}
          style={ClientStyle.scrollView}
        >
          {images.map((item, index) => (
            <View key={index} style={styles.carouselItem}>
              <Image source={item.source} style={styles.imagePub} />
              <View style={ClientStyle.overlay}>
                <Text style={ClientStyle.overlayText}>{item.text}</Text>
                <Pressable style={ClientStyle.overlayButton} onPress={() => alert('Bouton cliqué')}>
                  <Text style={ClientStyle.overlayButtonText}>Consulter</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
        <View style={ClientStyle.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                ClientStyle.paginationDot,
                currentIndex === index && ClientStyle.activeDot,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    width: viewportWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePub: {
    width: viewportWidth,
    height: 170,
    flex: 1,
  },
});

export default Publicite;
