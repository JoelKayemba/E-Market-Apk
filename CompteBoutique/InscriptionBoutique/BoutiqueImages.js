import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Color from '../../Styles/Color';

const BoutiqueImages = ({ nextStep, prevStep, handleChange, formData }) => {
  const pickImage = async (fieldName) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      handleChange(fieldName, result.uri);
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
    if (!result.cancelled) {
      handleChange(fieldName, result.uri);
    }
  };

  const deleteImage = (fieldName) => {
    handleChange(fieldName, null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Images de la Boutique</Text>
      {[1, 2, 3, 4].map((index) => {
        const fieldName = `image${index}`;
        return (
          <View key={index} style={styles.imageContainer}>
            <Text style={styles.imageTitle}>{`Image ${index}`}</Text>
            {formData[fieldName] ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: formData[fieldName] }} style={styles.previewImage} />
                <View style={styles.imageActions}>
                  <TouchableOpacity onPress={() => deleteImage(fieldName)} style={styles.actionButton}>
                    <Ionicons name="trash-bin" size={24} color="red" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => pickImage(fieldName)} style={styles.actionButton}>
                    <Ionicons name="image-outline" size={24} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => takePhoto(fieldName)} style={styles.actionButton}>
                    <Ionicons name="camera-outline" size={24} color="green" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={() => pickImage(fieldName)}>
                  <Ionicons name="images-outline" size={24} color="white" />
                  <Text style={styles.buttonText}>Sélectionner</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => takePhoto(fieldName)}>
                  <Ionicons name="camera-outline" size={24} color="white" />
                  <Text style={styles.buttonText}>Prendre Photo</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      })}
      <View style={styles.navButtons}>
        <TouchableOpacity onPress={prevStep} style={styles.navButton1}>
          <Text style={styles.navButtonText}>Précédent</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={nextStep} style={styles.navButton}>
          <Text style={styles.navButtonText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Color.bleu,
    textAlign: 'center',
    marginBottom: 20,
    marginTop:20
  },
  imageContainer: {
    marginBottom: 20,
  },
  imageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.bleu,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    marginLeft: 10,
    color: 'white',
  },
  previewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  imagePreviewContainer: {
    alignItems: 'center',
  },
  imageActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    padding: 10,
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
});

export default BoutiqueImages;
