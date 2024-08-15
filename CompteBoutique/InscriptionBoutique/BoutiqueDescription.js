import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const BoutiqueDescription = ({ prevStep, handleChange, formData, handleSubmit }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Description"
        multiline
        numberOfLines={4}
        value={formData.description}
        onChangeText={(value) => handleChange('description', value)}
      />
      <Button title="Précédent" onPress={prevStep} />
      <Button title="Soumettre" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default BoutiqueDescription;
