import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modalize } from 'react-native-modalize';
import Color from '../../Styles/Color';

const defaultProfileImage = require('../../assets/imageBack/f.jpg');

const PageProfil = () => {
    const [user, setUser] = useState({
        nom: '',
        email: '',
        photo: defaultProfileImage,
    });

    const modalizeRef = useRef(null);
    const navigation = useNavigation();

    const loadUserData = async () => {
        const nom = await AsyncStorage.getItem('nom');
        const email = await AsyncStorage.getItem('email');
        setUser({ ...user, nom, email });
    };

    // Recharger les données chaque fois que la page de profil est affichée
    useFocusEffect(
        React.useCallback(() => {
            loadUserData();
        }, [])
    );

    const handleLogout = () => {
        modalizeRef.current?.open();
    };

    const confirmLogout = () => {
        AsyncStorage.clear();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Deconnexion' }],
        });
        modalizeRef.current?.close();
    };

    return (
        <ImageBackground
            source={require('../../assets/imageBack/profile.jpg')}
            style={styles.backgroundImage}
        >
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
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ModifierMotDePasse')}>
                        <Text style={styles.buttonText}>Changer le Mot de Passe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Historique des Commandes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AjouterAnnonce')}>
                        <Text style={styles.buttonText}>Ajouter une annonce</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AjouterAnnonce')}>
                        <Text style={styles.buttonText}>Vos préférences</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PaymentScreen')}>
                        <Text style={styles.buttonText}>Payement</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PaymentScreen')}>
                        <Text style={styles.buttonText}>FeedBack</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Nous contactez</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleLogout} style={styles.buttonDeconnexion}>
                    <Text style={styles.deconnexionText}>Deconnexion</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modalize ref={modalizeRef} snapPoint={180}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Déconnexion</Text>
                    <Text style={styles.modalText}>Êtes-vous sûr de vouloir vous déconnecter ?</Text>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => modalizeRef.current?.close()}>
                            <Text style={styles.buttonText}>Annuler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmButton} onPress={confirmLogout}>
                            <Text style={styles.buttonText}>Déconnexion</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modalize>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
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
        borderColor: Color.bleu,
        borderWidth: 5,
    },
    name: {
        fontSize: 22,
        fontWeight: '600',
        color: '#ffffff', 
    },
    email: {
        fontSize: 16,
        color: '#cccccc', 
        marginBottom: 8,
    },
    section: {
        marginBottom: 20,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#00000091', 
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderColor: Color.bleu,
        borderWidth: 1,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        fontFamily:'InriaSerif',
    },
    buttonDeconnexion:{
        backgroundColor:'#FF0057C2',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    deconnexionText:{
        color:'white',
        fontFamily:'InriaSerif',
        fontSize:16
    },
    modalContent: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#ccc',
        padding: 15,
        borderRadius: 8,
        marginRight: 10,
        alignItems: 'center',
    },
    confirmButton: {
        flex: 1,
        backgroundColor: '#FF0057C2',
        padding: 15,
        borderRadius: 8,
        marginLeft: 10,
        alignItems: 'center',
    },
});

export default PageProfil;
