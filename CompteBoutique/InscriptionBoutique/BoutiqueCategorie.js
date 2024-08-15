import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';

const categoriesList = [
  'Electronique', 'Vêtements', 'Alimentation', 'Services', 'Maison',
  'Beauté', 'Sports', 'Loisirs', 'Automobile', 'Autres'
];

const BoutiqueCategorie = ({ nextStep, prevStep, handleChange, formData }) => {
  const toggleCategory = (category) => {
    let updatedCategories;
    if (formData.categorie.includes(category)) {
      updatedCategories = formData.categorie.filter(item => item !== category);
    } else {
      updatedCategories = [...formData.categorie, category];
    }
    handleChange('categorie', updatedCategories);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sélectionnez les catégories :</Text>
      {categoriesList.map((category) => (
        <View key={category} style={styles.checkboxContainer}>
          <Checkbox
            status={formData.categorie.includes(category) ? 'checked' : 'unchecked'}
            onPress={() => toggleCategory(category)}
          />
          <Text style={styles.checkboxLabel}>{category}</Text>
        </View>
      ))}
      <Button title="Précédent" onPress={prevStep} />
      <Button title="Suivant" onPress={nextStep} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
});

export default BoutiqueCategorie;
