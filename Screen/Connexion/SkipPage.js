import React, { useRef, useEffect, useState } from 'react';
import { View, ScrollView, Image, Animated, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Color from '../../Styles/Color';
import useAuth from '../../hook/useAuth';

const SkipPage = ({ navigation }) => {
  const scrollViewRef = useRef(null);
  const screenHeight = Dimensions.get('window').height;
  const scrollY = useRef(new Animated.Value(0)).current;
  const iconPosition = useRef(new Animated.Value(0)).current;
  const [showButton, setShowButton] = useState(false);

  useAuth(); //permet de rediriger direcement en page d'accueil s'il y a deja eu connexion 

  const images = [
    require('../../assets/imageBack/a.jpg'),
    require('../../assets/imageBack/b.jpg'),
    require('../../assets/imageBack/c.jpg'),
    require('../../assets/imageBack/d.jpg'),
    
  ];

  const texts = [
    { main: 'Bienvenue dans notre plateforme E-Market', description: 'Votre guichet unique pour tous vos besoins de shopping.' },
    { main: 'Découvrez des produits de qualité', description: 'Nous offrons une gamme variée de produits premium.' },
    { main: 'Trouvez ce dont vous avez besoin', description: 'Parcourez nos catégories pour trouver des articles parfaits pour vous.' },
    { main: 'Connectez-vous et profitez de nos offres', description: 'Inscrivez-vous pour recevoir des offres exclusives et des remises.' },
  ];

  const animatedValues = images.map((_, index) => new Animated.Value(0));

  const handleSkip = () => {
    navigation.navigate('Bienvenue');
  };

  const handleScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const pageIndex = Math.floor(contentOffsetY / screenHeight);
    if (pageIndex === images.length - 1) {
      setShowButton(true);
      // Passer automatiquement à la page de connexion après un délai
      setTimeout(() => {
        navigation.navigate('Bienvenue');
      }, 3000); // Délai de 3 secondes avant de naviguer
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    const animations = animatedValues.map((animatedValue, index) =>
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        delay: index * 1000,
      })
    );

    Animated.stagger(500, animations).start();

    // Animation mouvement icône
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconPosition, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(iconPosition, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const iconTranslateY = iconPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  const scrollToEnd = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        vertical
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
          listener: handleScroll,
        })}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <View key={index} style={{ height: screenHeight }}>
            <Image source={image} style={styles.image} />
            <Animated.View style={[styles.textContainer, { opacity: animatedValues[index] }]}>
              <Text style={styles.text}>{texts[index].main}</Text>
              <Text style={styles.description}>{texts[index].description}</Text>
            </Animated.View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((_, index) => {
          const opacity = scrollY.interpolate({
            inputRange: [
              screenHeight * (index - 1),
              screenHeight * index,
              screenHeight * (index + 1)
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
          });
          return (
            <Animated.View key={index} style={[styles.dot, { opacity }]} />
          );
        })}
      </View>
      {!showButton && (
        <TouchableOpacity style={styles.iconButton} onPress={scrollToEnd}>
          <Animated.View style={[{ transform: [{ translateY: iconTranslateY }] }]}>
            <Entypo name="arrow-long-down" size={24} color="white" />
          </Animated.View>
        </TouchableOpacity>
      )}
      {showButton && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Passer</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 200,
    marginRight: 50,
  },
  text: {
    fontSize: 32,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontWeight: '700',
  },
  description: {
    fontSize: 15,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontWeight: '300',
  
  },
  iconButton: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    backgroundColor: Color.orange,
    padding: 10,
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    opacity:0.5
  },
  skipButton: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    backgroundColor: Color.orange,
    padding: 10,
    borderRadius: 10,
  },
  skipButtonText: {
    color: 'white',
    fontSize: 16,
  },
  pagination: {
    position: 'absolute',
    left:10,
    marginTop:300,
    top: Dimensions.get('window').height / 2,
    transform: [{ translateY: -Dimensions.get('window').height / 2 }],
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Color.orange,
    marginVertical: 8,
  },
});

export default SkipPage;
