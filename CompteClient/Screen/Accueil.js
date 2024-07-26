import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';
import ClientStyle from '../../Styles/ClientStyle';
import Publicite from '../Component/Publicite';
import Produit from '../Component/Produit';
import Categorie from '../Component/Categorie';
import Recherche from '../Component/Recherche';
import Adresse from '../Component/Adresse';




const Accueil = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={GlobalStyles.container}>
        <View style={ClientStyle.containerRecherche}>
          <Recherche />
          <Adresse />
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
          <Produit  />
        </View>
      </View>
    </ScrollView>
  );
};

export default Accueil;
