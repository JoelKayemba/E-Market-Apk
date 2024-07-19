import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';
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


  const { countries, loading } = useFetchCountries();

;

 

  return (
    <DismissKeyboard>
      <View style={GlobalStyles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={GlobalStyles.container}
        >
          <ScrollView contentContainerStyle={GlobalStyles.scrollViewContent}>
            <Image
              source={require('../../assets/Images/ImgAdresse.jpg')}
              style={GlobalStyles.img2}
            />
            <View style={GlobalStyles.containerTitre}>
              <Text style={GlobalStyles.Titre}>Adresse</Text>
            </View>
            <View style={GlobalStyles.containerInput}>
              <View style={styles.pickerContainer}>
              <Entypo name="globe" size={30} color={Color.grisIcone} style={styles.icon} />
                {loading ? (
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
              <IconTextInput
                iconName="location"
                placeholder="Province/Etat"
                value={province}
                onChangeText={setProvince}
              />
              <IconTextInput
                iconName="location-pin"
                placeholder="Ville/Localité"
                value={city}
                onChangeText={setCity}
              />
              <IconTextInput
                iconName="address"
                placeholder="Quartier/Secteur"
                value={district}
                onChangeText={setDistrict}
              />
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
              <TouchableOpacity style={GlobalStyles.buttonContainer} >
                <View style={GlobalStyles.button}>
                  <Text style={GlobalStyles.buttonText} onPress={()=> navigation.navigate('Accueil')}>Continuer</Text>
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
    backgroundColor:Color.grisContainer,
    borderRadius: 50,
    paddingHorizontal: 10,
    marginBottom: 10,
    height:50,
  
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
    backgroundColor:Color.grisContainer,
    borderRadius: 50,
    paddingHorizontal: 10,
    height: 50,
    textAlign:'center'
    
  },
  streetNameInput: {
    flex: 2,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Color.grisContainer,
    backgroundColor:Color.grisContainer,
    borderRadius: 50,
    paddingHorizontal: 10,
    height: 50,
    textAlign:'center'
  },
  postalCodeInput: {
    flex: 2,
    borderWidth: 1,
    borderColor: Color.grisContainer,
    backgroundColor:Color.grisContainer,
    borderRadius: 50,
    paddingHorizontal: 10,
    height: 50,
    textAlign:'center'
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
