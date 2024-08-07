//Page pour rediriger vers la page d'accueil s'il y a deja eu connexion dans le telephone2
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AuthLoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          // Token trouvé, rediriger vers la page d'accueil
          navigation.navigate('TabNavigator');
        } else {
          // Aucun token, rediriger vers la page de connexion
          navigation.navigate('Bienvenue');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du token:', error);
        navigation.navigate('Bienvenue');
      }
    };

    checkToken();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthLoadingScreen;
