// Loading.js
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Color from '../Styles/Color';

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Color.orange} />
            <Text style={styles.text}>Chargement en cours...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        marginTop: 10,
        fontSize: 16,
        color: 'black',
    },
});

export default Loading;
