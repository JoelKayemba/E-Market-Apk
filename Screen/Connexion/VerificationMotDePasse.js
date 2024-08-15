import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, KeyboardAvoidingView, Platform, Alert, TouchableOpacity } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import DismissKeyboard from '../../Component/DismissKeyboard';
import GlobalStyles from '../../Styles/GlobalStyles';
import Color from '../../Styles/Color';

const CELL_COUNT = 4;

const VerificationMotDePasse = ({ route, navigation }) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleVerification = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://192.168.21.25:3300/sendEmail/verifyCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: route.params.email, code: value }),
      });

      const result = await response.json();

      if (!response.ok) {
        Alert.alert('Erreur', result.message || 'Erreur lors de la vérification du code.');
        setLoading(false);
        return;
      }

      Alert.alert('Succès', 'Code vérifié. Vous pouvez maintenant changer votre mot de passe.');
      navigation.navigate('ChangerMotDePasse', { email: route.params.email });
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la vérification du code.');
    }

    setLoading(false);
  };

  const handleResendCode = async () => {
    setResending(true);

    try {
      const response = await fetch('http://192.168.21.25:3300/sendEmail/resendCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: route.params.email }),
      });

      const result = await response.json();

      if (!response.ok) {
        Alert.alert('Erreur', result.message || 'Erreur lors de l\'envoi du nouveau code.');
        setResending(false);
        return;
      }

      Alert.alert('Succès', 'Un nouveau code a été envoyé à votre adresse email.');
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de l\'envoi du nouveau code.');
    }

    setResending(false);
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
              <Text style={GlobalStyles.Titre}>Vérification Email</Text>
              <Text style={GlobalStyles.Titre2}>Entrez le code réçu par mail.</Text>
            </View>
            <View style={GlobalStyles.containerInput}>
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <View
                    onLayout={getCellOnLayoutHandler(index)}
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}>
                    <Text style={styles.cellText}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
            </View>
            <View style={GlobalStyles.containerConnexion}>
              <TouchableOpacity 
                style={GlobalStyles.buttonContainer} 
                onPress={handleVerification} 
                disabled={loading || value.length !== CELL_COUNT}
              >
                <View style={[GlobalStyles.button, loading && styles.loadingButton]}>
                  <Text style={GlobalStyles.buttonText}>{loading ? 'Vérification...' : 'Vérifier'}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={GlobalStyles.renvoiCodeContainer}>
              <Text style={GlobalStyles.renvoiText}>Vous n'avez pas réçu de code?</Text>
              <Pressable onPress={handleResendCode} disabled={resending}>
                <Text style={GlobalStyles.renvoyerCode}>
                  {resending ? 'Renvoi en cours...' : 'Envoyer un nouveau code'}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </DismissKeyboard>
  );
}

export default VerificationMotDePasse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 50,
  },
  codeFieldRoot: {
    marginTop: 30,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
  },
  cell: {
    width: 60,
    height: 60,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: Color.grisContainer,
    textAlign: 'center',
    borderRadius: 50,
    marginRight: 10,
    backgroundColor: Color.grisContainer,
  },
  focusCell: {
    borderColor: Color.orange,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 10,
  },
  loadingButton: {
    backgroundColor: Color.grisContainer,
  },
});
