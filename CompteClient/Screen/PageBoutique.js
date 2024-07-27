import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import Recherche from '../Component/Recherche';
import Publicite from '../Component/Publicite';
import BoutiquePourToi from '../Component/BoutiquePourToi';
import BoutiqueProche from '../Component/BoutiqueProche';
import ClientStyle from '../../Styles/ClientStyle';

const Boutique = () => {
  // Données pour les sections
  const sections = [
    {
      id: '1', // Identifiant unique pour chaque section
      title: 'Recommandation',
      component: <BoutiquePourToi />
    },
    {
      id: '2', // Identifiant unique pour chaque section
      title: 'Proche de Vous',
      component: <BoutiqueProche />
    }
  ];

  // Fonction pour rendre l'en-tête
  const renderHeader = () => (
    <View>
      <View style={ClientStyle.containerRecherche}>
        <Recherche />
      </View>
      <Publicite />
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={sections}
      renderItem={({ item }) => (
        <View key={item.id}>
          <View style={ClientStyle.containerRecommandation}>
            <Text style={ClientStyle.textPourToi}>{item.title}</Text>
          </View>
          {item.component}
        </View>
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container} // Ajoutez du style ici si nécessaire
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});

export default Boutique;
