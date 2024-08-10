import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, FlatList, Alert ,KeyboardAvoidingView , Platform , TouchableWithoutFeedback , Keyboard, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import ClientStyle from '../../Styles/ClientStyle';
import { Picker } from '@react-native-picker/picker';
import Color from '../../Styles/Color';
import { Entypo, Ionicons, EvilIcons } from '@expo/vector-icons';
import Loading from '../../Component/Loading';
import adresseStyle from '../../Styles/adresseStyle';

const Adresse = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [pays, setPays] = useState('');
    const [province, setProvince] = useState('');
    const [ville, setVille] = useState('');
    const [rue, setRue] = useState('');
    const [numero, setNumero] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [appartement, setAppartement] = useState('');
    const [currentLocation, setCurrentLocation] = useState(null);
    const [editId, setEditId] = useState(null);
    const [adresses, setAdresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paysOptions, setPaysOptions] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                const countries = data.map(country => ({ code: country.cca2, name: country.name.common }));
                setPaysOptions(countries);
            } catch (error) {
                Alert.alert('Erreur', 'Erreur lors du chargement des pays.');
            }
        };

        const fetchAdresses = async () => {
            try {
                const userId = await AsyncStorage.getItem('idclient');
                console.log('ID utilisateur:', userId); 
                if (!userId) {
                    Alert.alert('Erreur', 'Impossible de récupérer l\'ID du client. Veuillez vous reconnecter.');
                    return;
                }
        
                const response = await fetch(`http://192.168.21.25:3300/adresses?userId=${userId}}`);
                const result = await response.json();
                console.log('Réponse du serveur:', result);  // Vérifiez la réponse du serveur
        
                if (!response.ok) {
                    Alert.alert('Erreur', result.message || 'Erreur lors du chargement des adresses.');
                    return;
                }
        
                if (result.adresses.length > 0) {
                    const adresseExistante = result.adresses[0];
                    setAdresses([adresseExistante]);
                    setEditId(adresseExistante.idadresse);
                    setPays(adresseExistante.pays);
                    setProvince(adresseExistante.province);
                    setVille(adresseExistante.ville);
                    setRue(adresseExistante.rue);
                    setNumero(adresseExistante.numero);
                    setCodePostal(adresseExistante.code_postal); // Assurez-vous d'utiliser 'code_postal' ici
                    setAppartement(adresseExistante.appartement);
                    setCurrentLocation({
                        latitude: adresseExistante.latitude,
                        longitude: adresseExistante.longitude,
                    });
                    console.log('Adresses renvoyées:', adresses);

                }else {
                    setAdresses([]);
                    setEditId(null);
                }
            } catch (error) {
                Alert.alert('Erreur', 'Erreur lors du chargement des adresses.');
            }
        };
        
        fetchCountries();
        fetchAdresses();
    }, []);

    const handlePress = () => {
        setModalVisible(true);
    };

    const ajouterAdresse = async () => {
        if (!pays || !province || !ville || !rue || !numero) {
            Alert.alert('Erreur', 'Tous les champs obligatoires doivent être remplis.');
            return;
        } if (editId) {
            // Si une adresse existe déjà, mettez-la à jour au lieu d'ajouter une nouvelle
            handleUpdate();
            return;
        }
    
        setLoading(true);

        try {
            const userId = await AsyncStorage.getItem('idclient');
            
            if (!userId) {
                Alert.alert('Erreur', 'Impossible de récupérer l\'ID du client. Veuillez vous reconnecter.');
                return;
            }
        
            const newAdresse = {
                userId,
                pays,
                province,
                ville,
                rue,
                numero: numero || '',  
                codePostal: codePostal || '',
                appartement: appartement || '',
                latitude: currentLocation?.latitude || null,
                longitude: currentLocation?.longitude || null,
                parDefaut: 1,
            };
            console.log('Nouvelle adresse envoyée:', newAdresse);
        
            const response = await fetch('http://192.168.21.25:3300/adresses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAdresse),
            });
        
            if (!response.ok) {
                const result = await response.json();
                Alert.alert('Erreur', result.message || 'Une erreur est survenue lors de l\'ajout de l\'adresse.');
                return;
            }
        
            const result = await response.json();

            if (!result.idadresse) {
                console.warn('ID manquant pour l\'adresse ajoutée:', result);
            }

            setAdresses([result.adresse]); // Remplacer l'adresse précédente par la nouvelle
            setEditId(result.idadresse);
            setModalVisible(false);
            setLoading(false);
        } catch (error) {
            Alert.alert('Erreur', 'Erreur lors de l\'ajout de l\'adresse.');
        }
    };

    const handleUpdate = async () => {
        if (!pays || !province || !ville || !rue || !numero || !editId) {
            Alert.alert('Erreur', 'Tous les champs obligatoires doivent être remplis.');
            return;
        }
        setLoading(true);

        try {
            const response = await fetch(`http://192.168.21.25:3300/adresses/${editId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pays, province, ville, rue, numero, codePostal, appartement }),
            });

            if (!response.ok) {
                const result = await response.json();
                Alert.alert('Erreur', result.message || 'Erreur lors de la mise à jour de l\'adresse.');
                return;
            }

            setAdresses(adresses.map(adresse =>
                adresse.idadresse === editId ? { ...adresse, pays, province, ville, rue, numero, codePostal, appartement } : adresse
            ));
            setModalVisible(false);
            setLoading(false);
        } catch (error) {
            Alert.alert('Erreur', 'Erreur lors de la mise à jour de l\'adresse.');
        }
    };

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

        setPays(result.isoCountryCode || '');
        setProvince(result.region || '');
        setVille(result.city || '');
        setRue(result.street || '');
        setNumero(result.name || '');  // Utilisez `name` pour le numéro
        setCodePostal(result.postalCode || '');
        setAppartement(''); 
        setCurrentLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
        console.log('Localisation actuelle:', {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });
        setLoading(false);
    };

    return (
        <View style={adresseStyle.container}>
            {adresses.length > 0 && (
                <TouchableOpacity style={ClientStyle.adresse} onPress={handlePress}>
                    <Entypo name="location-pin" size={15} color={Color.orange} />
                    <Text style={ClientStyle.textAdresse}>
                        {(() => {
                            const { rue, numero, ville, province } = adresses[0];
                            let adresseComplete = `${numero} ${rue}, ${ville}, ${province}`;
                            return adresseComplete.length > 30 ? adresseComplete.substring(0, 30) + '...' : adresseComplete;
                        })()}
                    </Text>
                    <Entypo name="arrow-with-circle-down" size={15} color="black" />
                    {adresses[0].parDefaut && <Text style={adresseStyle.defaultText}>(Par défaut)</Text>}
                </TouchableOpacity>
            )}
            <Modal visible={modalVisible} animationType="slide">
                <View style={adresseStyle.modalContent}>
                    <View style={adresseStyle.modalHeader}>
                        <Text style={adresseStyle.textTitre}>{editId ? 'Modifier l\'adresse' : 'Ajouter une nouvelle adresse'}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Ionicons name="close" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                    <Picker
                        selectedValue={pays}
                        onValueChange={(itemValue) => setPays(itemValue)}
                        style={adresseStyle.picker}
                    >
                        <Picker.Item label="Sélectionner un pays" value="" />
                        {paysOptions.map((paysOption) => (
                            <Picker.Item key={paysOption.code} label={paysOption.name} value={paysOption.code} />
                        ))}
                    </Picker>
                    <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView contentContainerStyle={adresseStyle.container}>
                            <TextInput
                                style={adresseStyle.input}
                                placeholder="Province"
                                value={province}
                                onChangeText={setProvince}
                            />
                            <TextInput
                                style={adresseStyle.input}
                                placeholder="Ville"
                                value={ville}
                                onChangeText={setVille}
                            />
                            <TextInput
                                style={adresseStyle.input}
                                placeholder="Rue"
                                value={rue}
                                onChangeText={setRue}
                            />
                            <TextInput
                                style={adresseStyle.input}
                                placeholder="Numéro"
                                keyboardType='numeric'
                                value={numero}
                                onChangeText={setNumero}
                            />
                            <TextInput
                                style={adresseStyle.input}
                                placeholder="Code Postal (optionnel)"
                                value={codePostal}
                                onChangeText={setCodePostal}
                            />
                            <TextInput
                                style={adresseStyle.input}
                                placeholder="Appartement (optionnel)"
                                value={appartement}
                                onChangeText={setAppartement}
                            />
                        </ScrollView>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                    
                    <TouchableOpacity style={adresseStyle.bouton1} onPress={editId ? handleUpdate : ajouterAdresse}>
                        <Text style={adresseStyle.boutonTexte}>{editId ? 'Mettre à jour' : 'Ajouter'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={adresseStyle.bouton2} onPress={obtenirLocalisationActuelle}>
                        <Text style={adresseStyle.boutonTexte}>Utiliser ma localisation actuelle</Text>
                    </TouchableOpacity>
                    {loading && <Loading />}
                </View>
            </Modal>
        </View>
    );
};

export default Adresse;
