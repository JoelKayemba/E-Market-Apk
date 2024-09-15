// champ input qui nous dirige vers la page de recherche

import React from 'react';
import {StyleSheet, TouchableOpacity ,Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Color from '../../Styles/Color';


const Recherche = () => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('RechercheScreen');
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.rechercheContainer}>
            <Ionicons name="search" size={20} color='white' />
            <Text style={styles.input}>Recherche...</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    rechercheContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0000006E',
        borderRadius: 10,
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: 'white',
        height: 40,
        borderWidth:1,
        marginHorizontal:10
    },
    input: {
        color:'gray',
        marginLeft: 10,
    },
});

export default Recherche;
