// page qui affichera tous les produits en page d'accueil
import React, { useState, useRef } from 'react';
import { StyleSheet, View, FlatList, Image, Text, TouchableOpacity, Animated } from 'react-native';
import ClientStyle from '../../Styles/ClientStyle';
import Color from '../../Styles/Color';
import { AntDesign, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ImageWithFallback = ({ source, style }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleImageLoad = () => {
        setLoading(false);
        setError(false);
    };

    const handleImageError = () => {
        setLoading(false);
        setError(true);
    };

    return (
        <View style={{ position: 'relative' }}>
            {loading && <Text style={styles.imageFallback}>Chargement...</Text>}
            {error && <Text style={styles.imageFallback}>Échec du chargement</Text>}
            <Image
                source={source}
                style={style}
                onLoad={handleImageLoad}
                onError={handleImageError}
            />
        </View>
    );
};

const LikeNotification = ({ show }) => {
    const opacity = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if (show) {
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    delay: 500,
                    useNativeDriver: true,
                })
            ]).start();
        }
    }, [show]);

    if (!show) return null;

    return (
        <Animated.View style={[styles.notificationContainer, { opacity }]}>
            <Text style={styles.notificationText}>Aimé!</Text>
        </Animated.View>
    );
};

const Produit = ({ produits }) => {
    const [likedProducts, setLikedProducts] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const navigation = useNavigation();

    const toggleLike = (id) => {
        setLikedProducts((prevState) => {
            if (prevState.includes(id)) {
                return prevState.filter(productId => productId !== id);
            } else {
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 1000);
                return [...prevState, id];
            }
        });
    };

    const handlePress = (item) => {
        navigation.navigate('PageMonProduit', { item });
    };

    // pour gerer le nombre de lettre
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
          return text.substring(0, maxLength) + '...';
        }
        return text;
      };

    const renderItem = ({ item }) => {
        const isLiked = likedProducts.includes(item.id);

        return (
            <TouchableOpacity style={ClientStyle.produitRecommander} onPress={() => handlePress(item)}>
                <ImageWithFallback
                    source={item.image}
                    style={ClientStyle.imageProduit}
                />
                <TouchableOpacity
                    style={ClientStyle.heartIconContainer}
                    onPress={() => toggleLike(item.id)}
                >
                    <AntDesign name={isLiked ? "heart" : "hearto"} size={15} color={Color.orange} />
                </TouchableOpacity>
                <View style={ClientStyle.nomProduitContainer}>
                    <Text style={ClientStyle.nomProduit} numberOfLines={1} ellipsizeMode='tail'>
                        {truncateText(item.nom, 15)}
                    </Text>
                    <MaterialCommunityIcons
                        name="truck-delivery"
                        size={20}
                        color={item.livraison ? Color.vert : 'gray'}
                        style={ClientStyle.iconDelivery}
                    />
                </View>
                <View style={styles.nomBoutique}>
                    <Text style={styles.textNomBoutique}>
                        {item.nomBoutique}
                    </Text>
                </View>
                <View style={styles.ligne2}>
                    <Text style={ClientStyle.prixProduit}>${item.prix}</Text>
                    <TouchableOpacity style={styles.location} onPress={() => alert('Localisation')}>
                        <FontAwesome name="location-arrow" size={15} color="white" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={ClientStyle.containerProduitRecommander}>
            <FlatList
                data={produits}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={ClientStyle.columnWrapper}
            />
            <LikeNotification show={showNotification} />
        </View>
    );
};

const styles = StyleSheet.create({
    ligne2: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    location: {
        backgroundColor: Color.bleuTransparent,
        width: 20,
        height: 20,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginRight: 5
    },
    imageFallback: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -10 }],
        textAlign: 'center',
        color: Color.orange
    },
    notificationContainer: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -50 }],
        backgroundColor: Color.orange,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        zIndex: 1
    },
    notificationText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    nomBoutique:{
        marginLeft:5
    },
    textNomBoutique:{
        fontFamily:'InriaSerif',
        fontSize:10
    }
});

export default Produit;
