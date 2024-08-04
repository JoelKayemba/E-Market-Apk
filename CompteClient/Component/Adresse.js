import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, FlatList, Alert } from 'react-native';
import * as Location from 'expo-location';
import ClientStyle from '../../Styles/ClientStyle';
import Color from '../../Styles/Color';
import { Entypo, Ionicons, EvilIcons } from '@expo/vector-icons';
import Loading from '../../Component/Loading';

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
    const [adresses, setAdresses] = useState([
        { id: '0', pays: 'Pays ', province: 'Province ', ville: 'Ville ', rue: 'Rue ', numero: '123', codePostal: '00000', appartement: 'Apt 1', latitude: null, longitude: null, parDefaut: true },
    ]);
    const [loading, setLoading] = useState(false);

    const handlePress = () => {
        setModalVisible(true);
    };

    
        const ajouterAdresse = async () => {
            if (!pays || !province || !ville || !rue || !numero) {
                Alert.alert('Erreur', 'Tous les champs obligatoires doivent être remplis.');
                return;
            }
    
            const newAdresse = { 
                pays,
                province,
                ville,
                rue,
                numero,
                codePostal,
                appartement,
                latitude: currentLocation?.latitude || null,
                longitude: currentLocation?.longitude || null,
                parDefaut: adresses.length === 0 // Marquer la première adresse comme par défaut
            };
    
            try {
                const response = await fetch('http://192.168.21.25:3300/auth/adresses', {
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
                setAdresses([...adresses, result]);
                setPays('');
                setProvince('');
                setVille('');
                setRue('');
                setNumero('');
                setCodePostal('');
                setAppartement('');
                setCurrentLocation(null);
            } catch (error) {
                Alert.alert('Erreur', 'Erreur lors de l\'ajout de l\'adresse.');
            }
        };

    const choisirParDefaut = (id) => {
        setAdresses(adresses.map(adresse =>
            adresse.id === id ? { ...adresse, parDefaut: true } : { ...adresse, parDefaut: false }
        ));
        setModalVisible(false);
    };

    const supprimerAdresse = (id) => {
        const updatedAdresses = adresses.filter(adresse => adresse.id !== id);
        if (updatedAdresses.length === 0) {
            Alert.alert('Erreur', 'Vous devez avoir au moins une adresse par défaut.');
            return;
        }
        if (adresses.find(adresse => adresse.id === id).parDefaut) {
            updatedAdresses[0].parDefaut = true;
        }
        setAdresses(updatedAdresses);
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

        setPays(result.country || '');
        setProvince(result.region || '');
        setVille(result.city || '');
        setRue(result.street || '');
        setNumero(result.number || '');
        setCodePostal(result.postalCode || '');
        setAppartement(''); // Exemple de valeur, à modifier selon vos besoins
        setCurrentLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
        setLoading(false);
    };

    const handleEdit = (id, adresse) => {
        setEditId(id);
        setPays(adresse.pays);
        setProvince(adresse.province);
        setVille(adresse.ville);
        setRue(adresse.rue);
        setNumero(adresse.numero);
        setCodePostal(adresse.codePostal);
        setAppartement(adresse.appartement);
        setModalVisible(true);
    };

    const handleUpdate = () => {
        if (!pays || !province || !ville || !rue || !numero || !editId) {
            Alert.alert('Erreur', 'Tous les champs obligatoires doivent être remplis.');
            return;
        }
        
        setAdresses(adresses.map(adresse =>
            adresse.id === editId ? { ...adresse, pays, province, ville, rue, numero, codePostal, appartement } : adresse
        ));
        setPays('');
        setProvince('');
        setVille('');
        setRue('');
        setNumero('');
        setCodePostal('');
        setAppartement('');
        setEditId(null);
        setModalVisible(false);
    };

    const adresseParDefaut = adresses.find(adresse => adresse.parDefaut);

    return (
        <View style={styles.container}>
            {adresseParDefaut && (
                <TouchableOpacity style={ClientStyle.adresse} onPress={handlePress}>
                    <Entypo name="location-pin" size={15} color={Color.orange} />
                    <Text style={ClientStyle.textAdresse}>
                        {adresseParDefaut.rue.length > 30 ? adresseParDefaut.rue.substring(0, 30) + '...' : adresseParDefaut.rue}
                    </Text>
                    <Entypo name="arrow-with-circle-down" size={15} color="black" />
                    {adresseParDefaut.parDefaut && <Text style={styles.defaultText}>(Par défaut)</Text>}
                </TouchableOpacity>
            )}
            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.textTitre}>{editId ? 'Modifier l\'adresse' : 'Ajouter une nouvelle adresse'}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Ionicons name="close" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Pays"
                        value={pays}
                        onChangeText={setPays}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Province"
                        value={province}
                        onChangeText={setProvince}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Ville"
                        value={ville}
                        onChangeText={setVille}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Rue"
                        value={rue}
                        onChangeText={setRue}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Numéro"
                        keyboardType='numeric'
                        value={numero}
                        onChangeText={setNumero}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Code Postal (optionnel)"
                        value={codePostal}
                        onChangeText={setCodePostal}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Appartement (optionnel)"
                        value={appartement}
                        onChangeText={setAppartement}
                    />
                    <TouchableOpacity style={styles.bouton1} onPress={editId ? handleUpdate : ajouterAdresse}>
                        <Text style={styles.boutonTexte}>{editId ? 'Mettre à jour' : 'Ajouter'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bouton2} onPress={obtenirLocalisationActuelle}>
                        <Text style={styles.boutonTexte}>Utiliser ma localisation actuelle</Text>
                    </TouchableOpacity>
                    {loading ? (
                        <Loading />
                    ) : (
                        <FlatList
                            data={adresses}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.adresseItem}>
                                     <TouchableOpacity onPress={() => choisirParDefaut(item.id)}>
                                            <Ionicons
                                                name={item.parDefaut ? "checkbox-outline" : "square-outline"}
                                                size={20}
                                                color={item.parDefaut ? "green" : "black"}
                                            />
                                        </TouchableOpacity>
                                    <Text style={ClientStyle.textAdresse}>
                                        {item.rue}, {item.ville}, {item.province}, {item.pays}, {item.numero}, {item.codePostal}
                                    </Text>
                                    <View style={styles.adresseActions}>
                                        <TouchableOpacity onPress={() => handleEdit(item.id, item)}>
                                            <Ionicons name="pencil" size={20} color={Color.blue} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => supprimerAdresse(item.id)}>
                                            <EvilIcons name="trash" size={25} color="red" />
                                        </TouchableOpacity>
                                       
                                          
                                    </View>
                                    
                                </View>
                                
                            )}
                        />
                    )}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
       paddingBottom:5
    },
    modalContent: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop:30
    },
    textTitre: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: Color.grey,
        marginBottom: 15,
        padding: 10,
    },
    bouton1: {
        backgroundColor: Color.vert,
        borderRadius: 50,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bouton2: {
        backgroundColor: Color.bleuTransparent,
        borderRadius: 50,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bouton3: {
        backgroundColor: Color.orange,
        borderRadius: 50,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width:300
    },
    boutonTexte: {
        color: 'white',
        textAlign: 'center',
    },
    adresseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Color.grey,
    },
    adresseActions: {
        flexDirection:'row',
        

    },
    defaultText: {
        color: Color.orange,
        fontWeight: 'bold',
    },
});

export default Adresse;
