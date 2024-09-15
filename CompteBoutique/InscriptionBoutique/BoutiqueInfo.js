import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';
import Color from '../../Styles/Color';

const BoutiqueInfo = ({ nextStep, handleChange, formData }) => {
  const [errors, setErrors] = useState({});
  const [phoneStatus, setPhoneStatus] = useState('');

  const validateFields = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.nom) {
      newErrors.nom = "Le nom de la boutique est requis.";
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = "L'email est requis.";
      valid = false;
    }
    if (!formData.numero_telephone) {
      newErrors.numero_telephone = "Le numéro de téléphone est requis.";
      valid = false;
    } else if (!/^\+\d{1,3}\s?\d{1,14}$/.test(formData.numero_telephone)) {
      newErrors.numero_telephone = "Le numéro de téléphone doit être au format +243 6774667773.";
      valid = false;
      setPhoneStatus('error');
    } else {
      setPhoneStatus('success');
    }
    if (formData.type.length === 0) {
      newErrors.type = "Le type de boutique est requis.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNextStep = () => {
    if (validateFields()) {
      nextStep();
    }
  };

  const toggleType = (type) => {
    let updatedTypes = [type]; // Ensure only one type is active at a time
    handleChange('type', updatedTypes);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Information Boutiques</Text>
      <Text style={styles.subTitle}>Veuilez entrer les informations de base liées a la boutique</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nom de la boutique</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez le nom de la boutique"
          value={formData.nom}
          onChangeText={(value) => handleChange('nom', value)}
        />
        {errors.nom && <Text style={styles.errorText}>{errors.nom}</Text>}
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email de la boutique"
          value={formData.email}
          onChangeText={(value) => handleChange('email', value)}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Numéro de téléphone</Text>
        <TextInput
          style={styles.input}
          placeholder="exemple:+243 897654352"
          value={formData.numero_telephone}
          onChangeText={(value) => handleChange('numero_telephone', value)}
        />
        {errors.numero_telephone && <Text style={styles.errorText}>{errors.numero_telephone}</Text>}
        {phoneStatus === 'success' && <Text style={styles.successText}>Numéro de téléphone valide</Text>}
        {phoneStatus === 'error' && <Text style={styles.errorText}>Format incorrect</Text>}
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
      {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}
      <TouchableOpacity onPress={handleNextStep} style={[GlobalStyles.button, styles.footer]}>
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
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 50,
  },
  subTitle:{
    fontSize:24,
    fontWeight:'1s00',
    textAlign:'center',
    marginBottom:10,
    color: Color.bleu,
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
    fontWeight: 'bold',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop: 10,
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
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  successText: {
    color: 'green',
    fontSize: 12,
    marginTop: 5,
  },
});

export default BoutiqueInfo;
