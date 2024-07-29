import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import Color from '../../Styles/Color';
import CouleurProduit from '../../Styles/CouleurProduit';

const PageMonProduit = ({ navigation }) => {
    const route = useRoute();
    const { item } = route.params;
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [notificationVisible, setNotificationVisible] = useState(false);

    const handleQuantityChange = (amount) => {
        setQuantity(prevQuantity => Math.max(prevQuantity + amount, 1));
    };

    const handleAddToCart = async () => {
        if (!selectedSize || !selectedColor) {
            Alert.alert("Erreur", "Veuillez sélectionner une taille et une couleur.");
            return;
        }

        setIsLoading(true);

        // Préparer les données du produit à ajouter au panier
        const productData = {
            id: item.id,
            image: item.image,
            quantity: quantity,
            size: selectedSize,
            color: selectedColor,
            price: item.prix,
            name: item.nom
        };

        try {
            // Simuler une requête d'ajout au panier
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simule une requête réseau

            // Envoyer les données au panier 
            //  utiliser fetch ou axios pour envoyer les données.
            // Par exemple : await fetch('URL_DE_VOTRE_API', { method: 'POST', body: JSON.stringify(productData), ... });

            // Afficher la notification
            setNotificationVisible(true);
            // Masquer la notification après 3 secondes
            setTimeout(() => {
                setNotificationVisible(false);
            }, 3000);
        } catch (error) {
            console.error("Erreur lors de l'ajout au panier :", error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderHeader = () => (
        <>
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.overlay}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
                        <Ionicons name="arrow-back" size={24} color={Color.orange} />
                    </TouchableOpacity>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity style={styles.iconContainer}>
                            <AntDesign name="hearto" size={24} color={Color.orange} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.firstContainer}>
                    <Text style={styles.name}>{item.nom}</Text>
                    <View style={styles.secondContainer}>
                        <View style={styles.detailsContainer}>
                            <MaterialCommunityIcons
                                name="truck-delivery"
                                size={15}
                                color={item.livraison ? Color.vert : 'gray'}
                            />
                        </View>
                    </View>
                </View>
                <Text style={styles.textDescription}>Description</Text>
                <Text style={styles.description}>{item.description}</Text>
                
                {/* Tailles */}
                <Text style={styles.textDescription}>Tailles</Text>
                <View style={styles.sizeContainer}>
                    {(item.taille || []).map((taille) => (
                        <TouchableOpacity
                            key={taille}
                            style={[
                                styles.sizeBox,
                                selectedSize === taille && styles.selectedSizeBox
                            ]}
                            onPress={() => setSelectedSize(taille)}
                        >
                            <Text style={styles.sizeText}>{taille}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                
                {/* Couleurs */}
                <CouleurProduit
                    couleurs={item.couleur || []}
                    selectedColor={selectedColor}
                    onSelectColor={setSelectedColor}
                />

                {/* Quantity Selector */}
                <View style={styles.quantityContainer}>
                    <Text style={styles.textDescription}>Quantité</Text>
                    <View style={styles.quantitySelector}>
                        <TouchableOpacity
                            onPress={() => handleQuantityChange(-1)}
                            style={styles.quantityButton}
                        >
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity
                            onPress={() => handleQuantityChange(1)}
                            style={styles.quantityButton}
                        >
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {notificationVisible && (
                <View style={styles.notification}>
                    <Text style={styles.notificationText}>Produit ajouté au panier !</Text>
                </View>
            )}
        </>
    );

    return (
        <ScrollView style={styles.container}>
            {renderHeader()}
            <View style={styles.footer}>
                <Text style={styles.price}>{item.prix} €</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddToCart}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <>
                            <AntDesign name="shoppingcart" size={24} color="white" />
                            <Text style={styles.addButtonText}>Ajouter au panier</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 330,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        marginBottom: 200
    },
    backIcon: {
        marginRight: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    iconContainer: {
        marginHorizontal: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoContainer: {
        padding: 10,
        marginHorizontal: 20,
        flex: 1,
    },
    firstContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    secondContainer: {
        flexDirection: 'row',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        marginRight: 5,
    },
    textDescription: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: '500',
    },
    description: {
        fontSize: 14,
        fontFamily: 'InriaSerif',
        marginRight: 50,
        marginTop: 10,
    },
    sizeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
    },
    sizeBox: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        margin: 5,
    },
    selectedSizeBox: {
        borderColor: Color.orange,
    },
    sizeText: {
        fontSize: 14,
    },
    quantityContainer: {
        marginVertical: 10,
    },
    quantitySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
    },
    quantityButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.orange,
        borderRadius: 5,
    },
    quantityButtonText: {
        color: 'white',
        fontSize: 18,
    },
    quantityText: {
        fontSize: 18,
        marginHorizontal: 15,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,

        borderTopWidth: 1,
        borderTopColor: 'lightgray',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.orange,
        padding: 10,
        borderRadius: 5,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
    notification: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        padding: 15,
        backgroundColor: Color.vert,
        alignItems: 'center',
    },
    notificationText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PageMonProduit;
