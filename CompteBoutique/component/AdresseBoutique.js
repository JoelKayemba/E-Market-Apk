import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, ScrollView, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import { Modalize } from 'react-native-modalize';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import API_BASE_URL from '../../ApiConfig';

const AdresseBoutique = ({ route }) => {
  const { boutique } = route.params;
  const [pays, setPays] = useState('');
  const [province, setProvince] = useState('');
  const [ville, setVille] = useState('');
  const [rue, setRue] = useState('');
  const [numero, setNumero] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [appartement, setAppartement] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paysOptions, setPaysOptions] = useState([]);
  const modalizeRef = useRef(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const countries = data.map(country => ({
          code: country.cca2,
          name: country.name.common
        })).sort((a, b) => a.name.localeCompare(b.name));
        setPaysOptions(countries);
      } catch (error) {
        Alert.alert('Erreur', 'Erreur lors du chargement des pays.');
      }
    };

    const fetchAddress = async () => {
      try {
        const boutiqueId = boutique.idBoutique;
        if (!boutiqueId) {
          Alert.alert('Erreur', 'Impossible de récupérer l\'ID de la boutique.');
          return;
        }
        const response = await fetch(`${API_BASE_URL}/adresseBoutique?boutiqueId=${boutiqueId}`);
        const result = await response.json();

        if (!response.ok) {
          Alert.alert('Erreur', result.message || 'Erreur lors du chargement de l\'adresse.');
          return;
        }

        if (result.adresses.length > 0) {
          const adresseExistante = result.adresses[0];
          setPays(adresseExistante.pays);
          setProvince(adresseExistante.province);
          setVille(adresseExistante.ville);
          setRue(adresseExistante.rue);
          setNumero(adresseExistante.numero);
          setCodePostal(adresseExistante.codePostal);
          setAppartement(adresseExistante.appartement);
          setCurrentLocation({ latitude: adresseExistante.latitude, longitude: adresseExistante.longitude });
        }
      } catch (error) {
        Alert.alert('Erreur', 'Erreur lors du chargement de l\'adresse.');
      }
    };

    fetchCountries();
    fetchAddress();
  }, []);

  useEffect(() => {
    if (modalVisible && modalizeRef.current) {
      setTimeout(() => {
        modalizeRef.current?.open();
      }, 1000);
    }
  }, [modalVisible]);

  const obtenirLocalisationActuelle = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'Nous avons besoin de votre permission pour accéder à la localisation.');
      setLoading(false);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let [result] = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    // Correspondance du pays avec le Picker
    const matchedCountry = paysOptions.find(option => option.code === result.isoCountryCode);
    if (matchedCountry) {
      setPays(matchedCountry.name);
    } else {
      setPays(result.country || '');
    }

    setProvince(result.region || '');
    setVille(result.city || '');
    setRue(result.street || '');
    setNumero(result.name || '');
    setCodePostal(result.postalCode || '');
    setAppartement('');
    setCurrentLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    setLoading(false);
  };

  const handleAddressSubmit = async () => {
    if (!pays || !province || !ville || !rue || !numero) {
      Alert.alert('Erreur', 'Tous les champs obligatoires doivent être remplis.');
      return;
    }

    setLoading(true);
    try {
      const boutiqueId = boutique.idBoutique;
      if (!boutiqueId) {
        Alert.alert('Erreur', 'Impossible de récupérer l\'ID de la boutique.');
        return;
      }

      const adresseData = {
        boutiqueId,
        pays,
        province,
        ville,
        rue,
        numero,
        codePostal: codePostal || '',
        appartement: appartement || '',
        latitude: currentLocation?.latitude || null,
        longitude: currentLocation?.longitude || null,
      };

      const response = await fetch(`${API_BASE_URL}/adresseBoutique`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adresseData),
      });

      if (!response.ok) {
        const result = await response.json();
        Alert.alert('Erreur', result.message || 'Une erreur est survenue.');
        return;
      }

      setModalVisible(false);
      setLoading(false);
      Alert.alert('Succès', 'Adresse ajoutée ou mise à jour avec succès.');
    } catch (error) {
      setLoading(false);
      Alert.alert('Erreur', 'Erreur lors de l\'ajout ou de la mise à jour de l\'adresse.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adresse de la Boutique</Text>

      <View style={styles.addressContainer}>
        {rue ? (
          <Text style={styles.addressText}>{numero} {rue}, {ville}, {province}, {pays}</Text>
        ) : (
          <Text style={styles.addressText}>Aucune adresse disponible</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>{rue ? 'Mettre à jour l\'adresse' : 'Ajouter une adresse'}</Text>
      </TouchableOpacity>

      {/* Modal pour ajouter / mettre à jour l'adresse */}
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <ImageBackground source={require('../../assets/imageBack/road.jpg')} style={styles.backgroundImage}>
          <View style={styles.overlay} />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajouter / Modifier l'adresse</Text>
            <ScrollView contentContainerStyle={styles.formContainer}>
              <Text style={styles.label}>Pays</Text>
              <Picker selectedValue={pays} onValueChange={setPays} style={styles.picker} itemStyle={{ color: '#fff' }} >
                <Picker.Item label="Sélectionner un pays" value="" />
                {paysOptions.map(option => (
                  <Picker.Item key={option.code} label={option.name} value={option.name} />
                ))}
              </Picker>

              <Text style={styles.label}>Province</Text>
              <TextInput style={styles.input} value={province} onChangeText={setProvince} />

              <Text style={styles.label}>Ville</Text>
              <TextInput style={styles.input} value={ville} onChangeText={setVille} />

              <Text style={styles.label}>Rue</Text>
              <TextInput style={styles.input} value={rue} onChangeText={setRue} />

              <Text style={styles.label}>Numéro</Text>
              <TextInput style={styles.input} value={numero} onChangeText={setNumero} />

              <Text style={styles.label}>Code Postal</Text>
              <TextInput style={styles.input} value={codePostal} onChangeText={setCodePostal} />

              <Text style={styles.label}>Appartement</Text>
              <TextInput style={styles.input} value={appartement} onChangeText={setAppartement} />

              <TouchableOpacity style={styles.submitButton} onPress={handleAddressSubmit} disabled={loading}>
                {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Enregistrer</Text>}
              </TouchableOpacity>
              <TouchableOpacity style={styles.locationButton} onPress={obtenirLocalisationActuelle} disabled={loading}>
                <Text style={styles.buttonText}>Utiliser ma localisation actuelle</Text>
              </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', padding: 20 , marginTop:30 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  addressContainer: { padding: 15, backgroundColor: '#fff', borderRadius: 10, marginBottom: 20, elevation: 3 },
  addressText: { fontSize: 16, color: '#333' },
  button: { backgroundColor: '#1E90FF', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  backgroundImage: { flex: 1, resizeMode: 'cover' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { padding: 20 ,marginTop:30},
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  formContainer: { paddingBottom: 20 },
  label: { fontSize: 14, color: '#fff', marginBottom: 5 },
  input: { backgroundColor: '#00000091', padding: 10, borderRadius: 5, marginBottom: 10 , color: '#fff'},
  picker: { backgroundColor: '#00000091', borderRadius: 5, marginBottom: 10 ,color: '#fff'},
  submitButton: { backgroundColor: '#1E90FF', padding: 10, borderRadius: 5, alignItems: 'center', marginVertical: 5 },
  locationButton: { backgroundColor: '#1E90FF', padding: 10, borderRadius: 5, alignItems: 'center', marginVertical: 5 },
  closeButton: { alignItems: 'center', marginTop: 10 },
});

export default AdresseBoutique;
