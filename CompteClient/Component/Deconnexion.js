// Deconnexion.js
import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator ,Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Mise à jour de l'importation
import { useNavigation } from '@react-navigation/native';
import Color from '../../Styles/Color';

const Deconnexion = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleDeconnexion = async () => {
      try {
        // Supprimer le token d'authentification
        await AsyncStorage.removeItem('authToken');
        // Attendre un court instant avant de rediriger
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Connexion' }],
              }); 
        }, 5000); // Délai pour afficher l'écran de chargement
      } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
        // Gérer les erreurs ici si nécessaire
      }
    };

    handleDeconnexion();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
      <Text style={styles.text}>Déconnexion en cours...</Text>
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

export default Deconnexion;

