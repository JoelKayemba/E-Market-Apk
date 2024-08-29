import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Color from '../../Styles/Color';
import DismissKeyboard from '../../Component/DismissKeyboard';

const BoutiqueDescription = ({ prevStep, handleChange, formData, handleSubmit }) => {
  const [error, setError] = useState('');

  const handleFormSubmit = () => {
    if (!formData.description.trim()) {
      setError('La description est obligatoire.');
    } else {
      setError('');
      handleSubmit();
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Text style={styles.title}>Description de la Boutique</Text>
        <TextInput
          style={styles.input}
          placeholder="Description de votre boutique"
          multiline
          textAlignVertical="top"
          value={formData.description}
          onChangeText={(value) => {
            handleChange('description', value);
            setError(''); // Clear error when user starts typing
          }}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button1} onPress={prevStep}>
            <Text style={styles.buttonText}>Précédent</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
            <Text style={styles.buttonText}>Soumettre</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: Color.bleu,
    marginTop: 30,
  },
  input: {
    minHeight: 450,
    maxHeight: 1000,
    borderWidth: 1,
    borderColor: Color.bleu,
    padding: 10,
    fontSize: 16,
    borderRadius: 20,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: Color.orange,
    padding: 10,
    borderRadius: 10,
    width: '48%',
  },
  button1: {
    backgroundColor: Color.bleu,
    padding: 10,
    borderRadius: 10,
    width: '48%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default BoutiqueDescription;
