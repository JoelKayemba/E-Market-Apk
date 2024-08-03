import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View ,Platform, TouchableOpacity} from 'react-native'
import React from 'react'
import DismissKeyboard from '../../Component/DismissKeyboard'
import IconTextInput from '../../Component/IconTextInput';
import GlobalStyles from '../../Styles/GlobalStyles';

const MotDePasseOublie = ({navigation}) => {
  return (
    <DismissKeyboard>
        <View style={styles.container}>
          <KeyboardAvoidingView 
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.container}
          >
            <ScrollView contentContainerStyle={GlobalStyles.scrollViewContent}>
              
              <View style={GlobalStyles.containerTitre}>
                <Text style={GlobalStyles.Titre}>Mot de passe oublié</Text>
                <Text style={GlobalStyles.Titre2}>Entrez votre email pour recevoir un code de vérification et réinitialiser votre mot de passe.</Text>
              </View>
              <View style={GlobalStyles.containerInput}>
              <IconTextInput 
                    iconName="mail"
                    placeholder="Email"
                    keyboardType="email-address"
                  />
                 
              </View>
              <View style={GlobalStyles.containerConnexion}>
                <TouchableOpacity style={GlobalStyles.buttonContainer} onPress={() => navigation.navigate('VerificationMotDePasse')}>
                  <View style={GlobalStyles.button}>
                    <Text style={GlobalStyles.buttonText}>Envoyer</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
              
            </KeyboardAvoidingView>
          </View>
    </DismissKeyboard>
   
 
  )
}

export default MotDePasseOublie

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    marginTop:50
    
  },
 
  
})