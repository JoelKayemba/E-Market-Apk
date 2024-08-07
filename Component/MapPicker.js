// MapPicker.js
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, {Marker} from 'react-native-maps'
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import Color from '../Styles/Color';

const MapPicker = ({ navigation, route }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const initialRegion = {
        latitude: route.params.initialLatitude,
        longitude: route.params.initialLongitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const handleSelectLocation = (event) => {
        setSelectedLocation(event.nativeEvent.coordinate);
    };

    const handleConfirmLocation = () => {
        if (selectedLocation) {
            navigation.navigate('Adresse', { location: selectedLocation });
        } else {
            Alert.alert('Erreur', 'Veuillez sélectionner un emplacement sur la carte.');
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={initialRegion}
                onPress={handleSelectLocation}
            >
                {selectedLocation && (
                    <Marker
                        title="Emplacement sélectionné"
                        coordinate={selectedLocation}
                    />
                )}
            </MapView>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmLocation}>
                <Text style={styles.confirmButtonText}>Choisir cet emplacement</Text>
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
    confirmButton: {
        position: 'absolute',
        bottom: 20,
        left: '25%',
        right: '25%',
        backgroundColor: Color.bleuTransparent,
        paddingVertical: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default MapPicker;
