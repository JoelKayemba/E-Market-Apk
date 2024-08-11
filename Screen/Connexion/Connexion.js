import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { AntDesign, MaterialCommunityIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Color from '../../Styles/Color';
import IconTextInput from '../../Component/IconTextInput';
import DismissKeyboard from '../../Component/DismissKeyboard';
import GlobalStyles from '../../Styles/GlobalStyles';
import React, { useState } from 'react';
import useAuth from '../../hook/useAuth';

const Connexion = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useAuth();

 

  const handleConnexion = async () => {
    setLoading(true); // Démarrer le chargement
  
    try {
      const response = await fetch('http://192.168.21.25:3300/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const data = await response.json();
      setLoading(false);
  
      if (response.ok && data.token) {
        // Stocker le token dans AsyncStorage
        await AsyncStorage.setItem('authToken', data.token);
    
        // Stocker l'ID du client
        if (data.userId) {
            await AsyncStorage.setItem('idclient', data.userId.toString());
        }
    
        // Stocker le nom et l'email si disponibles
        if (data.username) {
            await AsyncStorage.setItem('nom', data.username);
        }
        if (data.email) {
            await AsyncStorage.setItem('email', data.email);
        }
    
        // Rediriger vers la page de chargement ou la page d'accueil
        navigation.reset({
            index: 0,
            routes: [{ name: 'ConnexionLoading' }],
        });
    }else {
        // Utiliser le message d'erreur retourné par le serveur
        setErrorMessage(data.message || 'Une erreur est survenue');
      }
    } catch (error) {
      setLoading(false);
      alert('Erreur lors de la connexion. Veuillez réessayer.');
    }
  };


  return (
    <DismissKeyboard>
      <View style={GlobalStyles.container}>
        <KeyboardAvoidingView  
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={GlobalStyles.container}
        >
          <ScrollView contentContainerStyle={GlobalStyles.scrollViewContent}>
            <Image
              source={require('../../assets/imageBack/connexion.jpg')}
              style={GlobalStyles.img}
            />
            <View style={GlobalStyles.containerTitre}>
              <Text style={GlobalStyles.Titre}>Bon retour!</Text>
              <Text style={GlobalStyles.Titre2}>Connectez-vous à votre compte</Text>
            </View>
            <View style={GlobalStyles.containerInput}>
              <IconTextInput 
                iconName="mail"
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <IconTextInput 
                iconName="lock"
                placeholder="Mot de passe"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              {errorMessage ? <View style={styles.errorContainer}><Text style={styles.errorText}>{errorMessage}</Text></View> : null}

            </View>
            <View style={GlobalStyles.containerConnexion}>
              <TouchableOpacity 
                style={GlobalStyles.buttonContainer} 
                onPress={handleConnexion}
                disabled={loading} // Désactive le bouton pendant le chargement
              >
                <View style={GlobalStyles.button}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={GlobalStyles.buttonText}>Se connecter</Text>
                  )}
                </View>
              </TouchableOpacity>
              <Pressable onPress={() => navigation.navigate('MotDePasseOublie')}>
                <Text style={GlobalStyles.forgotPasswordText}>Mot de passe oublié</Text>
              </Pressable>
              <View style={GlobalStyles.inscriptionContainer}>
                <Text style={GlobalStyles.inscriptionText}>Vous n'avez pas de compte?</Text>
                <Pressable onPress={() => navigation.navigate('InformationInscription')}>
                  <Text style={GlobalStyles.inscriptionLien}>S'inscrire</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </DismissKeyboard>
  )
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    marginBottom:200
},
backIcon: {
    marginRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:350
},
errorContainer: {
  padding: 10,
  backgroundColor: 'rgba(255, 0, 0, 0.1)',
  borderRadius: 50,
  borderColor: 'red',
  borderWidth: 1,
  marginHorizontal: 20
},
errorText: {
  color: 'red',
  textAlign: 'center',
  justifyContent:'center'
},
});

export default Connexion
