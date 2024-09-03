// page d'envoie code par numero de telephone NB: non fini
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import DismissKeyboard from '../../Component/DismissKeyboard';
import GlobalStyles from '../../Styles/GlobalStyles';
import Color from '../../Styles/Color';

const CELL_COUNT = 4;

const EnvoieCode = ({ navigation, route }) => {
  const { phoneNumber } = route.params;
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleSubmitCode = () => {
    setLoading(true);
    // Simulate verifying the code
    setTimeout(() => {
      setLoading(false);
      if (value === '1234') { // Example of correct code
        navigation.navigate('InformationInscription');
      } else {
        alert('Code incorrect. Veuillez réessayer.');
      }
    }, 2000); // Simulate a delay of 2 seconds
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
              <Text style={GlobalStyles.Titre}>Vérification Numero </Text>
              <Text style={GlobalStyles.Titre2}>Entrez le code réçu.</Text>
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
            <View style={GlobalStyles.renvoiCodeContainer}>
              <Text style={GlobalStyles.renvoiText}>Vous n'avez pas réçu de code?</Text>
              <Pressable onPress={() => navigation.navigate('VerificationMotDePasse')}>
                <Text style={GlobalStyles.renvoyerCode}>Envoyer un nouveau code</Text>
              </Pressable>
            </View>
            <View style={GlobalStyles.containerConnexion}>
              <Pressable 
                style={GlobalStyles.buttonContainer} 
                onPress={handleSubmitCode}
                disabled={loading}
              >
                <View style={GlobalStyles.button}>
                  {loading ? <ActivityIndicator color="#fff" /> : <Text style={GlobalStyles.buttonText}>Vérifier</Text>}
                </View>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </DismissKeyboard>
  );
}

export default EnvoieCode;

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
});
