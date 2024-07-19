import { StyleSheet, Text, View, Image, TextInput, Button, Pressable, TouchableOpacity, ScrollView,KeyboardAvoidingView,Platform } from 'react-native'
import { Feather } from '@expo/vector-icons';
import IconTextInput from '../../Component/IconTextInput';
import DismissKeyboard from '../../Component/DismissKeyboard';
import GlobalStyles from '../../Styles/GlobalStyles'
import { useEffect } from 'react';


const Connexion = ({ navigation }) => {
 

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
        <TouchableOpacity style={GlobalStyles.buttonContainer} onPress={()=> navigation.navigate('Accueil')}>
          <View style={GlobalStyles.button}>
            <Text style={GlobalStyles.buttonText} >Se connecter</Text>
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
}

export default Connexion

const styles = StyleSheet.create({
  
})