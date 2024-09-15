import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import React, { useState } from 'react';

const GestionProduits = () => {
  // Exemple de données pour les produits
  const [products, setProducts] = useState([
    { id: '1', name: 'Produit 1', price: '$10', stock: 20 },
    { id: '2', name: 'Produit 2', price: '$15', stock: 5 },
    { id: '3', name: 'Produit 3', price: '$20', stock: 0 },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text>Prix: {item.price}</Text>
      <Text>Stock: {item.stock}</Text>
      <View style={styles.actions}>
        <Button title="Éditer" onPress={() => editProduct(item.id)} />
        <Button title="Supprimer" color="red" onPress={() => deleteProduct(item.id)} />
      </View>
    </View>
  );

  const editProduct = (id) => {
    // Logique pour éditer un produit
  };

  const deleteProduct = (id) => {
    // Logique pour supprimer un produit
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Produits</Text>
      <Button title="Ajouter un Nouveau Produit" onPress={() => { /* Logique pour ajouter un produit */ }} />
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default GestionProduits;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productItem: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
