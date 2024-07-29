import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity ,Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Color from '../../Styles/Color';
import ClientStyle from '../../Styles/ClientStyle';

const Recherche = () => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('RechercheScreen');
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.rechercheContainer}>
            <Ionicons name="search" size={20} color={Color.grisIcone} />
            <Text style={styles.input}>Recherche</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    rechercheContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: Color.grisIcone,
        height: 40,
        borderWidth:1,
        borderColor:Color.bleu
    },
    input: {
        color:'gray',
        marginLeft: 10,
    },
});

export default Recherche;
