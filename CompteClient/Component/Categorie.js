import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import ClientStyle from '../../Styles/ClientStyle';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { id: '1', nom: 'Electronique' },
  { id: '2', nom: 'Alimentation' },
  { id: '3', nom: 'Accessoires' },
  { id: '4', nom: 'Beauté' },
  { id: '5', nom: 'Fourniture' },
  { id: '6', nom: 'Habillement' },
  { id: '7', nom: 'Santé' },
  { id: '8', nom: 'Papetérie' },
];

const Categorie = () => {
  const navigation = useNavigation();

  const handlePress = (categorie) => {
    navigation.navigate('CategorieProduit', { categorie });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={ClientStyle.categorieButton} onPress={() => handlePress(item.nom)}>
      <Text style={ClientStyle.categorieText}>{item.nom}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={ClientStyle.containerCategorie}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={ClientStyle.containerCategorie}
      />
    </View>
  );
};

export default Categorie;
