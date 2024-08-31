import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import BoutiqueInfo from './BoutiqueInfo';
import BoutiqueCategorie from './BoutiqueCategorie';
import BoutiqueImages from './BoutiqueImages';
import BoutiqueDescription from './BoutiqueDescription';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../../ApiConfig';

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
      const idclient = await AsyncStorage.getItem('idclient');

      const formDataToSend = new FormData();
      formDataToSend.append('nom', formData.nom);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('categorie', formData.categorie);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('numero_telephone', formData.numero_telephone);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('idclient', idclient);

      if (formData.image1) {
        formDataToSend.append('image1', {
          uri: formData.image1,
          type: 'image/jpeg',
          name: 'image1.jpg',
        });
      }
      if (formData.image2) {
        formDataToSend.append('image2', {
          uri: formData.image2,
          type: 'image/jpeg',
          name: 'image2.jpg',
        });
      }
      if (formData.image3) {
        formDataToSend.append('image3', {
          uri: formData.image3,
          type: 'image/jpeg',
          name: 'image3.jpg',
        });
      }
      if (formData.image4) {
        formDataToSend.append('image4', {
          uri: formData.image4,
          type: 'image/jpeg',
          name: 'image4.jpg',
        });
      }

      const response = await fetch(`${API_BASE_URL}/boutique/ajoutBoutique`, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.json();

      if (response.ok) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'AjoutLoading' }],
      });
      } else {
        alert(result.message || 'Erreur lors de l\'ajout de la boutique');
      }
    } catch (error) {
      alert('Erreur lors de l\'ajout de la boutique2');
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
