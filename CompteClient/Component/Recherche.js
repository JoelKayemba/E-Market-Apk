import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
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
            <TextInput
                style={styles.input}
                placeholder="Recherche"
                placeholderTextColor={Color.grisIcone}
                editable={false} // Rendre le TextInput non éditable pour imiter WhatsApp
            />
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
    },
    input: {
        flex: 1,
        marginLeft: 10,
    },
});

export default Recherche;
