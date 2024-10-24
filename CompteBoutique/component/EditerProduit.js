import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, Image, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../Redux/actions/productActions';
import Color from '../../Styles/Color';
import API_BASE_URL from '../../ApiConfig';

const EditerProduit = ({ visible, onClose, product, boutique }) => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [categories, setCategories] = useState([]); 
  const [selectedCategories, setSelectedCategories] = useState([]); 
  const [images, setImages] = useState([]); 
  const [newImages, setNewImages] = useState([]); 
  const [colors, setColors] = useState([]); // Gérer les couleurs
  const [newColor, setNewColor] = useState(''); // Pour ajouter de nouvelles couleurs
  const [sizes, setSizes] = useState([]); // Gérer les tailles
  const [newSize, setNewSize] = useState(''); // Pour ajouter de nouvelles tailles
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const defaultCategories = ['Chaussure', 'Vêtements', 'Accessoires', 'Électronique'];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/categorie/categories`);
        const data = await response.json();
        setCategories(data.categories && data.categories.length > 0 ? data.categories : defaultCategories);
      } catch (error) {
        setCategories(defaultCategories);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (product) {
      setNom(product.nom || '');
      setDescription(product.description || '');
      setPrix(product.prix || '');
      setSelectedCategories(product.categories?.[0] ? [product.categories[0]] : []);
      setColors(product.couleurs || []);
      setSizes(product.tailles || []);
      const correctedImages = (product.images || []).map((image) => image ? image.replace(/\\/g, '/') : null);
      setImages(correctedImages || []);
    }
  }, [product]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setNewImages(result.assets.map((asset) => asset.uri));
    }
  };

  const deleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const toggleCategorySelection = (category) => {
    setSelectedCategories([category]);
  };

  const addColor = () => {
    if (newColor && !colors.includes(newColor)) {
      setColors([...colors, newColor]);
      setNewColor('');
    }
  };

  const deleteColor = (index) => {
    const updatedColors = colors.filter((_, i) => i !== index);
    setColors(updatedColors);
  };

  const addSize = () => {
    if (newSize && !sizes.includes(newSize)) {
      setSizes([...sizes, newSize]);
      setNewSize('');
    }
  };

  const deleteSize = (index) => {
    const updatedSizes = sizes.filter((_, i) => i !== index);
    setSizes(updatedSizes);
  };

  const handleEditProduct = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('prix', prix);
    formData.append('idBoutique', boutique.idBoutique);
    formData.append('categories', JSON.stringify(selectedCategories)); 
    formData.append('colors', JSON.stringify(colors));
    formData.append('sizes', JSON.stringify(sizes));

    newImages.forEach((image, index) => {
      formData.append('images', {
        uri: image,
        type: 'image/jpeg',
        name: `image${index + 1}.jpg`,
      });
    });

    dispatch(updateProduct(product.idProduit, formData)).then(() => {
      setLoading(false);
      onClose(); 
    });
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <KeyboardAvoidingView behavior="padding" style={styles.modalOverlay}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Modifier le produit</Text>

            <TextInput
              style={styles.input}
              value={nom}
              onChangeText={setNom}
              placeholder="Nom du produit"
            />
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Description"
            />
            <TextInput
              style={styles.input}
              value={prix}
              onChangeText={setPrix}
              placeholder="Prix"
              keyboardType="numeric"
            />

            {/* Catégories */}
            <Text style={styles.label}>Catégories</Text>
            <View style={styles.categoriesContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[styles.categoryItem, selectedCategories.includes(category) && styles.selectedCategory]}
                  onPress={() => toggleCategorySelection(category)}
                >
                  <Text style={styles.categoryText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Couleurs */}
            <Text style={styles.label}>Couleurs</Text>
            <View style={styles.listContainer}>
              {colors.map((color, index) => (
                <View key={index} style={styles.listItem}>
                  <Text>{color}</Text>
                  <TouchableOpacity onPress={() => deleteColor(index)}>
                    <Text style={styles.deleteText}>Supprimer</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <TextInput
              style={styles.input}
              value={newColor}
              onChangeText={setNewColor}
              placeholder="Ajouter une couleur"
            />
            <TouchableOpacity style={styles.addButton} onPress={addColor}>
              <Text style={styles.addButtonText}>Ajouter couleur</Text>
            </TouchableOpacity>

            {/* Tailles */}
            <Text style={styles.label}>Tailles</Text>
            <View style={styles.listContainer}>
              {sizes.map((size, index) => (
                <View key={index} style={styles.listItem}>
                  <Text>{size}</Text>
                  <TouchableOpacity onPress={() => deleteSize(index)}>
                    <Text style={styles.deleteText}>Supprimer</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <TextInput
              style={styles.input}
              value={newSize}
              onChangeText={setNewSize}
              placeholder="Ajouter une taille"
            />
            <TouchableOpacity style={styles.addButton} onPress={addSize}>
              <Text style={styles.addButtonText}>Ajouter taille</Text>
            </TouchableOpacity>

            {/* Images */}
            <Text style={styles.label}>Images actuelles</Text>
            <View style={styles.imageGrid}>
              {images.map((image, index) => (
                <View key={index} style={styles.imageBox}>
                  <Image source={{ uri: `${API_BASE_URL}/${image}` }} style={styles.imageThumbnail} />
                  <TouchableOpacity onPress={() => deleteImage(index)} style={styles.deleteIcon}>
                    <Text style={{ color: 'red' }}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <TouchableOpacity onPress={pickImage} style={styles.addButton}>
              <Text style={styles.addButtonText}>Ajouter des images</Text>
            </TouchableOpacity>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleEditProduct}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>Sauvegarder</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditerProduit;


const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: 350,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  categoryItem: {
    padding: 8,
    margin: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  selectedCategory: {
    backgroundColor: Color.orange,
  },
  categoryText: {
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  listContainer: {
    marginBottom: 15,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  deleteText: {
    color: 'red',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  imageBox: {
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
  },
  imageThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  deleteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 2,
  },
  addButton: {
    backgroundColor: Color.bleu,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: Color.bleu,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
