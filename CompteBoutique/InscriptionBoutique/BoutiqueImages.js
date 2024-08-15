import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const BoutiqueImages = ({ nextStep, prevStep, handleChange, formData }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Image 1 URL"
        value={formData.image1}
        onChangeText={(value) => handleChange('image1', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Image 2 URL"
        value={formData.image2}
        onChangeText={(value) => handleChange('image2', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Image 3 URL"
        value={formData.image3}
        onChangeText={(value) => handleChange('image3', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Image 4 URL"
        value={formData.image4}
        onChangeText={(value) => handleChange('image4', value)}
      />
      <Button title="Précédent" onPress={prevStep} />
      <Button title="Suivant" onPress={nextStep} />
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

export default BoutiqueImages;
