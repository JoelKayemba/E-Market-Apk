import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

const MapScreen = () => {
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const navigation = useNavigation();

    useEffect(() => {
        const getCurrentLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission refusée');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        };
        getCurrentLocation();
    }, []);

    const handleSaveLocation = () => {
        tempLocation = region; // Sauvegarder la localisation dans la variable globale
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={setRegion}
            >
                <Marker coordinate={region} />
            </MapView>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveLocation}>
                <Text style={styles.saveButtonText}>Enregistrer la localisation</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    saveButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        paddingVertical: 15,
        backgroundColor: 'blue',
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default MapScreen;
