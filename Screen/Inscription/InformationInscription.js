import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
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
        Alert.alert("Succès", result.message || 'Inscription réussie');
        navigation.reset({
          index: 0,
          routes: [{ name: 'AdresseInscription' }],
        });
      } else {
        setErrorMessage(result.message || 'Une erreur est survenue');
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
                onChangeText={setPhoneNumber}
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
                    <Text style={GlobalStyles.buttonText}>Continuer</Text>
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
