import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, Platform, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import DismissKeyboard from '../../Component/DismissKeyboard';
import IconTextInput from '../../Component/IconTextInput';
import GlobalStyles from '../../Styles/GlobalStyles';
import Color from '../../Styles/Color';
import API_BASE_URL from '../../ApiConfig';

const MotDePasseOublie = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEnvoyer = async () => {
    if (!email) {
      Alert.alert('Erreur', 'Veuillez entrer votre email.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/sendEmail/sendVerificationCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      setLoading(false);

      if (!response.ok) {
        Alert.alert('Erreur', result.message || 'Une erreur est survenue lors de l\'envoi du code de vérification.');
        return;
      }
     
        Alert.alert('Succès', 'Un code de vérification a été envoyé à votre email.');
    
      
      navigation.navigate('VerificationMotDePasse', { email });
    } catch (error) {
      setLoading(false);
      Alert.alert('Erreur', 'Erreur lors de l\'envoi de l\'email.');
    }
  };

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
                  value={email}
                  onChangeText={setEmail}
              />
            </View>
            <View style={GlobalStyles.containerConnexion}>
              <TouchableOpacity 
                style={GlobalStyles.buttonContainer} 
                onPress={handleEnvoyer}
                disabled={loading}
              >
                <View style={[GlobalStyles.button, loading && styles.loadingButton]}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={GlobalStyles.buttonText}>Envoyer</Text>
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

export default MotDePasseOublie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 50,
  },
  loadingButton: {
    backgroundColor: Color.grisContainer,
  },
});
