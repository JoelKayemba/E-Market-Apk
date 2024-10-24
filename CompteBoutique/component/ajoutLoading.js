import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Mise à jour pour utiliser `useRoute`
import Color from '../../Styles/Color';

const AjoutLoading = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Utilisez `useRoute` pour obtenir les paramètres

  // Récupérer les données de la boutique depuis les paramètres de navigation
  const boutique = route.params?.boutique;
 
  useEffect(() => {
    const handleRedirection = () => {
      // Attendre un court instant avant de rediriger
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ 
            name: 'BoutiqueNavigator', 
            params: { boutique } // Transmettez les données de la boutique ici
          }],
        });
      }, 5000); // Délai pour afficher l'écran de chargement
    };

    handleRedirection();
  }, [navigation, boutique]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
      <Text style={styles.text}>Création de la boutique en cours...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
  },
});

export default AjoutLoading;
