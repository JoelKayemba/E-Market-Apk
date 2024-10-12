import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Color from '../../Styles/Color';

const BoutiqueImages = ({ nextStep, prevStep, handleChange, formData }) => {
  const images = Array.isArray(formData.images) ? formData.images : [];
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    console.log('Images dans BoutiqueImages:', images); // Vérifiez les images à chaque changement
  }, [images]);

  const pickMultipleImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = result.assets.map(asset => asset.uri);
      handleChange([...images, ...newImages]);
    }
  };

  const deleteImage = () => {
    if (activeIndex === null) return;
    const updatedImages = images.filter((_, index) => index !== activeIndex);
    handleChange(updatedImages);
    setSelectedImage(null);
    setActiveIndex(null);
  };

  const openImage = (uri, index) => {
    setSelectedImage(uri);
    setActiveIndex(index);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Images de la Boutique</Text>
      <Text style={styles.subTitle}>Ajouter plusieurs images en une seule fois</Text>

      <View style={styles.imageGrid}>
        {images.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => openImage(item, index)} style={styles.imageBox}>
            <Image source={{ uri: item }} style={styles.imageThumbnail} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={pickMultipleImages} style={styles.addImageBox}>
          <Ionicons name="add" size={40} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.navButtons}>
        <TouchableOpacity onPress={prevStep} style={styles.navButton1}>
          <Text style={styles.navButtonText}>Précédent</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={nextStep} style={styles.navButton}>
          <Text style={styles.navButtonText}>Suivant</Text>
        </TouchableOpacity>
      </View>

      {selectedImage && (
        <Modal visible={true} transparent={true} onRequestClose={() => setSelectedImage(null)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedImage }} style={styles.fullImage} />
              <View style={styles.modalActions}>
                <TouchableOpacity onPress={deleteImage} style={styles.actionButton}>
                  <Ionicons name="trash-bin" size={24} color="red" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => setSelectedImage(null)} style={styles.closeButton}>
                <Text style={styles.textClose}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Color.bleu,
    textAlign: 'center',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: Color.bleu,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  imageBox: {
    width: 80,
    height: 80,
    backgroundColor: '#dbdbdb',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 10,
    marginBottom: 10,
  },
  imageThumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  addImageBox: {
    width: 80,
    height: 80,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton1: {
    backgroundColor: Color.bleu,
    padding: 10,
    borderRadius: 10,
    width: '48%',
  },
  navButton: {
    backgroundColor: Color.orange,
    padding: 10,
    borderRadius: 10,
    width: '48%',
  },
  navButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  actionButton: {
    padding: 10,
  },
  closeButton: {
    backgroundColor: Color.bleu,
    width: 100,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textClose: {
    color: 'white',
  },
});

export default BoutiqueImages;
