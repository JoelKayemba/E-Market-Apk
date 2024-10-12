import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Color from '../../Styles/Color';
import API_BASE_URL from '../../ApiConfig';

const defaultCategories = [
  'Electronique', 'Vêtements', 'Alimentation', 'Services', 'Maison',
  'Beauté', 'Sports', 'Loisirs', 'Automobile'
];

const BoutiqueCategorie = ({ nextStep, prevStep, handleChange, formData }) => {
  const [categories, setCategories] = useState([]); 
  const [error, setError] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/categorie/categories`);
        const data = await response.json();

        // Utiliser les catégories récupérées ou les catégories par défaut si la liste est vide
        setCategories(data.categories && data.categories.length > 0 ? data.categories : defaultCategories);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        // En cas d'erreur, définir les catégories par défaut
        setCategories(defaultCategories);
      }
    };

    fetchCategories();
  }, []);

  const toggleCategory = (category) => {
    const updatedCategories = formData.categorie.includes(category)
      ? formData.categorie.filter(item => item !== category)
      : [...formData.categorie, category];
    
    handleChange('categorie', updatedCategories);
    setError(''); 

    if (category === 'Autres') {
      setShowCustomCategory(!showCustomCategory);
    }
  };

  const handleNextStep = () => {
    if (formData.categorie.length === 0) {
      setError('Veuillez sélectionner au moins une catégorie.');
    } else {
      nextStep();
    }
  };

  const handleAddCustomCategory = () => {
    const trimmedCategory = newCategory.trim();
    
    if (trimmedCategory === '') {
      setError('Veuillez entrer une catégorie valide.');
    } else if (categories.includes(trimmedCategory) || trimmedCategory === 'Autres') {
      setError('Cette catégorie existe déjà.');
    } else {
      setCategories([...categories, trimmedCategory]);
      handleChange('categorie', [...formData.categorie, trimmedCategory]);
      setNewCategory('');
      setError('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.label}>Sélectionnez les catégories :</Text>
        <View style={styles.grid}>
          {[...categories, 'Autres'].map((category) => (
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

        {showCustomCategory && (
          <View style={styles.addCategoryContainer}>
            <TextInput
              style={styles.input}
              placeholder="Entrez une catégorie personnalisée"
              value={newCategory}
              onChangeText={setNewCategory}
            />
            <TouchableOpacity onPress={handleAddCustomCategory} style={styles.addButton}>
              <Text style={styles.addButtonText}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        )}

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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.bleu,
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 30,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  categoryBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: Color.grisContainer,
    borderRadius: 10,
    margin: 5,
    width: '45%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  selected: {
    backgroundColor: Color.vert,
  },
  categoryText: {
    fontSize: 16,
  },
  selectedText: {
    color: 'white',
  },
  addCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Color.grey,
    borderRadius: 10,
    padding: 10,
    width: '70%',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: Color.bleu,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
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
