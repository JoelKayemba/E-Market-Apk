import React, { useReducer, useEffect ,useState} from 'react';
import { Text } from 'react-native';
import BoutiqueInfo from './BoutiqueInfo';
import BoutiqueCategorie from './BoutiqueCategorie';
import BoutiqueImages from './BoutiqueImages';
import BoutiqueDescription from './BoutiqueDescription';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialState, boutiqueReducer} from '../../Redux/reducers/boutiqueReducer'
import { setFieldValue, setIdClient, setImages, ajouterBoutiqueAction } from '../../Redux/actions/boutiqueActions';

const AjouterBoutique = ({ navigation }) => {
  const [state, dispatch] = useReducer(boutiqueReducer, initialState);
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (name, value) => {
    dispatch(setFieldValue(name, value));
  };

  const handleImagesChange = (images) => {
    dispatch(setImages(images));
  };

  const handleSubmit = () => {
    console.log("Données envoyées au backend :", state); 
    ajouterBoutiqueAction(state, navigation)(dispatch);
  };
  

  useEffect(() => {
    const fetchIdClient = async () => {
      const idclient = await AsyncStorage.getItem('idclient');
      console.log("idclient récupéré :", idclient); // Vérifiez ici
      if (idclient) {
        dispatch(setIdClient(parseInt(idclient, 10))); // Assurez-vous qu'il est un nombre
      }
    };
    fetchIdClient();
  }, []);
  

  switch (step) {
    case 1:
      return <BoutiqueInfo nextStep={nextStep} handleChange={handleChange} formData={state} />;
    case 2:
      return <BoutiqueCategorie nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={state} />;
    case 3:
      return <BoutiqueImages nextStep={nextStep} prevStep={prevStep} handleChange={handleImagesChange} formData={state} />;
    case 4:
      return <BoutiqueDescription prevStep={prevStep} handleChange={handleChange} formData={state} handleSubmit={handleSubmit} />;
    default:
      return <Text>Formulaire terminé</Text>;
  }
};

export default AjouterBoutique;
