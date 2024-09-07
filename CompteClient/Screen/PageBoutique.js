import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import Recherche from '../Component/Recherche';
import Publicite from '../Component/Publicite';
import BoutiquePourToi from '../Component/BoutiquePourToi';
import BoutiqueProche from '../Component/BoutiqueProche';
import ClientStyle from '../../Styles/ClientStyle';
import MeilleursBoutique from '../Component/MeilleursBoutique';
import CustomHeader from '../../Component/CustomHeader';
import Services from '../Component/Services';
import { useState } from 'react';

const Boutique = ({ navigation}) => {

  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState();

  const onRefresh = async () => {
    setRefreshing(true);
    // logique pour récupérer les dernières données
    // Par exemple, recharger les données depuis une API
    setTimeout(() => { // Simuler un appel réseau
        setRefreshing(false);
    }, 2000);
};

  // Données pour les sections
  const sections = [
    {
      id: '1', // Identifiant unique pour chaque section
      title: 'Recommandation',
      component: <BoutiquePourToi />
    },

    {
      id: '2', // Identifiant unique pour chaque section
      title: 'Nos Meilleurs Boutiques',
      component: <MeilleursBoutique />
    },
    {
      id: '3', // Identifiant unique pour chaque section
      title: 'Proche de Vous',
      component: <BoutiqueProche />
    }
  ];

  // Fonction pour rendre l'en-tête
  const renderHeader = () => (
    <View>
      <Publicite />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
            <CustomHeader navigation={navigation} />
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
        contentContainerStyle={styles.container} 
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0
  }
});

export default Boutique;
