import React from 'react';
import { StyleSheet, View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import ClientStyle from '../../Styles/ClientStyle';
import Color from '../../Styles/Color';


// Exemple de données pour les catégories
const categories = [
  { id: '1', nom: 'Electronique', image: require('../../assets/Images/imagesProduits/electronic1.jpg') },
  { id: '2', nom: 'Alimentation', image: require('../../assets/Images/Categorie/food9.jpg') },
  { id: '3', nom: 'Accesoires', image: require('../../assets/Images/Categorie/accessoire.jpg') },
  { id: '4', nom: 'Beauté', image: require('../../assets/Images/imagesProduits/beauty3.jpg')},
  { id: '5', nom: 'Fourniture', image: require('../../assets/Images/imagesProduits/furniture6.jpg') },
  { id: '6', nom: 'Habillement', image: require('../../assets/Images/imagesProduits/fashion6.jpg') },
  { id: '7', nom: 'Santé', image: require('../../assets/Images/imagesProduits/health1.jpg') },
  { id: '8', nom: 'Papetérie', image: require('../../assets/Images/Categorie/papeterie.jpg') },
  
  
];

const Categorie = () => {

  

  const renderItem = ({ item }) => (
    <View style={{ alignItems: 'center', marginRight:5 }}>
        <TouchableOpacity style={ClientStyle.cercleCategorie}>
          <Image source={item.image} style={ClientStyle.iconeCategorie} />
        </TouchableOpacity>
        <Text style={ClientStyle.categorieText}>{item.nom}</Text>
    </View>
  );

  return (
    <View style={ClientStyle.containerCategorie}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal // Permet le défilement horizontal
        showsHorizontalScrollIndicator={false} // Cache la barre de défilement horizontale
        contentContainerStyle={ClientStyle.containerCategorie}
      />
    </View>
  );
};

export default Categorie;
