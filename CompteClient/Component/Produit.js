import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Image, Text, TouchableOpacity, Alert } from 'react-native';
import ClientStyle from '../../Styles/ClientStyle';
import Color from '../../Styles/Color';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

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
                <Text style={ClientStyle.nomProduit}>{item.nom}</Text>
                <MaterialCommunityIcons
                    name="truck-delivery"
                    size={24}
                    color={item.livraison ? Color.vert : 'gray'}
                    style={ClientStyle.iconDelivery}
                />
            </View>
            <Text style={ClientStyle.prixProduit}>${item.prix}</Text>
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
   
});

export default Produit;
