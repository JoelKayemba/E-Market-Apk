import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Exemple d'image de profil
const defaultProfileImage = require('../../assets/Images/imagesProduits/accessoire1.jpg');

const PageProfil = () => {
    const [user, setUser] = useState({
        nom: 'John Doe',
        email: 'john.doe@example.com',
        photo: defaultProfileImage,
    });

    const navigation = useNavigation();

    const handleLogout = () => {
        Alert.alert(
            'Déconnexion',
            'Êtes-vous sûr de vouloir vous déconnecter ?',
            [
                { text: 'Annuler', style: 'cancel' },
                { text: 'Déconnexion', onPress: () => navigation.reset({
                          index: 0,
                          routes: [{ name: 'Deconnexion' }],
                }) },
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
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Modifier le Profil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Changer le Mot de Passe</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Historique des Commandes</Text>
                </TouchableOpacity>
            </View>
            <Button title="Déconnexion" onPress={handleLogout} color="red" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
        marginTop:40
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 24,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 8,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 16,
        color: 'gray',
    },
    section: {
        marginBottom: 24,
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default PageProfil;
