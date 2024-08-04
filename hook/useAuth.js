// ce Hook permet de rediriger directmenet dans la page d'accueil si l'utilisateur a deja eu a se connecter une fois
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuth = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Fonction pour vérifier le token dans AsyncStorage
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        console.log('Token trouvé dans AsyncStorage:', token); // Afficher le token
        if (token) {
          // Si le token est présent, rediriger vers la page d'accueil
          navigation.navigate('TabNavigator');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du token:', error);
      }
    };

    checkToken();
  }, [navigation]);
};

export default useAuth;
