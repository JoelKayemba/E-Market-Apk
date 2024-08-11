import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { AntDesign, MaterialCommunityIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import CustomPhoneInput from '../../Component/CustomPhoneInput';
import IconTextInput from '../../Component/IconTextInput';
import DismissKeyboard from '../../Component/DismissKeyboard';
import GlobalStyles from '../../Styles/GlobalStyles';
import Color from '../../Styles/Color';
import { useNavigation } from '@react-navigation/native';

const InformationInscription = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // État pour le chargement

  const handleRegister = async () => {
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Phone Number:", phoneNumber);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    setLoading(true); // Démarrer le chargement
    console.log('Numéro de téléphone:', phoneNumber);

    try {
      const response = await fetch('http://192.168.21.25:3300/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          phoneNumber,
          password,
          confirmPassword,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'InscriptionLoading' }],
        });
      } 
      else {
        if (result.message.includes('email est déjà utilisé')) {
          setErrorMessage('L\'email est déjà utilisé. Veuillez en choisir un autre.');
        } else if (result.message.includes('compte existe déjà')) {
          setErrorMessage('Un compte avec ces informations existe déjà.');
        } else {
          setErrorMessage(result.message || 'Une erreur est survenue');
        }
      }
    } catch (error) {
      console.error('Erreur:', error);
      setErrorMessage('Erreur lors de l\'inscription');
    } finally {
      setLoading(false); // Arrêter le chargement
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
              source={require('../../assets/imageBack/inscription.jpg')}
              style={GlobalStyles.img2}
            />
            <View style={styles.overlay}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
                        <Ionicons name="arrow-back" size={30} color={Color.orange} />
                    </TouchableOpacity>
                  
            </View>

            <View style={GlobalStyles.containerTitre}>
              <Text style={GlobalStyles.Titre}>Créer un compte</Text>
            </View>
            <View style={GlobalStyles.containerInput}>
              <IconTextInput
                iconName="user"
                placeholder="Nom d'utilisateur"
                onChangeText={setUsername}
              />
              <IconTextInput
                iconName="mail"
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={setEmail}
              />
              <CustomPhoneInput
                defaultValue={phoneNumber}
                onChangePhoneNumber={setPhoneNumber}
                containerStyle={styles.phoneInputContainer}
                textContainerStyle={styles.phoneInputTextContainer}
                textInputStyle={styles.phoneInputText}
              />
              <IconTextInput
                iconName="lock"
                placeholder="Créer un mot de passe"
                onChangeText={setPassword}
                secureTextEntry
              />
              <IconTextInput
                iconName="lock"
                placeholder="Confirmer votre mot de passe"
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
            {errorMessage ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}
            <View style={GlobalStyles.containerConnexion}>
              <TouchableOpacity
                style={[GlobalStyles.buttonContainer, loading && styles.buttonDisabled]} // Style pour bouton désactivé
                onPress={handleRegister}
                disabled={loading} // Désactiver le bouton pendant le chargement
              >
                <View style={GlobalStyles.button}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" /> // Indicateur de chargement
                  ) : (
                    <Text style={GlobalStyles.buttonText}>S'inscrire</Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </DismissKeyboard>
  );
}

export default InformationInscription;

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
    backgroundColor:'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:450
},
  phoneInputContainer: {
    width: '100%',
    height: 50,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: Color.bleu,
    
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
  },
  buttonDisabled: {
    opacity: 0.6, // Opacité pour indiquer que le bouton est désactivé
  },
});
