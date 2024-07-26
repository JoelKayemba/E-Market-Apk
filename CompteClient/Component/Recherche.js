import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Color from '../../Styles/Color';
import ClientStyle from '../../Styles/ClientStyle';

const Recherche = () => {
    return (
        <View style={styles.rechercheContainer}>
            <Ionicons name="search" size={20} color={Color.grisIcone} />
            <TextInput
                style={ClientStyle.input}
                placeholder="Recherche"
                placeholderTextColor={Color.grisIcone}
            />
        </View>
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
        height:40
    },
   
});

export default Recherche;
