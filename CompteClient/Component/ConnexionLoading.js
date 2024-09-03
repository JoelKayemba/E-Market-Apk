// page de chargement pour diriger dans la page d'accueil compris dans le tabNavigation apres connexion
import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator ,Text, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Mise à jour de l'importation
import { useNavigation } from '@react-navigation/native';
import Color from '../../Styles/Color';

const ConnexionLoading = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleConnexion = async () => {
      try {

        // Attendre un court instant avant de rediriger
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'TabNavigator' }],
              });
        
        }, 5000); // Délai pour afficher l'écran de chargement
      } catch (error) {
        console.error('Erreur lors de  connexion :', error);
        // Gérer les erreurs ici si nécessaire
      }
    };

    handleConnexion();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
      <Text style={styles.text}>Connexion en cours...</Text>
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

export default ConnexionLoading;

