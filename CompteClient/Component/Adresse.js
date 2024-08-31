import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, ScrollView, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ImageBackground, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { Modalize } from 'react-native-modalize'; 
import ClientStyle from '../../Styles/ClientStyle';
import { Picker } from '@react-native-picker/picker';
import Color from '../../Styles/Color';
import { Entypo, Ionicons } from '@expo/vector-icons';
import adresseStyle from '../../Styles/adresseStyle';
import API_BASE_URL from '../../ApiConfig';

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
    const modalizeRef = useRef(null); // Référence pour le Modalize

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
                if (!userId) {
                    Alert.alert('Erreur', 'Impossible de récupérer l\'ID du client. Veuillez vous reconnecter.');
                    return;
                }
        
                const response = await fetch(`${API_BASE_URL}/adresses?userId=${userId}`);
                const result = await response.json();
        
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
                    setCodePostal(adresseExistante.codePostal); 
                    setAppartement(adresseExistante.appartement);
                    setCurrentLocation({
                        latitude: adresseExistante.latitude,
                        longitude: adresseExistante.longitude,
                    });

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

    // Ouvrir le Modalize après quelques secondes une fois que le modal est visible
    useEffect(() => {
        if (modalVisible && modalizeRef.current) {
            const timer = setTimeout(() => {
                modalizeRef.current?.open();
            }, 1000); // 1 seconde avant l'apparition du Modalize

            return () => clearTimeout(timer); // Nettoyage du timeout si le modal se ferme
        }
    }, [modalVisible]);

    const handlePress = () => {
        setModalVisible(true);
    };

    const ajouterAdresse = async () => {
        if (!pays || !province || !ville || !rue || !numero) {
            Alert.alert('Erreur', 'Tous les champs obligatoires doivent être remplis.');
            return;
        } if (editId) {
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
        
            const response = await fetch(`${API_BASE_URL}/adresses`, {
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

            setAdresses([result.adresse]); 
            setEditId(result.idadresse);
            setModalVisible(false);
            setLoading(false);
        } catch (error) {
            setLoading(false);
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
            const response = await fetch(`${API_BASE_URL}/adresses/${editId}`, {
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
            setLoading(false);
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
        setNumero(result.name || '');  
        setCodePostal(result.postalCode || '');
        setAppartement(''); 
        setCurrentLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
        setLoading(false);
        modalizeRef.current?.close();
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
                <ImageBackground
                    source={require('../../assets/imageBack/road.jpg')} 
                    style={styles.backgroundImage}
                >
                    <View style={styles.overlay} />
                    <View style={adresseStyle.modalContent}>
                        <View style={adresseStyle.modalHeader}>
                            <Text style={styles.textTitre}>{editId ? 'Modifier l\'adresse' : 'Ajouter une nouvelle adresse'}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={24} color="red" />
                            </TouchableOpacity>
                        </View>

                            <Picker
                                selectedValue={pays}
                                onValueChange={(itemValue) => setPays(itemValue)}
                                style={styles.picker}
                                itemStyle={{ color: '#fff' }} 
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
                                    style={styles.input}
                                    placeholder="Province"
                                    value={province}
                                    onChangeText={setProvince}
                                    placeholderTextColor="#ccc"
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ville"
                                    value={ville}
                                    onChangeText={setVille}
                                    placeholderTextColor="#ccc"
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Rue"
                                    value={rue}
                                    onChangeText={setRue}
                                    placeholderTextColor="#ccc"
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Numéro"
                                    value={numero}
                                    onChangeText={setNumero}
                                    placeholderTextColor="#ccc"
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Code Postal (optionnel)"
                                    value={codePostal}
                                    onChangeText={setCodePostal}
                                    placeholderTextColor="#ccc"
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Appartement (optionnel)"
                                    value={appartement}
                                    onChangeText={setAppartement}
                                    placeholderTextColor="#ccc"
                                />
                            </ScrollView>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                        
                        <TouchableOpacity
                            style={[adresseStyle.bouton1, loading && styles.disabledButton]} 
                            onPress={editId ? handleUpdate : ajouterAdresse}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={adresseStyle.boutonTexte}>{editId ? 'Mettre à jour' : 'Ajouter'}</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[adresseStyle.bouton2, loading && styles.disabledButton]} 
                            onPress={obtenirLocalisationActuelle}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={adresseStyle.boutonTexte}>Utiliser ma localisation actuelle</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                {/* Modalize pour la recommandation */}
                <Modalize ref={modalizeRef} snapPoint={210} modalHeight={210} adjustToContentHeight={false}>
                    <View style={styles.modalizeContent}>
                        <Text style={styles.modalizeTitle}>Recommandation!</Text>
                        <Text style={styles.modalizeText}>Nous vous recommandons d'utiliser votre localisation actuelle pour un meilleur service, la modifier si nécessaire puis l'ajouter ou la mettre à jour.</Text>
                        <TouchableOpacity
                            style={[adresseStyle.bouton2, loading && styles.disabledButton]} 
                            onPress={obtenirLocalisationActuelle}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={adresseStyle.boutonTexte}>Utiliser ma localisation actuelle</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </Modalize>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    textTitre: {
        color: '#fff', 
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#00000091', 
        borderWidth: 1,
        borderColor: Color.bleu,
        borderRadius: 10,
        padding: 10,
        marginBottom: 16,
        color: '#fff', 
    },
    disabledButton: {
        opacity: 0.7,
    },
    picker: {
        color: '#fff', 
    },
    modalizeContent: {
        padding: 20,
        alignItems: 'center',
    },
    modalizeTitle:{
        fontSize:24,
        fontWeight:'bold',
        marginBottom:10
    },
    modalizeText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 15,
    },
});

export default Adresse;
