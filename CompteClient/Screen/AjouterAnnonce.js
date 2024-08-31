import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Image, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import Color from '../../Styles/Color';
import API_BASE_URL from '../../ApiConfig';

const AjouterAnnonce = ({ navigation }) => {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [lien, setLien] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const pickVideo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setVideo(result.assets[0].uri);
        }
    };

    const handleAjouterAnnonce = async () => {
        setLoading(true);
        const idclient = await AsyncStorage.getItem('idclient');
        if (!idclient) {
            Alert.alert('Erreur', 'Impossible de récupérer l\'ID client');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('idclient', idclient);
        formData.append('titre', titre);
        formData.append('description', description);
        formData.append('lien', lien);
        if (image) {
            formData.append('image', {
                uri: image,
                type: 'image/jpeg',
                name: 'image.jpg',
            });
        }
        if (video) {
            formData.append('video', {
                uri: video,
                type: 'video/mp4',
                name: 'video.mp4',
            });
        }

        try {
            const response = await fetch(`${API_BASE_URL}/annonce/ajouter`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setLoading(false);

            if (!response.ok) {
                const result = await response.json();
                Alert.alert('Erreur', result.message || 'Erreur lors de l\'ajout de l\'annonce');
                return;
            }

            Alert.alert('Succès', 'Annonce ajoutée avec succès');
            navigation.navigate('Annonce', { refresh: true });
        } catch (error) {
            setLoading(false);
            Alert.alert('Erreur', 'Erreur lors de l\'ajout de l\'annonce');
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/imageBack/e.jpg') } // Remplacez par le lien de votre image
            style={styles.backgroundImage}
        >
            <View style={styles.overlay} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.label}>Titre</Text>
                    <TextInput style={styles.input} value={titre} onChangeText={setTitre} placeholderTextColor="#ddd" />

                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholderTextColor="#ddd" />

                    <Text style={styles.label}>Lien (optionnel)</Text>
                    <TextInput style={styles.input} value={lien} onChangeText={setLien} placeholderTextColor="#ddd" />

                    <View style={styles.mediaContainer}>
                        <TouchableOpacity style={styles.mediaButton} onPress={pickImage}>
                            <FontAwesome name="photo" size={24} color="#fff" />
                            <Text style={styles.mediaButtonText}>Choisir une image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.mediaButton} onPress={pickVideo}>
                            <FontAwesome name="video-camera" size={24} color="#fff" />
                            <Text style={styles.mediaButtonText}>Choisir une vidéo</Text>
                        </TouchableOpacity>
                    </View>

                    {image && (
                        <View style={styles.previewContainer}>
                            <Text style={styles.previewLabel}>Aperçu de l'image :</Text>
                            <Image source={{ uri: image }} style={styles.previewImage} />
                        </View>
                    )}

                    {video && (
                        <View style={styles.previewContainer}>
                            <Text style={styles.previewLabel}>Aperçu de la vidéo :</Text>
                            <Text style={styles.previewText}>Vidéo sélectionnée</Text>
                        </View>
                    )}

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleAjouterAnnonce}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.submitButtonText}>Ajouter Annonce</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Couche noire semi-transparente
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        color: '#FCFCFCE6', 
    },
    input: {
        backgroundColor: '#00000091',
        borderWidth: 1,
        borderColor: Color.bleu,
        borderRadius: 10,
        padding: 8,
        marginBottom: 16,
        height: 50,
        color: 'white',
    },
    mediaContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 16,
        marginRight: 10,
        alignItems: 'center',
    },
    mediaButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.bleuTransparent,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    mediaButtonText: {
        color: '#fff',
        marginLeft: 8,
        fontSize: 16,
    },
    previewContainer: {
        marginBottom: 16,
    },
    previewLabel: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
        color: '#fff',
    },
    previewImage: {
        width: '100%',
        height: 200,
        borderRadius: 5,
    },
    previewText: {
        fontSize: 16,
        color: '#ddd', 
    },
    submitButton: {
        backgroundColor: '#FF0000A6',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AjouterAnnonce;
