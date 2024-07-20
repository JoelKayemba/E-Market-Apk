import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import IconTextInput from '../../Component/IconTextInput';
import DismissKeyboard from '../../Component/DismissKeyboard';
import GlobalStyles from '../../Styles/GlobalStyles';
import React, { useState } from 'react';

const Connexion = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleConnexion = () => {
    setLoading(true);
  
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Accueil'); // Redirection vers la page d'accueil ou une autre page après connexion
    }, 2000); 
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
              source={require('../../assets/Images/ImgConnexion2.jpg')}
              style={GlobalStyles.img}
            />
            <View style={GlobalStyles.containerTitre}>
              <Text style={GlobalStyles.Titre}>Welcome back</Text>
              <Text style={GlobalStyles.Titre2}>Connectez-vous à votre compte</Text>
            </View>
            <View style={GlobalStyles.containerInput}>
              <IconTextInput 
                iconName="mail"
                placeholder="Email"
                keyboardType="email-address"
              />
              <IconTextInput 
                iconName="lock"
                placeholder="Mot de passe"
                secureTextEntry
              />
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
                <Pressable onPress={() => navigation.navigate('VerifierNumeroTelephone')}>
                  <Text style={GlobalStyles.inscriptionLien}>S'inscrire</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </DismissKeyboard>
  )
}

export default Connexion
