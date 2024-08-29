import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Color from '../../Styles/Color';

const BoutiqueImages = ({ nextStep, prevStep, handleChange, formData }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeField, setActiveField] = useState(null);

  const pickImage = async (fieldName) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      await handleChange(fieldName, result.assets[0].uri);  
    }
  };

  const replaceImage = async () => {
    if (!activeField) return;

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      await handleChange(activeField, result.assets[0].uri);
      setSelectedImage(null);
      setActiveField(null);
    }
  };

  const takePhoto = async (fieldName) => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access camera is required!');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      await handleChange(fieldName, result.assets[0].uri);  
      setSelectedImage(null); // Fermer le modal
    }
  };

  const deleteImage = (fieldName) => {
    handleChange(fieldName, null);
    setSelectedImage(null); // Fermer le modal
  };

  const openImage = (uri, fieldName) => {
    setSelectedImage(uri);
    setActiveField(fieldName);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Images de la Boutique</Text>
      <Text style={styles.subTitle}>Choisir les images liées à la boutique </Text>
      <View style={styles.imageGrid}>
        {[1, 2, 3, 4].map((index) => {
          const fieldName = `image${index}`;
          return (
            <TouchableOpacity
              key={index}
              style={styles.imageBox}
              onPress={() => formData[fieldName] ? openImage(formData[fieldName], fieldName) : pickImage(fieldName)}
            >
              {formData[fieldName] ? (
                <Image source={{ uri: formData[fieldName] }} style={styles.imageThumbnail} />
              ) : (
                <Ionicons name="image-outline" size={40} color="gray" />
              )}
            </TouchableOpacity>
          );
        })}
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
                <TouchableOpacity onPress={() => deleteImage(activeField)} style={styles.actionButton}>
                  <Ionicons name="trash-bin" size={24} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={replaceImage} style={styles.actionButton}>
                  <Ionicons name="image-outline" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => takePhoto(activeField)} style={styles.actionButton}>
                  <Ionicons name="camera-outline" size={24} color="green" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => setSelectedImage(null)} style={styles.fermer}>
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
    marginTop:50
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Color.bleu,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  subTitle:{
    fontSize:24,
    fontWeight:'1s00',
    textAlign:'center',
    marginBottom:10,
    color: Color.bleu,
  },
  
  imageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageBox: {
    width: 80,
    height: 80,
    backgroundColor: '#dbdbdb',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageThumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
  fermer:{
    backgroundColor:Color.bleu,
    width:100,
    height:30,
    borderRadius:10,
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center'
  },
  textClose:{
    color:'white'
  }
});

export default BoutiqueImages;
