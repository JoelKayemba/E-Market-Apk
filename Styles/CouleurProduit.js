import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Color from './Color';

const CouleurProduit = ({ couleurs, selectedColor, onSelectColor }) => {
    // Déterminer la couleur de fond de la vue
    const backgroundColor = selectedColor || Color.grisFonce;

    return (
        <View style={[styles.container]}>
            <Text style={styles.textDescription}>Couleur</Text>
            <View style={styles.colorContainer}>
                {couleurs.map((couleur, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.colorBox,
                            selectedColor === couleur && styles.selectedColorBox,
                            { backgroundColor: couleur }
                        ]}
                        onPress={() => onSelectColor(couleur)}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        marginLeft:-10
    },
    textDescription: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
    },
    colorContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    colorBox: {
        width: 30,
        height: 30,
        borderRadius: 15,
        margin: 5,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedColorBox: {
        borderColor: Color.orange,
    },
});

export default CouleurProduit;
