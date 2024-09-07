// Categorie.js pour les categories de produits
import React from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import ClientStyle from '../../Styles/ClientStyle';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { id: '1', nom: 'Electronique', image: require('../../assets/Images/Categorie/electro.jpeg') },
  { id: '2', nom: 'Alimentation', image: require('../../assets/Images/Categorie/food.jpeg') },
  { id: '3', nom: 'Accessoires', image: require('../../assets/Images/Categorie/accessoire.jpeg') },
  { id: '4', nom: 'Beauté', image: require('../../assets/Images/Categorie/beauty.jpeg')},
  { id: '5', nom: 'Fourniture', image: require('../../assets/Images/Categorie/furniture.jpeg') },
  { id: '6', nom: 'Habillement', image: require('../../assets/Images/Categorie/fashion.jpeg') },
  { id: '7', nom: 'Santé', image: require('../../assets/Images/Categorie/sante.jpeg') },
  { id: '8', nom: 'Papetérie', image: require('../../assets/Images/Categorie/papeterie.jpeg') },
];

const Categorie = ({ produits }) => {
  const navigation = useNavigation();

  const handlePress = (categorie) => {
    navigation.navigate('CategorieProduit', { categorie });
  };

  const renderItem = ({ item }) => (
    <View style={{ alignItems: 'center', marginRight: 5 }}>
      <TouchableOpacity style={ClientStyle.cercleCategorie} onPress={() => handlePress(item.nom)}>
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
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={ClientStyle.containerCategorie}
      />
    </View>
  );
};

export default Categorie;
