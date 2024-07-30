import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Color from '../../Styles/Color';

const PagePanier = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                setCartItems([
                    { 
                        id: '1', 
                        nom: 'tacos', 
                        prix: '10.00', 
                        image: require('../../assets/Images/imagesProduits/food9.jpg'), 
                        livraison: true, 
                        description: 'Délicieux tacos au poulet, garnis de légumes frais et de sauce maison.' 
                    },
                    { 
                        id: '2', 
                        nom: 'Mac Book', 
                        prix: '1200.00', 
                        image: require('../../assets/Images/imagesProduits/accessoire1.jpg'), 
                        livraison: true, 
                        description: 'Ordinateur portable Mac Book, idéal pour le travail et le divertissement.' 
                    },
                    { 
                        id: '3', 
                        nom: 'manette', 
                        prix: '30.00', 
                        image: require('../../assets/Images/manette.jpg'), 
                        livraison: false, 
                        description: 'Manette de jeu sans fil, compatible avec plusieurs consoles et PC.' 
                    },
                    { 
                        id: '4', 
                        nom: 'sac', 
                        prix: '40.00', 
                        image: require('../../assets/Images/sac.jpg'), 
                        livraison: true, 
                        couleur: ['Noir', 'Marron'], 
                        taille: ['Petit', 'Moyen', 'Grand'], 
                        description: 'Sac en cuir élégant, disponible en plusieurs tailles et couleurs.' 
                    },
                    { 
                        id: '5', 
                        nom: 'montre Rolex', 
                        prix: '40.00', 
                        image: require('../../assets/Images/montre.jpg'), 
                        livraison: true, 
                        couleur: ['Or', 'Argent'], 
                        description: 'Montre Rolex de luxe, disponible en or et argent.' 
                    },
                    { 
                        id: '6', 
                        nom: 'chaussure Nike', 
                        prix: '10.00', 
                        image: require('../../assets/Images/produit1.jpg'), 
                        livraison: false, 
                        couleur: ['black', 'white'], 
                        taille: ['38', '39', '40', '41', '42'], 
                        description: 'Chaussures de sport Nike, disponibles en plusieurs tailles et couleurs.' 
                    },
                    { 
                        id: '7', 
                        nom: 'chaussure addidas', 
                        prix: '20.00', 
                        image: require('../../assets/Images/produit2.jpg'), 
                        livraison: true, 
                        couleur: ['black', 'white'], 
                        taille: ['38', '39', '40', '41', '42'], 
                        description: 'Chaussures de sport Adidas, disponibles en plusieurs tailles et couleurs.' 
                    },
                    { 
                        id: '8', 
                        nom: 'poulet', 
                        prix: '25.39', 
                        image: require('../../assets/Images/imagesProduits/food6.jpg'), 
                        livraison: true, 
                        description: 'Poulet rôti, assaisonné avec des épices spéciales.' 
                    },
                    { 
                        id: '9', 
                        nom: 'microonde', 
                        prix: '40.00', 
                        image: require('../../assets/Images/imagesProduits/electronic2.jpg'), 
                        livraison: true, 
                        description: 'Micro-ondes compact et puissant, idéal pour chauffer et cuisiner rapidement.' 
                    },
                    { 
                        id: '10', 
                        nom: 'Iphone xr', 
                        prix: '400.00', 
                        image: require('../../assets/Images/imagesProduits/accessoire2.jpg'), 
                        livraison: true, 
                        couleur: ['black', 'Black', 'Red'], 
                        description: 'iPhone XR avec écran Retina, disponible en plusieurs couleurs.' 
                    },
                    { 
                        id: '11', 
                        nom: 'botte', 
                        prix: '100.00', 
                        image: require('../../assets/Images/imagesProduits/fashion5.jpg'), 
                        livraison: false, 
                        couleur: ['black', 'yellow'], 
                        taille: ['38', '39', '40', '41', '42'], 
                        description: 'Bottes élégantes, disponibles en noir et marron, et en plusieurs tailles.' 
                    },
                    { 
                        id: '12', 
                        nom: 'chaussure', 
                        prix: '29.00', 
                        image: require('../../assets/Images/imagesProduits/fashion7.jpg'), 
                        livraison: true, 
                        couleur: ['black', 'white'], 
                        taille: ['38', '39', '40', '41', '42'], 
                        description: 'Chaussures décontractées, disponibles en plusieurs tailles et couleurs.' 
                    },
                ]);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits du panier :', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handlePress = (item) => {
        navigation.navigate('PageMonProduit', { item });
    };

    const handleRemoveItem = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={Color.orange} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mon Panier</Text>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
                            <View style={styles.imageContainer}>
                                <Image source={item.image} style={styles.image} />
                            </View>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.itemName}>{item.nom}</Text>
                                <Text style={styles.itemDescription}>{item.description}</Text>
                                <Text style={styles.itemPrice}>${item.prix}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.removeButton}>
                            <AntDesign name="close" size={20} color={Color.bleu} />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    item: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    imageContainer: {
        marginRight: 10,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 20,
    },
    detailsContainer: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
    },
    itemDescription: {
        fontSize: 11,
        fontFamily: 'InriaSerif',
        marginTop: 10,
    },
    itemPrice: {
        fontSize: 18,
        color: Color.orange,
        marginTop: 20,
    },
    removeButton: {
        padding: 10,
        marginBottom:70
    },
});

export default PagePanier;
