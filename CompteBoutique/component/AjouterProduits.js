import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, KeyboardAvoidingView, Platform ,ActivityIndicator} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons , AntDesign} from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'; 
import Color from '../../Styles/Color';
import API_BASE_URL from '../../ApiConfig';
import { addProduct } from '../../Redux/actions/productActions';


const AjouterProduits = ({ route , navigation }) => {
    const { boutique } = route.params;

    const [nomProduit, setNomProduit] = useState('');
    const [description, setDescription] = useState('');
    const [prix, setPrix] = useState('');
    const [categorie, setCategorie] = useState('');
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [newColor, setNewColor] = useState('');
    const [newSize, setNewSize] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);

    const dispatch = useDispatch(); // Utilisation de `useDispatch` pour déclencher des actions
    const { loading, error } = useSelector(state => state.products); // Récupérer l'état du produit

    
    
   
    

    const defaultCategories = ['Electronique', 'Habit', 'Livre', 'Fourniture', 'Beauty', 'Jouet', 'Chaussure'];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/categorie/categories`);
                const data = await response.json();
                setCategories(data.categories && data.categories.length > 0 ? data.categories : defaultCategories);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories:', error);
                setCategories(defaultCategories);
            }
        };
        fetchCategories();
    }, []);

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
            setImages([...images, ...newImages]);
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
            const formData = new FormData();
            formData.append('nom', nomProduit);
            formData.append('description', description);
            formData.append('prix', prix);
            formData.append('idBoutique', boutique.idBoutique);
    
            // Envoyer la liste des catégories (y compris les nouvelles) sous forme de tableau
            const categoriesArray = [categorie]; // Ajouter la catégorie sélectionnée
            formData.append('categories', JSON.stringify(categoriesArray));  // Envoyer les catégories comme tableau JSON
    
            // Ajouter les images
            images.forEach((image, index) => {
                formData.append('images', {
                    uri: image,
                    type: 'image/jpeg',
                    name: `image${index + 1}.jpg`,
                });
            });
    
            // Ajouter les couleurs et tailles si nécessaire
            colors.forEach((color, index) => {
                formData.append('colors[]', color);
            });
            sizes.forEach((size, index) => {
                formData.append('sizes[]', size);
            });
    
            // Appel de l'action Redux pour ajouter un produit
            dispatch(addProduct(formData, navigation));
        } else {
            alert('Veuillez remplir tous les champs obligatoires.');
        }
    };
    
    

    const addCategory = () => {
        if (newCategory.trim()) {
            setCategories([...categories, newCategory.trim()]);
            setCategorie(newCategory.trim());
            setNewCategory('');
            setModalVisible(false);
        }
    };

   

    const deleteImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
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
                <TouchableOpacity style={styles.pickerButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.pickerButtonText}>
                        {categorie ? categorie : 'Sélectionnez une catégorie'}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="gray" />
                </TouchableOpacity>

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
                        <Text key={index} style={styles.tag1}>{color}</Text>
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
                        <Text key={index} style={styles.tag2}>{size}</Text>
                    ))}
                </View>

                <Text style={styles.label}>Images du Produit</Text>
                <View style={styles.imageGrid}>
                    {images.map((item, index) => (
                        <TouchableOpacity key={index}  style={styles.imageBox}>
                            <TouchableOpacity onPress={() => deleteImage(index)} style={styles.deleteIcon}>
                                <AntDesign name="closecircle" size={20} color="red" />
                            </TouchableOpacity>
                            <Image source={{ uri: item }} style={styles.imageThumbnail} />
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity onPress={pickMultipleImages} style={styles.addImageBox}>
                        <Ionicons name="add" size={40} color="gray" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) :(
                    <Text style={styles.addButtonText}>Ajouter le Produit</Text>)}
                </TouchableOpacity>
                 {/* Affichage des erreurs */}
                
                 {error && <Text style={{ color: 'red' }}>{error}</Text>}
            </ScrollView>

            {/* Modal pour la sélection de catégorie */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalOverlay}
                >
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Sélectionnez une catégorie</Text>
                        <ScrollView contentContainerStyle={styles.modalContent} showsVerticalScrollIndicator={false}>
                            {categories.map((category, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.modalItem}
                                    onPress={() => {
                                        setCategorie(category);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={styles.modalItemText}>{category}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* Ajout d'une nouvelle catégorie */}
                        <View style={styles.addCategoryContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Ajouter une catégorie"
                                value={newCategory}
                                onChangeText={setNewCategory}
                            />
                            <TouchableOpacity style={styles.addButtonSmall} onPress={addCategory}>
                                <Ionicons name="add-circle" size={30} color={Color.bleu} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        paddingBottom: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Color.bleu,
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 50,
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
    pickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    pickerButtonText: {
        color: 'gray',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButtonSmall: {
        marginLeft: 10,
        marginBottom: 10,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    tag1: {
        backgroundColor: Color.orange,
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginRight: 10,
    },
    tag2: {
        backgroundColor: Color.bleuTransparent,
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginRight: 10,
    },
    imagePicker: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        height: 200,
        marginBottom: 15,
        borderRadius: 5,
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
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
        marginRight: 10,
        marginBottom: 10,
        
    },
    deleteIcon: {
        position: 'absolute',
        top: 2,
        right: 2,
        zIndex: 1,
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        width: '80%',
        height: '80%',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    modalItemText: {
        fontSize: 16,
        color: '#333',
    },
    addCategoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
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

export default AjouterProduits;
