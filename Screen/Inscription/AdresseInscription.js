import React, { useState } from 'react';
import { StyleSheet,Alert, Text, View, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import IconTextInput from '../../Component/IconTextInput';
import DismissKeyboard from '../../Component/DismissKeyboard';
import GlobalStyles from '../../Styles/GlobalStyles';
import useFetchCountries from '../../Logique/useFetchCountries';
import Color from '../../Styles/Color';
import { Entypo } from '@expo/vector-icons';

const AdresseInscription = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { countries, loading: loadingCountries } = useFetchCountries();
  console.log(countries);

  const handleRegister = async () => {
    if (!selectedCountry || !province || !city || !district || !streetNumber || !streetName || !postalCode) {
      Alert.alert('Erreur', 'Tous les champs sont requis');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://192.168.21.25:3300/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedCountry,
          province,
          city,
          district,
          streetNumber,
          streetName,
          postalCode,
        }),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        Alert.alert('Succès', 'Inscription réussie pour {}');
        navigation.navigate('Accueil');
      } else {
        Alert.alert('Erreur', result.message || 'Une erreur est survenue');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setLoading(false);
      Alert.alert('Erreur', 'Erreur lors de l\'inscription');
    }
  };

  return (
    <DismissKeyboard>
      <View style={GlobalStyles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={GlobalStyles.container}>
          <ScrollView contentContainerStyle={GlobalStyles.scrollViewContent}>
            <Image source={require('../../assets/Images/ImgAdresse.jpg')} style={GlobalStyles.img2} />
            <View style={GlobalStyles.containerTitre}>
              <Text style={GlobalStyles.Titre}>Adresse</Text>
            </View>
            <View style={GlobalStyles.containerInput}>
              <View style={styles.pickerContainer}>
                <Entypo name="globe" size={30} color={Color.grisIcone} style={styles.icon} />
                {loadingCountries ? (
                  <ActivityIndicator size="small" color="#0000ff" />
                ) : (
                  <RNPickerSelect
                    onValueChange={(value) => setSelectedCountry(value)}
                    items={countries.map((country) => ({ label: country, value: country }))}
                    style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{ label: "Sélectionner un pays", value: null }}
                  />
                )}
              </View>
              <IconTextInput iconName="location" placeholder="Province/Etat" value={province} onChangeText={setProvince} />
              <IconTextInput iconName="location-pin" placeholder="Ville/Localité" value={city} onChangeText={setCity} />
              <IconTextInput iconName="address" placeholder="Quartier/Secteur" value={district} onChangeText={setDistrict} />
              <View style={styles.streetContainer}>
                <TextInput
                  style={styles.streetNumberInput}
                  placeholder="N°"
                  value={streetNumber}
                  onChangeText={setStreetNumber}
                  keyboardType="number-pad"
                />
                <TextInput
                  style={styles.streetNameInput}
                  placeholder="Rue/Avenue"
                  value={streetName}
                  onChangeText={setStreetName}
                />
                <TextInput
                  style={styles.postalCodeInput}
                  placeholder="Code Postal"
                  value={postalCode}
                  onChangeText={setPostalCode}
                />
              </View>
            </View>
            <View style={GlobalStyles.containerConnexion}>
              <TouchableOpacity style={GlobalStyles.buttonContainer} onPress={handleRegister}>
                <View style={GlobalStyles.button}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <Text style={GlobalStyles.buttonText}>Continuer</Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </DismissKeyboard>
  );
}

export default AdresseInscription;

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.grisContainer,
    backgroundColor: Color.grisContainer,
    borderRadius: 50,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 50,
  },
  picker: {
    flex: 1,
    height: 50,
    color: 'black',
  },
  pickerItem: {
    color: 'black',
  },
  icon: {
    paddingLeft: 9,
  },
  streetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  streetNumberInput: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Color.grisContainer,
    backgroundColor: Color.grisContainer,
    borderRadius: 50,
    paddingHorizontal: 10,
    height: 50,
    textAlign: 'center',
  },
  streetNameInput: {
    flex: 2,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Color.grisContainer,
    backgroundColor: Color.grisContainer,
    borderRadius: 50,
    paddingHorizontal: 10,
    height: 50,
    textAlign: 'center',
  },
  postalCodeInput: {
    flex: 2,
    borderWidth: 1,
    borderColor: Color.grisContainer,
    backgroundColor: Color.grisContainer,
    borderRadius: 50,
    paddingHorizontal: 10,
    height: 50,
    textAlign: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    color: 'black',
    paddingRight: 30,
  },
});
