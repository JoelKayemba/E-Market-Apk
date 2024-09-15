// page pour afficher les produits par categorie

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Image, Animated , ActivityIndicator} from 'react-native';
import ClientStyle from '../../Styles/ClientStyle';
import Color from '../../Styles/Color';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign, FontAwesome, MaterialCommunityIcons , Ionicons, MaterialIcons} from '@expo/vector-icons';
import produits from '../data/produits';
import Recherche from '../Component/Recherche';

const ImageWithFallback = ({ source, style }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleImageLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <View style={{ position: 'relative' }}>
      {loading && <ActivityIndicator style={styles.imageFallback} color={Color.orange}/>}
      {error && <MaterialIcons name="error" size={24} color="black" style={styles.error} />}
      <Image
        source={source}
        style={style}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </View>
  );
};

const LikeNotification = ({ show }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (show) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          delay: 500,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [show]);

  if (!show) return null;

  return (
    <Animated.View style={[styles.notificationContainer, { opacity }]}>
      <Text style={styles.notificationText}>Aimé!</Text>
    </Animated.View>
  );
};

const CategorieProduit = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { categorie } = route.params;  
  const [likedProducts, setLikedProducts] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  // Filtrer les produits selon la catégorie
  const filteredProduits = produits.filter(produit => produit.categorie === categorie);

  const toggleLike = (id) => {
    setLikedProducts((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter(productId => productId !== id);
      } else {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 1000);
        return [...prevState, id];
      }
    });
  };

  // pour gerer le nombre de lettre
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const handlePress = (item) => {
    navigation.navigate('PageMonProduit', { item });
  };

  const renderItem = ({ item }) => {
    const isLiked = likedProducts.includes(item.id);

    return (
      <TouchableOpacity style={ClientStyle.produitRecommander} onPress={() => handlePress(item)}>
        <ImageWithFallback
          source={item.image}
          style={ClientStyle.imageProduit}
        />
        <TouchableOpacity
          style={ClientStyle.heartIconContainer}
          onPress={() => toggleLike(item.id)}
        >
          <AntDesign name={isLiked ? "heart" : "hearto"} size={15} color={Color.orange} />
        </TouchableOpacity>
        <View style={ClientStyle.nomProduitContainer}>
          <Text style={ClientStyle.nomProduit} numberOfLines={1} ellipsizeMode='tail'>
            {truncateText(item.nom, 15)}
          </Text>
          <MaterialCommunityIcons
            name="truck-delivery"
            size={20}
            color={item.livraison ? Color.vert : 'gray'}
            style={ClientStyle.iconDelivery}
          />
        </View>
        <View style={styles.nomBoutique}>
            <Text style={styles.textNomBoutique}>
                {item.nomBoutique}
            </Text>
        </View>
        <View style={styles.ligne2}>
          <Text style={ClientStyle.prixProduit}>${item.prix}</Text>
          <TouchableOpacity style={styles.location} onPress={() => alert('Localisation')}>
            <FontAwesome name="location-arrow" size={15} color="white" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
          <MaterialIcons name="arrow-back-ios" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.titreCategorie}>{categorie}</Text>
      </View>
      
    </View>
  );

  return (
    <View style={ClientStyle.containerProduitRecommander}>
      <FlatList
        data={filteredProduits}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={ClientStyle.columnWrapper}
        contentContainerStyle={styles.flatListContainer}
        ListHeaderComponent={renderHeader} // Utilisation du renderHeader
      />
      <LikeNotification show={showNotification} />
    </View>
  );
};

const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    height: 80,
    
  },
  titreCategorie: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    
  },
  ligne2: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  location: {
    backgroundColor: Color.bleuTransparent,
    width: 20,
    height: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginRight: 5
  },
  imageFallback: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -10 }],
    textAlign: 'center',
    color: Color.orange,
    marginLeft:30
},
error:{
    justifyContent:'center',
    alignItems:'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -10 }],
    textAlign: 'center',
    color: 'lightgray',
    marginLeft:30
},
  notificationContainer: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: Color.orange,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    zIndex: 1
  },
  notificationText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  },
  backIcon: {
    marginRight: 10,
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  containerRecherche: {
    marginHorizontal: 20,
    marginBottom: 10
  },
  flatListContainer: {
    paddingBottom: 20, // Utilisation du paddingBottom pour créer de l'espace au bas de la liste
    
  },
  nomBoutique:{
    marginLeft:5
  },
  textNomBoutique:{
      fontFamily:'InriaSerif',
      fontSize:10
  }
});

export default CategorieProduit;
