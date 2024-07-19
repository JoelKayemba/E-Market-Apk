import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import CustomPhoneInput from '../../Component/CustomPhoneInput';
import IconTextInput from '../../Component/IconTextInput';
import DismissKeyboard from '../../Component/DismissKeyboard';
import GlobalStyles from '../../Styles/GlobalStyles';
import Color from '../../Styles/Color';



const InformationInscription = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  

  

  return (
    <DismissKeyboard>
      <View style={GlobalStyles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={GlobalStyles.container}
        >
          <ScrollView contentContainerStyle={GlobalStyles.scrollViewContent}>
            <Image
              source={require('../../assets/Images/ImgInscription.jpg')}
              style={GlobalStyles.img2}
            />

            <View style={GlobalStyles.containerTitre}>
              <Text style={GlobalStyles.Titre}>Créer un compte</Text>
            </View>
            <View style={GlobalStyles.containerInput}>
              <IconTextInput
                iconName="user"
                placeholder="Nom d'utilisateur"
                onChangeText={ (text) => setUsername(text)}
              />
              <IconTextInput
                iconName="mail"
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={ (text) => setEmail(text)}
              />
              <CustomPhoneInput
                defaultValue={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                containerStyle={styles.phoneInputContainer}
                textContainerStyle={styles.phoneInputTextContainer}
                textInputStyle={styles.phoneInputText}
               
              />
              <IconTextInput
                iconName="lock"
                placeholder="Créer un mot de passe"
                secureTextEntry
              />
              <IconTextInput
                iconName="lock"
                placeholder="Confirmer votre mot de passe"
                secureTextEntry
              />
            </View>
            <View style={GlobalStyles.containerConnexion}>
              <TouchableOpacity style={GlobalStyles.buttonContainer} onPress={()=> navigation.navigate('AdresseInscription')} >
                <View style={GlobalStyles.button}>
                  <Text style={GlobalStyles.buttonText} >Continuer</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </DismissKeyboard>
  )
}

export default InformationInscription

const styles = StyleSheet.create({
  phoneInputContainer: {
    width: '100%',
    height: 50,
    marginBottom: 10,
    borderRadius: 50,
    borderColor: Color.grisContainer,
    backgroundColor:Color.grisContainer,
    borderWidth: 1,
    paddingLeft: 20,
  },
  phoneInputTextContainer: {
    borderColor: Color.grisContainer,
    backgroundColor:Color.grisContainer,
    borderRadius: 50,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  phoneInputText: {
    height: 50,
    fontSize: 16,
  },
});
