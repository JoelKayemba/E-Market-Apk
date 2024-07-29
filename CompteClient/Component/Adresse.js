import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, FlatList, Alert } from 'react-native';
import * as Location from 'expo-location';
import ClientStyle from '../../Styles/ClientStyle';
import Color from '../../Styles/Color';
import { Entypo, Ionicons, Octicons, EvilIcons } from '@expo/vector-icons';
import Loading from '../../Component/Loading';



const Adresse = () => {

    

    const [modalVisible, setModalVisible] = useState(false);
    const [nouvelleAdresse, setNouvelleAdresse] = useState('');
    const [currentLocation, setCurrentLocation] = useState(null);
    const [editId, setEditId] = useState(null); // ID de l'adresse en cours d'édition
    const [adresses, setAdresses] = useState([
        { id: '1', adresse: '123 Rue Exemple, Ville, Pays', parDefaut: true },
    ]);
    const [loading, setLoading] = useState(false); // État pour le chargement

    const handlePress = () => {
        setModalVisible(true);
    };

    const ajouterAdresse = () => {
        if (nouvelleAdresse.trim() !== '') {
            const newAdresse = { id: (adresses.length + 1).toString(), adresse: nouvelleAdresse, parDefaut: false, coordinates: currentLocation };
            setAdresses([...adresses, newAdresse]);
            setNouvelleAdresse('');
            setCurrentLocation(null);
            if (!adresses.some(adresse => adresse.parDefaut)) {
                setAdresses(adresses.map(adresse =>
                    adresse.id === newAdresse.id ? { ...adresse, parDefaut: true } : adresse
                ));
            }
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
        setLoading(true); // Démarrer le chargement
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission refusée', 'Nous avons besoin de votre permission pour accéder à la localisation.');
            setLoading(false); // Arrêter le chargement
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        let [result] = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });

        let adresse = `${result.number ? result.number + ' ' : ''}${result.street}, ${result.city}, ${result.region}, ${result.country}`;
        setNouvelleAdresse(adresse);
        setCurrentLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
        setLoading(false); // Arrêter le chargement
    };

    const handleEdit = (id, adresse) => {
        setEditId(id);
        setNouvelleAdresse(adresse);
        setModalVisible(true);
    };

    const handleUpdate = () => {
        if (nouvelleAdresse.trim() !== '' && editId) {
            setAdresses(adresses.map(adresse =>
                adresse.id === editId ? { ...adresse, adresse: nouvelleAdresse } : adresse
            ));
            setNouvelleAdresse('');
            setEditId(null);
        }
    };

    const adresseParDefaut = adresses.find(adresse => adresse.parDefaut);

    return (
        <View style={styles.container}>
            {adresseParDefaut && (
                <TouchableOpacity style={ClientStyle.adresse} onPress={handlePress}>
                    <Entypo name="location-pin" size={15} color={Color.orange} />
                    <Text style={ClientStyle.textAdresse}>
                        {adresseParDefaut.adresse.length > 30 ? adresseParDefaut.adresse.substring(0, 30) + '...' : adresseParDefaut.adresse}
                    </Text>
                    <Entypo name="arrow-with-circle-down" size={15} color="black" />
                    {adresseParDefaut.parDefaut && <Text style={styles.defaultText}>(Par défaut)</Text>}
                </TouchableOpacity>
            )}
            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContent}>
                    <Text style={styles.textTitre}>{editId ? 'Modifier l\'adresse' : 'Ajouter une nouvelle adresse'}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nouvelle adresse"
                        value={nouvelleAdresse}
                        onChangeText={setNouvelleAdresse}
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
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.adresseItem}>
                                    <Text style={item.parDefaut ? styles.defaultAdresse : {}}>{item.adresse.length > 30 ? item.adresse.substring(0, 30) + '...' : item.adresse}</Text>
                                    <View style={styles.adresseActions}>
                                        <TouchableOpacity onPress={() => handleEdit(item.id, item.adresse)} style={styles.stylo}>
                                            <Octicons name="pencil" size={24} color="black" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => choisirParDefaut(item.id)}>
                                            <Ionicons
                                                name="checkbox-outline"
                                                size={24}
                                                color={item.parDefaut ? Color.vert : Color.grisIcone}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => supprimerAdresse(item.id)} style={styles.supprimer}>
                                            <EvilIcons name="trash" size={30} color="red" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        />
                    )}
                    <TouchableOpacity style={styles.bouton3} onPress={() => setModalVisible(false)}>
                        <Text style={styles.boutonTexte}>Fermer</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    textTitre: {
        fontSize: 24,
        marginBottom: 10,
        marginTop: 30,
        fontFamily:'InriaSerif',
        marginBottom:40
    },
    defaultText: {
        color: Color.vert,
    },
    modalContent: {
        height: '70%', // 70% de la hauteur de l'écran
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        alignItems: 'center',
        backgroundColor: Color.grisContainer,
        borderRadius: 50,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: Color.grisIcone,
        height: 40,
        width: 350,
        marginBottom: 20,
    },
    adresseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: Color.grisIcone,
        width: '100%',
    },
    adresseActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 150,
    },
    defaultAdresse: {
        color: Color.vert,
    },
    stylo: {
        marginLeft: 10,
    },
    supprimer: {
        marginRight: 20,
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
        backgroundColor: Color.bleu,
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
        fontSize: 18,
    },
});

export default Adresse;
