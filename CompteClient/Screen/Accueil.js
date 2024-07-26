import React from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image ,Dimensions } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import GlobalStyles from '../../Styles/GlobalStyles';
import ClientStyle from '../../Styles/ClientStyle';
import Publicite from '../Component/Publicite';
import Produit from '../Component/Produit';
import Color from '../../Styles/Color';
import Categorie from '../Component/Categorie';


  // Ajoute plus de produits si nécessaire
// Exemple de données pour les produits
  

const Accueil = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={GlobalStyles.container}>
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
          <Categorie />
        </View>

        <Publicite />

        <View style={ClientStyle.containerRecommandation}>
          <Text style={ClientStyle.textPourToi}>Recommandation</Text>
          <TouchableOpacity onPress={() => alert('Cliqué')}>
            <Text style={ClientStyle.textVoirTout}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        <View style={ClientStyle.containerProduitRecommander}>
          {produits.map((produit, index) => (
            <Produit key={index} produit={produit} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Accueil;
