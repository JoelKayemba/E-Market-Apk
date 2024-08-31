import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, Dimensions, ImageBackground } from 'react-native';
import ClientStyle from '../../Styles/ClientStyle';
import Color from '../../Styles/Color';

const { width: viewportWidth } = Dimensions.get('window');

const Publicite = () => {
  const images = [
    { source: require('../../assets/services/pub.jpg'), title: 'Services', description: 'Decouvrez tous les services' },
    { source: require('../../assets/Images/imagesProduits/fashion3.jpg'), title: 'Pomotion', description: 'Venez decouvrir les grandes promo disponible' },
    { source: require('../../assets/Images/imagesProduits/food3.jpg'), title: 'Restaurants', description: 'Explorez nos meilleurs restaurants' },
    { source: require('../../assets/Images/imagesProduits/health4.jpg'), title: 'Santé', description: 'Consultez les meilleures pharmacies' },
    { source: require('../../assets/Images/imagesProduits/furniture1.jpg'), title: 'Immobilier', description: 'Voir les biens immobiliers' },
    { source: require('../../assets/Images/imagesProduits/beauty3.jpg'), title: 'Beauté', description: 'Faites places à la beauté' },
  ];

  return (
    <View style={ClientStyle.containerPub}>
      <View style={ClientStyle.textPub}>
        <Text style={ClientStyle.textPourToi}>#PourToi</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        style={ClientStyle.containerImagePub}
      >
        {images.map((item, index) => (
          <View key={index} style={styles.carouselItem}>
            <ImageBackground source={item.source} style={styles.imagePub} imageStyle={styles.imageBackground}>
              <View style={styles.overlay}>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                  <Pressable style={styles.overlayButton} onPress={() => alert('Bouton cliqué')}>
                    <Text style={styles.overlayButtonText}>Consulter</Text>
                  </Pressable>
                </View>
              </View>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 0,
  },
  carouselItem: {
    width: viewportWidth * 0.8, // Adjust width as needed
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15, // Rounded corners
    overflow: 'hidden',
  },
  imagePub: {
    width: '100%',
    height: 150, 
    borderRadius: 15, 
  },
  imageBackground: {
    borderRadius: 15, 
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 15, 
  },
  textContainer: {
    paddingLeft: 20,
    paddingTop: 20,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginBottom: 15,
    fontFamily:'InriaSerif'
  },
  overlayButton: {
    backgroundColor: Color.bleuTransparent,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: 115,
    marginTop:-5
  },
  overlayButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily:'InriaSerif'
  },
});

export default Publicite;
