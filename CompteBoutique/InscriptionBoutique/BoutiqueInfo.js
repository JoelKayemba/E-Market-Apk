import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';
import Color from '../../Styles/Color';

const BoutiqueInfo = ({ nextStep, handleChange, formData }) => {
  const toggleType = (type) => {
    let updatedTypes = [type]; // Ensure only one type is active at a time
    handleChange('type', updatedTypes);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Information Boutiques</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nom de la boutique</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez le nom de la boutique"
          value={formData.nom}
          onChangeText={(value) => handleChange('nom', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email de la boutique"
          value={formData.email}
          onChangeText={(value) => handleChange('email', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Numéro de téléphone</Text>
        <TextInput
          style={styles.input}
          placeholder="Numéro de contact"
          value={formData.numero_telephone}
          onChangeText={(value) => handleChange('numero_telephone', value)}
        />
      </View>
      <Text style={styles.label}>Sélectionnez le type de boutique :</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={[styles.optionButton, formData.type.includes('En ligne') ? styles.optionSelected : null]}
          onPress={() => toggleType('En ligne')}
        >
          <Text style={[styles.optionText, formData.type.includes('En ligne') ? styles.textSelected : null]}>
            En ligne
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.optionButton, formData.type.includes('Physique') ? styles.optionSelected : null]}
          onPress={() => toggleType('Physique')}
        >
          <Text style={[styles.optionText, formData.type.includes('Physique') ? styles.textSelected : null]}>
            Physique
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={nextStep} style={[GlobalStyles.button, styles.footer]}>
        <Text style={GlobalStyles.buttonText}>Suivant</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginHorizontal: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Color.bleu,
    marginBottom: 20,
    textAlign: 'center',
    marginTop:50
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: Color.bleu,
    borderRadius: 10,
    padding: 15,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    fontWeight:'bold'
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop:10
  },
  optionButton: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.bleu,
    width: '40%',
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: Color.bleu,
  },
  optionText: {
    fontSize: 16,
    color: '#666',
  },
  textSelected: {
    color: 'white',
  },
  footer: {
    marginTop: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  }
});

export default BoutiqueInfo;
