// page de chargement d'inscription
import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator ,Text , Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Mise à jour de l'importation
import { useNavigation } from '@react-navigation/native';
import Color from '../../Styles/Color';

const InscriptionLoading = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleInscription = async () => {
      try {

        // Attendre un court instant avant de rediriger
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Connexion' }],
              }); 
          Alert.alert('Inscription réussie')
        }, 5000); // Délai pour afficher l'écran de chargement
      } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        // Gérer les erreurs ici si nécessaire
      }
    };

    handleInscription();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
      <Text style={styles.text}>Inscription en cours...</Text>
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

export default InscriptionLoading;

