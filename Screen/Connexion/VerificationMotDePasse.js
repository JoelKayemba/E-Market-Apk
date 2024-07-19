import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import DismissKeyboard from '../../Component/DismissKeyboard';
import GlobalStyles from '../../Styles/GlobalStyles';
import Color from '../../Styles/Color';

const CELL_COUNT = 4;

const VerificationMotDePasse = ({navigation}) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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
            <View style={GlobalStyles.renvoiCodeContainer}>
              <Text style={GlobalStyles.renvoiText}>Vous n'avez pas réçu de code?</Text>
              <Pressable onPress={() => navigation.navigate('VerificationMotDePasse')}>
                <Text style={GlobalStyles.renvoyerCode}>Envoyer un nouveau code</Text>
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
    marginBottom:20
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
    backgroundColor:Color.grisContainer
    
  },
  focusCell: {
    borderColor: Color.orange,
    

  },
  cellText: {
    textAlign: 'center',
    fontSize: 24,
    marginTop:10
  },
});
