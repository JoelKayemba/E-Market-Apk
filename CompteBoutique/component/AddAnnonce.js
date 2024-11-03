import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const AddAnnonce = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Mock data for published announcements
  const publishedAnnonces = [
    { id: '1', title: 'Annonce 1', views: 120, likes: 30, image: null },
    { id: '2', title: 'Annonce 2', views: 300, likes: 75, image: null },
    { id: '3', title: 'Annonce 3', views: 50, likes: 10, image: null },
  ];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedVideo(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    // Logic to handle form submission
    console.log('Submitting:', { title, description, link, selectedImage, selectedVideo });
  };

  const renderAnnonceItem = ({ item }) => (
    <View style={styles.annonceItem} key={item.id}>
      <Text style={styles.annonceTitle}>{item.title}</Text>
      <Text style={styles.annonceDetails}>Vues: {item.views} | Likes: {item.likes}</Text>
      <View style={styles.annonceImageContainer}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.annonceImage} />
        ) : (
          <Ionicons name="image-outline" size={50} color="#ddd" />
        )}
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Créer une Annonce</Text>

        <TextInput
          style={styles.input}
          placeholder="Titre de l'annonce"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description de l'annonce"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <TextInput
          style={styles.input}
          placeholder="Lien (facultatif)"
          value={link}
          onChangeText={setLink}
        />

        <View style={styles.mediaSection}>
          <Text style={styles.subHeading}>Ajouter une image ou une vidéo</Text>

          <View style={styles.mediaButtons}>
            <TouchableOpacity style={styles.mediaButton} onPress={pickImage}>
              <Ionicons name="image" size={24} color="#fff" />
              <Text style={styles.mediaButtonText}>Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaButton} onPress={pickVideo}>
              <Ionicons name="videocam" size={24} color="#fff" />
              <Text style={styles.mediaButtonText}>Vidéo</Text>
            </TouchableOpacity>
          </View>

          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.previewImage} />
          )}

          {selectedVideo && (
            <Video
              source={{ uri: selectedVideo }}
              style={styles.previewVideo}
              useNativeControls
              resizeMode="contain"
            />
          )}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Publier l'Annonce</Text>
        </TouchableOpacity>

        {/* Section for viewing published announcements */}
        <Text style={styles.heading}>Annonces Publiées</Text>
        {publishedAnnonces.map((item) => renderAnnonceItem({ item }))}
      </View>
    </ScrollView>
  );
};

export default AddAnnonce;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 50,
    marginTop:20
  },
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
  },
  mediaSection: {
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  mediaButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  mediaButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  mediaButtonText: {
    color: '#fff',
    marginLeft: 5,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  previewVideo: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  annonceItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  annonceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  annonceDetails: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  annonceImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  annonceImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
