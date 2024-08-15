import React from 'react';
import { View, Text, Button, StyleSheet ,TextInput} from 'react-native';
import { Checkbox } from 'react-native-paper';

const BoutiqueInfo = ({ nextStep, handleChange, formData }) => {
  const toggleType = (type) => {
    let updatedTypes;
    if (formData.type.includes(type)) {
      updatedTypes = formData.type.filter(item => item !== type);
    } else {
      updatedTypes = [...formData.type, type];
    }
    handleChange('type', updatedTypes);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nom de la boutique"
        value={formData.nom}
        onChangeText={(value) => handleChange('nom', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Numéro de téléphone"
        value={formData.numero_telephone}
        onChangeText={(value) => handleChange('numero_telephone', value)}
      />
      <Text style={styles.label}>Sélectionnez le type de boutique :</Text>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={formData.type.includes('En ligne') ? 'checked' : 'unchecked'}
          onPress={() => toggleType('En ligne')}
        />
        <Text style={styles.checkboxLabel}>En ligne</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={formData.type.includes('Physique') ? 'checked' : 'unchecked'}
          onPress={() => toggleType('Physique')}
        />
        <Text style={styles.checkboxLabel}>Physique</Text>
      </View>
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

export default BoutiqueInfo;
