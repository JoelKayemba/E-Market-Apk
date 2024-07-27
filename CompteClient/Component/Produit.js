import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Image, Text, TouchableOpacity, Alert } from 'react-native';
import ClientStyle from '../../Styles/ClientStyle';
import Color from '../../Styles/Color';
import { AntDesign, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

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

const Produit = ({ produits }) => {
    const handlePress = (item) => {
        Alert.alert(`Détails du produit`, `Nom: ${item.nom}\nPrix: $${item.prix}\nLivraison: ${item.livraison ? 'Disponible' : 'Non disponible'}`);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={ClientStyle.produitRecommander} onPress={() => handlePress(item)}>
            <ImageWithFallback
                source={item.image}
                style={ClientStyle.imageProduit}
            />
            <View style={ClientStyle.heartIconContainer}>
                <AntDesign name="hearto" size={15} color={Color.orange} />
            </View>
            <View style={ClientStyle.nomProduitContainer}>
                <Text style={ClientStyle.nomProduit} numberOfLines={1} ellipsizeMode='tail'>
                    {item.nom}
                </Text>
                <MaterialCommunityIcons
                    name="truck-delivery"
                    size={20}
                    color={item.livraison ? Color.vert : 'gray'}
                    style={ClientStyle.iconDelivery}
                />
            </View>
            <View style={styles.ligne2}>
                <Text style={ClientStyle.prixProduit}>${item.prix}</Text>
                <TouchableOpacity style={styles.location} onPress={() => alert('Localisation')}>
                    <FontAwesome name="location-arrow" size={15} color="white" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={ClientStyle.containerProduitRecommander}>
            <FlatList
                data={produits}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={ClientStyle.columnWrapper}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    ligne2: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    location: {
        backgroundColor: Color.orange,
        width: 20,
        height: 20,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginRight: 5
    },
   
});

export default Produit;
