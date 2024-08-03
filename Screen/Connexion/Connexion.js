import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { AntDesign, MaterialCommunityIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import Color from '../../Styles/Color';
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
      navigation.navigate('TabNavigator'); // Redirection vers la page d'accueil 
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
            <View style={styles.overlay}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
                        <Ionicons name="arrow-back" size={30} color={Color.orange} />
                    </TouchableOpacity>
                  
            </View>
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
});

export default Connexion
