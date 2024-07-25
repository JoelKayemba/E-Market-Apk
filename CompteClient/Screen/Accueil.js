import { StyleSheet, Text, View, Image, Pressable, TextInput, TouchableOpacity, Dimensions, Animated , ScrollView} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { AntDesign, Entypo, Feather ,FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import GlobalStyles from '../../Styles/GlobalStyles';
import Color from '../../Styles/Color';
import ClientStyle from '../../Styles/ClientStyle';

const { width: viewportWidth } = Dimensions.get('window');

const Accueil = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

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
    }, 4000); // Changer d'image toutes les 5 secondes

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / viewportWidth);
    setCurrentIndex(index);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={ClientStyle.containerRecherche}>
          <View style={ClientStyle.inputContainer}>
            <AntDesign name="search1" size={20} color={Color.grisIcone} />
            <TextInput
              style={ClientStyle.input}
              placeholder='Recherche'
            />
          </View>
          <TouchableOpacity style={ClientStyle.adresse} onPress={() => alert('cliquée')}>
            <Entypo name="location-pin" size={15} color={Color.orange} style={ClientStyle.iconeAdresse} />
            <Text style={ClientStyle.textAdresse}>325 2e Rue Est, Rimouski, Quebec</Text>
          </TouchableOpacity>
        </View>

        <View style={ClientStyle.containerCategorie}>
          <Text style={ClientStyle.categorieText}>Catégorie</Text>
          <View style={ClientStyle.firstCategorie}>
            <TouchableOpacity style={ClientStyle.containerType} onPress={() => alert('cliquée')}>
              <View style={ClientStyle.cercleCategorie}>
                <Image
                  source={require('../../assets/icones/electronic.png')}
                  style={ClientStyle.iconeCategorie}
                />
              </View>
              <Text style={ClientStyle.typeCategorie}>Electronique</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ClientStyle.containerType} onPress={() => alert('cliquée')}>
              <View style={ClientStyle.cercleCategorie}>
                <Image
                  source={require('../../assets/icones/food.png')}
                  style={ClientStyle.iconeCategorie}
                />
              </View>
              <Text style={ClientStyle.typeCategorie}>Food & drink</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ClientStyle.containerType} onPress={() => alert('cliquée')}>
              <View style={ClientStyle.cercleCategorie}>
                <Image
                  source={require('../../assets/icones/accessoire.png')}
                  style={ClientStyle.iconeCategorie}
                />
              </View>
              <Text style={ClientStyle.typeCategorie2}>Accessoire</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ClientStyle.containerType} onPress={() => alert('cliquée')}>
              <View style={ClientStyle.cercleCategorie}>
                <Image
                  source={require('../../assets/icones/beauty.png')}
                  style={ClientStyle.iconeCategorie}
                />
              </View>
              <Text style={ClientStyle.typeCategorie1}>Beauté</Text>
            </TouchableOpacity>
          </View>

          <View style={ClientStyle.secondCategorie}>
            <TouchableOpacity style={ClientStyle.containerType} onPress={() => alert('cliquée')}>
              <View style={ClientStyle.cercleCategorie}>
                <Image
                  source={require('../../assets/icones/furniture.png')}
                  style={ClientStyle.iconeCategorie}
                />
              </View>
              <Text style={ClientStyle.typeCategorie2}>Fourniture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ClientStyle.containerType} onPress={() => alert('cliquée')}>
              <View style={ClientStyle.cercleCategorie}>
                <Image
                  source={require('../../assets/icones/fashion.png')}
                  style={ClientStyle.iconeCategorie}
                />
              </View>
              <Text style={ClientStyle.typeCategorie1}>Fashion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ClientStyle.containerType} onPress={() => alert('cliquée')}>
              <View style={ClientStyle.cercleCategorie}>
                <Image
                  source={require('../../assets/icones/health.png')}
                  style={ClientStyle.iconeCategorie}
                />
              </View>
              <Text style={ClientStyle.typeCategorie3}>Santé</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ClientStyle.containerType} onPress={() => alert('cliquée')}>
              <View style={ClientStyle.cercleCategorie}>
                <Image
                  source={require('../../assets/icones/stationery.png')}
                  style={ClientStyle.iconeCategorie}
                />
              </View>
              <Text style={ClientStyle.typeCategorie1}>Papeterie</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={ClientStyle.containerPub}>
          <View style={ClientStyle.textPub}>
            <Text style={ClientStyle.textPourToi}>#PourToi</Text>
            <Pressable onPress={() => alert('Voir tout')}>
              <Text style={ClientStyle.textVoirTout}>Voir tout</Text>
            </Pressable>
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

        <View style={ClientStyle.containerRecommandation}>
          <Text style={ClientStyle.textPourToi}>Recommandation</Text>
          <Pressable onPress={()=> alert('Cliqué')}>
            <Text style={ClientStyle.textVoirTout}>Voir tout</Text>
          </Pressable>
        </View>
        <View style={ClientStyle.containerProduitRecommander}>
          <View style={ClientStyle.produitRecommander}>
            <Image
              source={require('../../assets/Images/produit1.jpg')}
              style={ClientStyle.imageProduit}
            />
             <View style={ClientStyle.heartIconContainer}>
              <AntDesign name="hearto" size={15} color={Color.orange} />
            </View>
            <Text style={ClientStyle.nomProduit}>Nike pro</Text>
            <Text style={ClientStyle.prixProduit}>$180</Text>
            <Text style={ClientStyle.nomBoutique}>Boutique: Jacob Didier</Text>
            <View style={ClientStyle.infoProduit}>
              <View style={ClientStyle.quantity}> 
                <Text style={ClientStyle.textQuantite}>Qt:</Text>
                <Text style={ClientStyle.quantite}>10</Text>
              </View>
              <View style={ClientStyle.iconDelivery}>
                <MaterialCommunityIcons name="truck-delivery" size={24} color={Color.vert} />
                <Entypo name="phone" size={24} color={Color.desactiver} />
              </View>
             
            </View>
          </View>
          <View style={ClientStyle.produitRecommander}>
            <Image
              source={require('../../assets/Images/produit2.jpg')}
              style={ClientStyle.imageProduit}
            />
             <View style={ClientStyle.heartIconContainer}>
              <AntDesign name="hearto" size={15} color={Color.orange} />
            </View>
            <Text style={ClientStyle.nomProduit}>New Balance</Text>
            <Text style={ClientStyle.prixProduit}>$289</Text>
            <Text style={ClientStyle.nomBoutique}>Boutique: mere double</Text>
            <View style={ClientStyle.infoProduit}>
              <View style={ClientStyle.quantity}> 
                <Text style={ClientStyle.textQuantite}>Qt:</Text>
                <Text style={ClientStyle.quantite}>10</Text>
              </View>
              <View style={ClientStyle.iconDelivery}>
                <MaterialCommunityIcons name="truck-delivery" size={24} color={Color.desactiver} />
                <Entypo name="phone" size={24} color={Color.vert} />
              </View>
             
            </View>
          </View>
        </View>
        <View style={ClientStyle.containerProduitRecommander}>
          <View style={ClientStyle.produitRecommander}>
            <Image
              source={require('../../assets/Images/c.jpg')}
              style={ClientStyle.imageProduit}
            />
             <View style={ClientStyle.heartIconContainer}>
              <AntDesign name="hearto" size={15} color={Color.orange} />
            </View>
            <Text style={ClientStyle.nomProduit}>MacBook PRO</Text>
            <Text style={ClientStyle.prixProduit}>$1800</Text>
            <Text style={ClientStyle.nomBoutique}>Boutique: Maison Apple</Text>
            <View style={ClientStyle.infoProduit}>
              <View style={ClientStyle.quantity}> 
                <Text style={ClientStyle.textQuantite}>Qt:</Text>
                <Text style={ClientStyle.quantite}>7</Text>
              </View>
              <View style={ClientStyle.iconDelivery}>
                <MaterialCommunityIcons name="truck-delivery" size={24} color={Color.vert} />
                <Entypo name="phone" size={24} color={Color.vert} />
              </View>
             
            </View>
          </View>
          <View style={ClientStyle.produitRecommander}>
            <Image
              source={require('../../assets/Images/b.jpg')}
              style={ClientStyle.imageProduit}
            />
             <View style={ClientStyle.heartIconContainer}>
              <AntDesign name="hearto" size={15} color={Color.orange} />
            </View>
            <Text style={ClientStyle.nomProduit}>Appareil Photo</Text>
            <Text style={ClientStyle.prixProduit}>$125</Text>
            <Text style={ClientStyle.nomBoutique}>Boutique: Photo Mbiye</Text>
            <View style={ClientStyle.infoProduit}>
              <View style={ClientStyle.quantity}> 
                <Text style={ClientStyle.textQuantite}>Qt:</Text>
                <Text style={ClientStyle.quantite}>3</Text>
              </View>
              <View style={ClientStyle.iconDelivery}>
                <MaterialCommunityIcons name="truck-delivery" size={24} color={Color.desactiver} />
                <Entypo name="phone" size={24} color={Color.vert} />
              </View>
             
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
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
    flex:1,
  },
  
});

export default Accueil;
