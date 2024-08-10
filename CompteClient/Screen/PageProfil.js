import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultProfileImage = require('../../assets/Images/imagesProduits/accessoire1.jpg');

const PageProfil = () => {
    const [user, setUser] = useState({
        nom: '',
        email: '',
        photo: defaultProfileImage,
    });

    const navigation = useNavigation();

    useEffect(() => {
        const loadUserData = async () => {
            const nom = await AsyncStorage.getItem('nom');
            const email = await AsyncStorage.getItem('email');
            setUser({ ...user, nom, email });
        };

        loadUserData();
    }, []);

    const handleLogout = () => {
        Alert.alert(
            'Déconnexion',
            'Êtes-vous sûr de vouloir vous déconnecter ?',
            [
                { text: 'Annuler', style: 'cancel' },
                { text: 'Déconnexion', onPress: () => {
                    AsyncStorage.clear();
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Deconnexion' }],
                    });
                }},
            ]
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileHeader}>
                <Image source={user.photo} style={styles.profileImage} />
                <Text style={styles.name}>{user.nom}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>
            <View style={styles.section}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ModifierProfil')}>
                    <Text style={styles.buttonText}>Modifier le Profil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Changer le Mot de Passe</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Historique des Commandes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Ajouter une annonce</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('PaymentScreen')}>
                    <Text style={styles.buttonText}>Payement</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Nous contactez</Text>
                </TouchableOpacity>
            </View>
            <Button title="Déconnexion" onPress={handleLogout} color="red" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 30,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 8,
        borderColor: '#d9d9d9',
        borderWidth: 2,
    },
    name: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    section: {
        marginBottom: 20,
        justifyContent:'center'
    },
    button: {
        backgroundColor: '#f8f8f8',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderColor: '#ddd',
        borderWidth: 0,
    },
    buttonText: {
        color: '#333',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default PageProfil;
