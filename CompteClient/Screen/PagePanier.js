import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Color from '../../Styles/Color';

const PagePanier = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        // Simuler la récupération des produits du panier
        const fetchCartItems = async () => {
            try {
                // Simule une demande réseau pour récupérer les produits du panier
                await new Promise(resolve => setTimeout(resolve, 2000));
                // Vous devriez remplacer ceci par votre logique pour obtenir les éléments du panier
                setCartItems([
                    { id: '1', name: 'Produit 1', price: '20.00 €' },
                    { id: '2', name: 'Produit 2', price: '35.00 €' },
                ]);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits du panier :', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCartItems();
    }, []);

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
                    <View style={styles.item}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>{item.price}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: 18,
    },
    itemPrice: {
        fontSize: 18,
        color: Color.orange,
    },
});

export default PagePanier;
