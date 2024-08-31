import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Color from '../../Styles/Color';

const categoriesList = [
  'Electronique', 'Vêtements', 'Alimentation', 'Services', 'Maison',
  'Beauté', 'Sports', 'Loisirs', 'Automobile', 'Autres'
];

const BoutiqueCategorie = ({ nextStep, prevStep, handleChange, formData }) => {
  const [error, setError] = useState('');

  const toggleCategory = (category) => {
    let updatedCategories = formData.categorie.includes(category)
      ? formData.categorie.filter(item => item !== category)
      : [...formData.categorie, category];
    handleChange('categorie', updatedCategories);
    setError(''); 
  };

  const handleNextStep = () => {
    if (formData.categorie.length === 0) {
      setError('Veuillez sélectionner au moins une catégorie.');
    } else {
      nextStep();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Sélectionnez les catégories :</Text>
      <View style={styles.grid}>
        {categoriesList.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryBox, formData.categorie.includes(category) ? styles.selected : {}]}
            onPress={() => toggleCategory(category)}
          >
            <Text style={[styles.categoryText, formData.categorie.includes(category) ? styles.selectedText : {}]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={prevStep} style={styles.button1}>
          <Text style={styles.buttonText}>Précédent</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextStep} style={styles.button}>
          <Text style={styles.buttonText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  label: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Color.bleu,
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 50,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    justifyContent: 'center',
  },
  categoryBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: Color.grey,
    borderRadius: 10,
    margin: 5,
    width: '48%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  selected: {
    backgroundColor: Color.bleu,
  },
  categoryText: {
    fontSize: 16,
  },
  selectedText: {
    color: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
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
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BoutiqueCategorie;
