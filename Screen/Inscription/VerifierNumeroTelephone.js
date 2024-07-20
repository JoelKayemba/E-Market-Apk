import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import CustomPhoneInput from '../../Component/CustomPhoneInput';
import DismissKeyboard from '../../Component/DismissKeyboard';
import GlobalStyles from '../../Styles/GlobalStyles';
import Color from '../../Styles/Color';

const VerifierNumeroTelephone = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('EnvoieCode', { phoneNumber });
    }, 2000); 
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView contentContainerStyle={GlobalStyles.scrollViewContent}>
            <View style={styles.containerTitre}>
              <Text style={styles.Titre}>Vérifiez votre numéro de téléphone</Text>
              <Text style={GlobalStyles.Titre2}>Entrez votre numéro de téléphone pour recevoir un code de vérification et réinitialiser votre mot de passe.</Text>
            </View>
            <View style={GlobalStyles.containerInput}>
              <CustomPhoneInput
                defaultValue={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                containerStyle={styles.phoneInputContainer}
                textContainerStyle={styles.phoneInputTextContainer}
                textInputStyle={styles.phoneInputText}
              />
            </View>
            <View style={GlobalStyles.containerConnexion}>
              <TouchableOpacity 
                style={GlobalStyles.buttonContainer} 
                onPress={handleSendCode}
                disabled={loading}
              >
                <View style={GlobalStyles.button}>
                  {loading ? <ActivityIndicator color="#fff" /> : <Text style={GlobalStyles.buttonText}>Envoyer</Text>}
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </DismissKeyboard>
  );
}

export default VerifierNumeroTelephone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:30
  },
  containerTitre:{
    marginHorizontal:10,
    marginTop:20,
    marginBottom: 20,
    marginHorizontal:20
  },
  Titre:{
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center',
    paddingBottom:10
  },
  phoneInputContainer: {
    width: '100%',
    height: 50,
    marginBottom: 10,
    borderRadius: 50,
    borderColor: Color.grisContainer,
    backgroundColor: Color.grisContainer,
    borderWidth: 1,
    paddingLeft: 20,
  },
  phoneInputTextContainer: {
    borderColor: Color.grisContainer,
    backgroundColor: Color.grisContainer,
    borderRadius: 50,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  phoneInputText: {
    height: 50,
    fontSize: 16,
  },
});
