import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Color from '../../Styles/Color';
import { Picker } from '@react-native-picker/picker';

const AjouterProduits = ({ navigation }) => {
    const [nomProduit, setNomProduit] = useState('');
    const [description, setDescription] = useState('');
    const [prix, setPrix] = useState('');
    const [categorie, setCategorie] = useState('');
    const [images, setImages] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [newColor, setNewColor] = useState('');
    const [newSize, setNewSize] = useState('');

    const categoriesList = ['Electronique', 'habit', 'livre', 'Fourniture', 'Beauty', 'Jouer']; // Example categories

    const pickImages = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                allowsEditing: false,
                quality: 1,
            });
    
            if (!result.cancelled) {
                setImages([...images, ...result.selected]);
            }
        } catch (error) {
            console.error("Error picking images: ", error);
        }
    };
    
    

    const addColor = () => {
        if (newColor) {
            setColors([...colors, newColor]);
            setNewColor('');
        }
    };

    const addSize = () => {
        if (newSize) {
            setSizes([...sizes, newSize]);
            setNewSize('');
        }
    };

    const handleAddProduct = () => {
        if (nomProduit && description && prix && categorie) {
            console.log('Product added:', { nomProduit, description, prix, categorie, images, colors, sizes });
            // Add logic to handle the product data, such as sending it to a backend
        } else {
            alert('Veuillez remplir tous les champs obligatoires.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Ajouter un Produit</Text>
            
            <Text style={styles.label}>Nom du Produit</Text>
            <TextInput
                style={styles.input}
                placeholder="Entrez le nom du produit"
                value={nomProduit}
                onChangeText={setNomProduit}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Entrez la description du produit"
                value={description}
                onChangeText={setDescription}
                multiline={true}
                numberOfLines={4}
            />

            <Text style={styles.label}>Prix</Text>
            <TextInput
                style={styles.input}
                placeholder="Entrez le prix"
                value={prix}
                onChangeText={setPrix}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Catégorie</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={categorie}
                    onValueChange={(itemValue) => setCategorie(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Sélectionnez une catégorie" value="" />
                    {categoriesList.map((category, index) => (
                        <Picker.Item key={index} label={category} value={category} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>Couleurs Disponibles</Text>
            <View style={styles.row}>
                <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Entrez une couleur"
                    value={newColor}
                    onChangeText={setNewColor}
                />
                <TouchableOpacity style={styles.addButtonSmall} onPress={addColor}>
                    <Ionicons name="add-circle" size={30} color={Color.bleu} />
                </TouchableOpacity>
            </View>
            <View style={styles.tagContainer}>
                {colors.map((color, index) => (
                    <Text key={index} style={styles.tag}>{color}</Text>
                ))}
            </View>

            <Text style={styles.label}>Tailles Disponibles</Text>
            <View style={styles.row}>
                <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Entrez une taille"
                    value={newSize}
                    onChangeText={setNewSize}
                />
                <TouchableOpacity style={styles.addButtonSmall} onPress={addSize}>
                    <Ionicons name="add-circle" size={30} color={Color.bleu} />
                </TouchableOpacity>
            </View>
            <View style={styles.tagContainer}>
                {sizes.map((size, index) => (
                    <Text key={index} style={styles.tag}>{size}</Text>
                ))}
            </View>

            <Text style={styles.label}>Images du Produit</Text>
            <TouchableOpacity style={styles.imagePicker} onPress={pickImages}>
                <Ionicons name="camera" size={50} color="gray" />
                <Text style={styles.imagePickerText}>Ajouter des images</Text>
            </TouchableOpacity>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.imagePreviewContainer}>
                    {images.map((imageUri, index) => (
                        <Image key={index} source={{ uri: imageUri }} style={styles.imagePreview} />
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
                <Text style={styles.addButtonText}>Ajouter le Produit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Color.bleu,
        marginBottom: 20,
        textAlign: 'center',
        marginTop:50
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: 'gray',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    textArea: {
        height: 80,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
        overflow: 'hidden',
    },
    picker: {
        height: 100,
        width: '100%',
        justifyContent:'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButtonSmall: {
        marginLeft: 10,
        marginBottom:10
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    tag: {
        backgroundColor: Color.bleu,
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginRight: 10,
        marginTop: 10,
        borderRadius:10
    },
    imagePicker: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        height: 200,
        marginBottom: 0,
        borderRadius: 5,
    },
    imagePickerText: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
    },
    imagePreviewContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    imagePreview: {
        width: 80,
        height: 80,
        borderRadius: 5,
        marginRight: 10,
    },
    addButton: {
        backgroundColor: Color.bleu,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default AjouterProduits;
