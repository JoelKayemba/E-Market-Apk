import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import BoutiqueInfo from './BoutiqueInfo';
import BoutiqueCategorie from './BoutiqueCategorie';
import BoutiqueImages from './BoutiqueImages';
import BoutiqueDescription from './BoutiqueDescription';

const AjouterBoutique = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nom: '',
    type: [], 
    categorie: [], 
    email: '',
    numero_telephone: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    description: '',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://votre_api_url/boutique', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Boutique ajoutée avec succès');
        navigation.navigate('Accueil');
      } else {
        alert(result.message || 'Erreur lors de l\'ajout de la boutique');
      }
    } catch (error) {
      alert('Erreur lors de l\'ajout de la boutique');
    }
  };

  switch (step) {
    case 1:
      return <BoutiqueInfo nextStep={nextStep} handleChange={handleChange} formData={formData} />;
    case 2:
      return <BoutiqueCategorie nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />;
    case 3:
      return <BoutiqueImages nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />;
    case 4:
      return <BoutiqueDescription prevStep={prevStep} handleChange={handleChange} formData={formData} handleSubmit={handleSubmit} />;
    default:
      return <Text>Formulaire terminé</Text>;
  }
};

export default AjouterBoutique;
