import React, { useState , useEffect} from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, FlatList, Alert } from 'react-native';
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
    

    const [paysOptions, setPaysOptions] = useState([]); // État pour les options de pays

    useEffect(() => {
        // Charger la liste des pays
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

        //recuperer les adresses de l'utilisateur
        const fetchAdresses = async () => {
            try {
                const userId = await AsyncStorage.getItem('idclient');
                if (!userId) {
                    Alert.alert('Erreur', 'Impossible de récupérer l\'ID du client. Veuillez vous reconnecter.');
                    return;
                }
                const response = await fetch(`http://192.168.21.25:3300/adresses?userId=${userId}`);
                const result = await response.json();
                if (!response.ok) {
                    Alert.alert('Erreur', 'Erreur lors du chargement des adresses .');
                    return;
                }
                if(result.length==0){
                    setAdresses([
                        { id: '0', pays: 'Pays ', province: 'Provinces ', ville: 'Ville ', rue: 'Rue ', numero: '123', codePostal: '00000', appartement: 'Apt 1', latitude: null, longitude: null, parDefaut: true },
                    ])
                }
                if(result.length!=0){
                    setAdresses(result);
                }
                
            } catch (error) {
                Alert.alert('Erreur', 'Erreur lors du chargement des adresses .');
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
            numero,
            codePostal,
            appartement,
            latitude: currentLocation?.latitude || null,
            longitude: currentLocation?.longitude || null,
            parDefaut: adresses.length === 0 ? 1 : 0, // Marquer la première adresse comme par défaut
          };
      
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

          console.log('Adresse ajoutée:', result);

          if (!result.idadresse) {
            console.warn('ID manquant pour l\'adresse ajoutée:', result);
        }

        // Mise à jour de l'état avec l'ID
        setAdresses((prevAdresses) => [...prevAdresses, { ...result.adresse, id: result.idadresse }]);
        setPays('');
        setProvince('');
        setVille('');
        setRue('');
        setNumero('');
        setCodePostal('');
        setAppartement('');
        setCurrentLocation(null);
        setLoading(false);
        } catch (error) {
          Alert.alert('Erreur', 'Erreur lors de l\'ajout de l\'adresse .');
        }
      };
      

      const choisirParDefaut = async (id) => {
        try {
            const response = await fetch(`http://192.168.21.25:3300/adresses/${id}/parDefaut`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ parDefaut: true }),
            });

            if (!response.ok) {
                const result = await response.json();
                Alert.alert('Erreur', result.message || 'Erreur lors de la mise à jour de l\'adresse par défaut.');
                return;
            }

            setAdresses(adresses.map(adresse =>
                adresse.id === id ? { ...adresse, parDefaut: true } : { ...adresse, parDefaut: false }
            ));
            setModalVisible(false);
        } catch (error) {
            Alert.alert('Erreur', 'Erreur lors de la mise à jour de l\'adresse par défaut.');
        }
    };

    const supprimerAdresse = async (id) => {
        const updatedAdresses = adresses.filter(adresse => adresse.id !== id);
        if (updatedAdresses.length === 0) {
            Alert.alert('Erreur', 'Vous devez avoir au moins une adresse par défaut.');
            return;
        }
        if (adresses.find(adresse => adresse.id === id).parDefaut) {
            updatedAdresses[0].parDefaut = true;
        }
    
        try {
            const response = await fetch(`http://192.168.21.25:3300/adresses/${id}/supprimer`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                Alert.alert('Erreur', 'Erreur lors de la suppression de l\'adresse.');
                return;
            }
            setAdresses(updatedAdresses);
        } catch (error) {
            Alert.alert('Erreur', 'Erreur lors de la suppression de l\'adresse.');
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

        setPays(result.country || '');
        setProvince(result.region || '');
        setVille(result.city || '');
        setRue(result.street || '');
        setNumero(result.number || '');
        setCodePostal(result.postalCode || '');
        setAppartement(''); 
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

    const handleUpdate = async () => {
        if (!pays || !province || !ville || !rue || !numero || !editId) {
            Alert.alert('Erreur', 'Tous les champs obligatoires doivent être remplis.');
            return;
        }

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
                Alert.alert('Erreur', result.message || 'Erreur lors de la mise à jour de l\'adresse .');
                return;
            }

            // Mise à jour de l'état avec l'adresse modifiée
            setAdresses(adresses.map(adresse =>
                adresse.idadresse === editId ? { ...adresse, pays, province, ville, rue, numero, codePostal, appartement } : adresse
            ));
            setPays('');
            setProvince('');
            setVille('');
            setRue('');
            setNumero('');
            setCodePostal('');
            setAppartement('');
            setEditId(null);
        } catch (error) {
            Alert.alert('Erreur', 'Erreur lors de la mise à jour de l\'adresse.');
        }
    };

    const adresseParDefaut = adresses.find(adresse => adresse.parDefaut);

    return (
        <View style={adresseStyle.container}>
            {adresseParDefaut && (
                <TouchableOpacity style={ClientStyle.adresse} onPress={handlePress}>
                    <Entypo name="location-pin" size={15} color={Color.orange} />
                    <Text style={ClientStyle.textAdresse}>
                        {(() => {
                            const { rue, numero, ville ,province} = adresseParDefaut;
                            let adresseComplete = `${numero} ${rue}, ${ville}, ${province}`;
                            return adresseComplete.length > 30 ? adresseComplete.substring(0, 30) + '...' : adresseComplete;
                        })()}
                    </Text>
                    <Entypo name="arrow-with-circle-down" size={15} color="black" />
                    {adresseParDefaut.parDefaut && <Text style={adresseStyle.defaultText}>(Par défaut)</Text>}
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
                    <TouchableOpacity style={adresseStyle.bouton1} onPress={editId ? handleUpdate : ajouterAdresse}>
                        <Text style={adresseStyle.boutonTexte}>{editId ? 'Mettre à jour' : 'Ajouter'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={adresseStyle.bouton2} onPress={obtenirLocalisationActuelle}>
                        <Text style={adresseStyle.boutonTexte}>Utiliser ma localisation actuelle</Text>
                    </TouchableOpacity>
                    {loading ? (
                        <Loading />
                    ) : (
                        <FlatList
                            data={adresses}
                            keyExtractor={item => item.id ? item.id.toString() : 'undefined'}
                            renderItem={({ item }) =>{
                                
                                return(
                                <View style={adresseStyle.adresseItem}>
                                     <TouchableOpacity onPress={() => choisirParDefaut(item.id)}>
                                            <Ionicons
                                                name={item.parDefaut ? "checkbox-outline" : "square-outline"}
                                                size={20}
                                                color={item.parDefaut ? "green" : "black"}
                                            />
                                        </TouchableOpacity>
                                        <Text style={adresseStyle.adresseText}>
                                            {item.numero} {item.rue}, {item.ville}, {item.province}
                                        </Text>
                                    <View style={adresseStyle.adresseActions}>
                                        <TouchableOpacity onPress={() => handleEdit(item.id, item)}>
                                            <Ionicons name="pencil" size={20} color={Color.blue} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => supprimerAdresse(item.id)}>
                                            <EvilIcons name="trash" size={25} color="red" />
                                        </TouchableOpacity>
                                       
                                          
                                    </View>
                                    
                                </View>
                                
                            )}}
                        />
                    )}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
   
});

export default Adresse;
