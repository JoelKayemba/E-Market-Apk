import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Animated, Easing } from 'react-native';
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
    const [mainImage, setMainImage] = useState(item.image);
    const [animationValue] = useState(new Animated.Value(1)); // Pour l'animation de l'image

    const handleQuantityChange = (amount) => {
        setQuantity(prevQuantity => Math.max(prevQuantity + amount, 1));
    };

    const totalPrice= item.prix * quantity;

    const animateImageChange = (newImage) => {
        Animated.timing(animationValue, {
            toValue: 0, // Réduire l'image à zéro
            duration: 200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            setMainImage(newImage);

            // Revenir à la taille normale
            Animated.timing(animationValue, {
                toValue: 1,
                duration: 200,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }).start();
        });
    };

    const handleAddToCart = async () => {
        const hasSizeOptions = item.taille && item.taille.length > 0;
        const hasColorOptions = item.couleur && item.couleur.length > 0;

        if (
            (hasSizeOptions && !selectedSize) || 
            (hasColorOptions && !selectedColor)
        ) {
            Alert.alert("Erreur", "Veuillez sélectionner toutes les options requises.");
            return;
        }

        setIsLoading(true);

        const productData = {
            id: item.id,
            image: mainImage, 
            quantity: quantity,
            size: selectedSize,
            color: selectedColor,
            price: item.prix,
            name: item.nom
        };

        try {
            await new Promise(resolve => setTimeout(resolve, 2000)); 

            setNotificationVisible(true);
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
                <Animated.Image source={mainImage} style={[styles.image, { transform: [{ scale: animationValue }] }]} />
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

                <View style={styles.thumbnailContainer}>
                    <TouchableOpacity onPress={() => animateImageChange(item.image)}>
                        <Image source={item.image} style={styles.thumbnail} />
                    </TouchableOpacity>
                    {item.image2 && (
                        <TouchableOpacity onPress={() => animateImageChange(item.image2)}>
                            <Image source={item.image2} style={styles.thumbnail} />
                        </TouchableOpacity>
                    )}
                    {item.image3 && (
                        <TouchableOpacity onPress={() => animateImageChange(item.image3)}>
                            <Image source={item.image3} style={styles.thumbnail} />
                        </TouchableOpacity>
                    )}
                    {item.image4 && (
                        <TouchableOpacity onPress={() => animateImageChange(item.image4)}>
                            <Image source={item.image4} style={styles.thumbnail} />
                        </TouchableOpacity>
                    )}
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
                <TouchableOpacity style={styles.ContainerNomBoutique}>
                    <Text style={styles.nomBoutique}>{item.nomBoutique}</Text>
                </TouchableOpacity>
                
                <Text style={styles.textDescription}>Description</Text>
                <Text style={styles.description}>{item.description}</Text>

                {item.taille && item.taille.length > 0 && (
                    <>
                        <Text style={styles.textDescription}>Tailles</Text>
                        <View style={styles.sizeContainer}>
                            {item.taille.map((taille) => (
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
                    </>
                )}

                {item.couleur && item.couleur.length > 0 && (
                    <CouleurProduit
                        couleurs={item.couleur}
                        selectedColor={selectedColor}
                        onSelectColor={setSelectedColor}
                    />
                )}

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
        <View style={styles.container}>
            <ScrollView  contentContainerStyle={styles.scrollViewContent}>
                {renderHeader()}
            </ScrollView >
            <View style={styles.footer}>
                <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>
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
        

        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        paddingBottom: 100, 
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
        marginBottom: 200,
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
    thumbnailContainer: {
        position: 'absolute',
        bottom: 10,  
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    thumbnail: {
        width: 50,
        height: 50,
        marginHorizontal: 5,
        borderWidth: 3,
        borderColor: '#718355',
        borderRadius: 10,
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
    ContainerNomBoutique:{
        backgroundColor:'#718355',
        alignItems:'center',
        marginTop:10,
        paddingVertical:10,
        borderRadius:20
    },
    nomBoutique:{
        color:'white',
        fontWeight:'bold',
        fontFamily:'InriaSerif',
        fontSize:15
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
        borderColor: Color.bleu,
        borderRadius: 5,
        margin: 5,
    },
    selectedSizeBox: {
        borderColor: Color.orange,
        backgroundColor: Color.orangeLight,
    },
    sizeText: {
        fontSize: 14,
    },
    quantityContainer: {
        marginTop: 20,
    },
    quantitySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Color.orange,
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
        marginHorizontal: 10,
    },
    notification: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        padding: 15,
        backgroundColor: Color.vert,
        alignItems: 'center',
        marginHorizontal:20,
        borderRadius:10
    },
    notificationText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute', 
        left: 0,
        right: 0,
        bottom: 0, 
        backgroundColor: 'white',
        height: 50, 
        alignItems: 'center', 
        height:100
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft:20
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.orange,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginRight:20
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 5,
    },
});

export default PageMonProduit;
