import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Color from '../../Styles/Color';

const ModifierProfil = () => {
    const [prenom, setPrenom] = useState('');
    const [sexe, setSexe] = useState('Homme');
    const [dateNaissance, setDateNaissance] = useState('');
    const [email, setEmail] = useState('');
    const [nomUtilisateur, setNomUtilisateur] = useState('');
    const [loading, setLoading] = useState(false);
    const [dateError, setDateError] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserData = async () => {
            const idclient = await AsyncStorage.getItem('idclient');
            if (!idclient) {
                Alert.alert('Erreur', 'Impossible de récupérer l\'ID client');
                return;
            }

            setLoading(true);

            try {
                const response = await fetch(`http://192.168.21.25:3300/profil?idclient=${idclient}`);
                const result = await response.json();

                if (response.ok) {
                    setPrenom(result.prenom || '');
                    setSexe(result.sexe || 'Homme');
                    setDateNaissance(result.date_naissance || '');
                    setEmail(result.email || '');
                    setNomUtilisateur(result.nom_utilisation || '');
                } else {
                    Alert.alert('Erreur', result.message || 'Erreur lors du chargement du profil.');
                }
            } catch (error) {
                Alert.alert('Erreur', 'Erreur lors du chargement du profil.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const validateDate = (date) => {
        const regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

        if (!regex.test(date)) {
            return 'Format invalide. Utilisez AAAA-MM-JJ.';
        }

        const [year, month, day] = date.split('-').map(Number);

        if (year > new Date().getFullYear()) {
            return 'L\'année ne peut pas dépasser l\'année en cours.';
        }

        if (month < 1 || month > 12) {
            return 'Le mois doit être compris entre 01 et 12.';
        }

        if (day < 1 || day > 31) {
            return 'Le jour doit être compris entre 01 et 31.';
        }

        return '';
    };

    const handleSave = async () => {
        const dateErrorMsg = validateDate(dateNaissance);
        if (dateErrorMsg) {
            setDateError(dateErrorMsg);
            return;
        }

        setLoading(true);
        const idclient = await AsyncStorage.getItem('idclient');
        if (!idclient) {
            Alert.alert('Erreur', 'Impossible de récupérer l\'ID client');
            setLoading(false);
            return;
        }

        const response = await fetch('http://192.168.21.25:3300/profil/modifier', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idclient,
                prenom,
                sexe,
                date_naissance: dateNaissance,
                email,
                nom_utilisation: nomUtilisateur,
            }),
        });

        setLoading(false);

        if (response.ok) {
            const result = await response.json();
            Alert.alert('Succès', result.message);
            navigation.goBack();
        } else {
            const result = await response.json();
            Alert.alert('Erreur', result.message);
        }
    };

    const handleDeleteAccount = async () => {
        Alert.alert(
            'Confirmer la suppression',
            'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.',
            [
                { text: 'Annuler', style: 'cancel' },
                { text: 'Supprimer', onPress: async () => {
                    setLoading(true);
                    const idclient = await AsyncStorage.getItem('idclient');
                    if (!idclient) {
                        Alert.alert('Erreur', 'Impossible de récupérer l\'ID client');
                        setLoading(false);
                        return;
                    }
    
                    const response = await fetch('http://192.168.21.25:3300/profil/supprimer', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ idclient }),
                    });
    
                    setLoading(false);
    
                    if (response.ok) {
                        Alert.alert('Compte supprimé', 'Votre compte a été supprimé avec succès.');
                        await AsyncStorage.clear();
                        navigation.navigate('Connexion'); 
                    } else {
                        const result = await response.json();
                        Alert.alert('Erreur', result.message);
                    }
                }},
            ]
        );
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ImageBackground
                    source={require('../../assets/imageBack/modifierProfile.jpg')}
                    style={styles.backgroundImage}
                >
                    <ScrollView contentContainerStyle={styles.container}>
                    {loading ? (
                        <ActivityIndicator size="large" color={Color.orange} />
                    ) : (
                        <>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                <Ionicons name="arrow-back" size={30} color={Color.orange} />
                            </TouchableOpacity>
                           
                            <Text style={styles.label}>Prénom</Text>
                            <TextInput style={styles.input} value={prenom} onChangeText={setPrenom} placeholderTextColor="#ccc" />

                            <Text style={styles.label}>Sexe</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={sexe}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => setSexe(itemValue)}
                                    dropdownIconColor="#fff"
                                    itemStyle={{ color: '#fff' }}
                        
                                >
                                    <Picker.Item label="Homme" value="Homme" />
                                    <Picker.Item label="Femme" value="Femme" />
                                    <Picker.Item label="Autre" value="Autre" />
                                </Picker>
                            </View>
                            
                            <Text style={styles.label}>Date de Naissance</Text>
                            <TextInput
                                style={styles.input}
                                value={dateNaissance}
                                onChangeText={(text) => {
                                    setDateNaissance(text);
                                    setDateError('');
                                }}
                                placeholder="AAAA-MM-JJ"
                                placeholderTextColor="#ccc"
                                keyboardType="text"
                            />
                            {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}

                            <Text style={styles.label}>Email</Text>
                            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholderTextColor="#ccc" />

                            <Text style={styles.label}>Nom d'utilisateur</Text>
                            <TextInput style={styles.input} value={nomUtilisateur} onChangeText={setNomUtilisateur} placeholderTextColor="#ccc" />

                            <TouchableOpacity onPress={handleSave} style={styles.buttonSave}>
                                <Text style={styles.buttonText}>Enregistrer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleDeleteAccount} style={styles.buttonDelete}>
                                <Text style={styles.buttonText}>Supprimer mon compte</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    </ScrollView>
                </ImageBackground>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        flexGrow: 1,
        justifyContent: 'center',
    },
    backButton: {
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#ffffff', 
    },
    input: {
        backgroundColor: '#00000091', 
        color: '#fff', 
        padding: 10,
        borderRadius: 10,
        marginBottom: 16,
        borderWidth:1,
        borderColor:Color.bleu
    },
    pickerContainer: {
        backgroundColor: '#00000091',
        borderRadius: 10,
        marginBottom: 16,
        borderWidth:1,
        borderColor:Color.bleu
    },
    picker: {
        color: '#fff', 
    },
    errorText: {
        color: 'red',
        marginBottom: 16,
    },
    buttonSave: {
        backgroundColor: Color.bleu,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonDelete: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ModifierProfil;
