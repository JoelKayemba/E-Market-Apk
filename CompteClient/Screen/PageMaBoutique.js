import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Animated, Easing } from 'react-native';
import { AntDesign, MaterialCommunityIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import Color from '../../Styles/Color';

const PageMaBoutique = ({ route, navigation }) => {
    const { boutique } = route.params;
    const [isSearching, setIsSearching] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [likedProducts, setLikedProducts] = useState(new Set());
    const [mainImage, setMainImage] = useState(boutique.image); 
    const [animationValue] = useState(new Animated.Value(1)); // Pour l'animation de l'image

    const produits = [
        { id: '1', nom: 'chaussure Nike', prix: '10.00', image: require('../../assets/Images/produit1.jpg'), livraison: false },
        { id: '2', nom: 'chaussure addidas', prix: '20.00', image: require('../../assets/Images/produit2.jpg'), livraison: true },
        { id: '3', nom: 'manette', prix: '30.00', image: require('../../assets/Images/manette.jpg'), livraison: false },
        { id: '4', nom: 'sac', prix: '40.00', image: require('../../assets/Images/sac.jpg'), livraison: true },
        { id: '5', nom: 'montre Rolex', prix: '40.00', image: require('../../assets/Images/montre.jpg'), livraison: true },
    ];

    const handlePress = (item) => {
        navigation.navigate('PageMonProduit', { item });
    };

    const handleLike = (productId) => {
        setLikedProducts((prevLikes) => {
            const updatedLikes = new Set(prevLikes);
            if (updatedLikes.has(productId)) {
                updatedLikes.delete(productId);
            } else {
                updatedLikes.add(productId);
            }
            return updatedLikes;
        });
    };

    const animateImageChange = (newImage) => {
        Animated.timing(animationValue, {
            toValue: 0, // Réduire l'image à zéro
            duration: 200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            // Changer l'image principale après l'animation
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
                        <TouchableOpacity 
                            style={styles.iconContainer} 
                            onPress={() => navigation.navigate('RechercheScreen')}
                        >
                            <AntDesign name="search1" size={24} color={Color.orange} />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Images supplémentaires positionnées sous l'image principale */}
                <View style={styles.thumbnailContainer}>
                    {/* Miniature de l'image principale */}
                    <TouchableOpacity onPress={() => animateImageChange(boutique.image)}>
                        <Image source={boutique.image} style={styles.thumbnail} />
                    </TouchableOpacity>
                    {/* Autres miniatures */}
                    {boutique.image2 && (
                        <TouchableOpacity onPress={() => animateImageChange(boutique.image2)}>
                            <Image source={boutique.image2} style={styles.thumbnail} />
                        </TouchableOpacity>
                    )}
                    {boutique.image3 && (
                        <TouchableOpacity onPress={() => animateImageChange(boutique.image3)}>
                            <Image source={boutique.image3} style={styles.thumbnail} />
                        </TouchableOpacity>
                    )}
                    {boutique.image4 && (
                        <TouchableOpacity onPress={() => animateImageChange(boutique.image4)}>
                            <Image source={boutique.image4} style={styles.thumbnail} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            
            <View style={styles.infoContainer}>
                <View style={styles.firstContainer}>
                    <Text style={styles.name}>{boutique.nom}</Text>
                    <View style={styles.secondContainer}>
                        <View style={styles.detailsContainer}>
                            <MaterialCommunityIcons
                                name="truck-delivery"
                                size={15}
                                color={boutique.livraison ? Color.vert : 'gray'}
                            />
                        </View>
                        <View style={styles.detailsContainer}>
                            <AntDesign name="star" size={15} color="gold" />
                            <Text style={styles.rating}>{boutique.note}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    <FontAwesome name="location-arrow" size={12} color={Color.orange} />
                    <Text style={styles.address}>{boutique.adresse}</Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Itinéraire</Text>
                </TouchableOpacity>
                <Text style={styles.category}>#{boutique.categorie}</Text>
                <Text style={styles.textDescription}>Description</Text>
                <Text style={styles.description}>{boutique.description}</Text>
            </View>
            <Text style={styles.textProduit}>Produits</Text>
        </>
    );

    const renderProduit = ({ item }) => (
        <TouchableOpacity style={styles.produitContainer} onPress={() => handlePress(item)}>
            <Image source={item.image} style={styles.produitImage} />
            <View style={styles.produitDetails}>
                <Text style={styles.produitName}>{item.nom}</Text>
                <Text style={styles.produitPrice}>{item.prix} €</Text>
                <Text style={styles.produitLivraison}>
                    Livraison {item.livraison ? 'Disponible' : 'Non Disponible'}
                </Text>
            </View>
            <TouchableOpacity 
                style={styles.likeButton}
                onPress={() => handleLike(item.id)}
            >
                <AntDesign 
                    name={likedProducts.has(item.id) ? "heart" : "hearto"} 
                    size={24} 
                    color={Color.orange} 
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <FlatList
            ListHeaderComponent={renderHeader}
            data={produits}
            renderItem={renderProduit}
            keyExtractor={item => item.id}
        />
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
        marginBottom:200
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
        width: 60,
        height: 60,
        marginHorizontal: 5,
        borderWidth: 3,
        borderColor: '#718355',
        borderRadius: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 50,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    infoContainer: {
        padding: 10,
        marginHorizontal: 20,
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
    address: {
        marginLeft: 5,
        fontSize: 14,
        color: 'gray',
        fontFamily: 'InriaSerif',
    },
    rating: {
        marginLeft: 5,
        fontSize: 14,
        fontWeight: 'bold',
    },
    category: {
        fontSize: 11,
        marginVertical: 5,
        fontFamily: 'InriaSerif',
        marginLeft: 15,
        marginTop: -5,
    },
    textDescription: {
        fontSize: 16,
        fontWeight: '500',
    },
    description: {
        fontSize: 14,
        fontFamily: 'InriaSerif',
        marginRight: 50,
        marginTop: 10,
    },
    button: {
        backgroundColor: Color.orange,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 50,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'InriaSerif',
    },
    textProduit: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        marginLeft: 20,
    },
    produitContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 20,
        alignItems: 'center',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
       
    },
    produitImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    produitDetails: {
        flex: 1,
        marginLeft: 10,
    },
    produitName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    produitPrice: {
        fontSize: 14,
        color: Color.orange,
    },
    produitLivraison: {
        fontSize: 12,
        color: 'gray',
    },
    likeButton: {
        marginLeft: 10,
    },
});

export default PageMaBoutique;
