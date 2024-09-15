import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Octicons from '@expo/vector-icons/Octicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const GestionProduits = () => {
  
  const [products, setProducts] = useState([
    { id: '1', name: 'Produit 1', price: '$10', stock: 20 },
    { id: '2', name: 'Produit 2', price: '$15', stock: 5 },
    { id: '3', name: 'Produit 3', price: '$20', stock: 0 },
  ]);

  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text>Prix: {item.price}</Text>
      <Text>Stock: {item.stock}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={() => editProduct(item.id)}>
          <AntDesign name="edit" size={30} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteProduct(item.id)}>
          <EvilIcons name="trash" size={30} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const editProduct = (id) => {
    
  };

  const deleteProduct = (id) => {
   
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Produits</Text>
      <TouchableOpacity onPress={() => navigation.navigate('AjouterProduits')} style={styles.buttonAdd}>
        <Octicons name="plus" size={24} color="white" />
        <Text style={styles.textButtonAdd}>Ajouter un Nouveau Produit</Text>
      </TouchableOpacity>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default GestionProduits;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f9fc', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
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
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    padding: 10,
    alignItems: 'center',
  },
  deleteButton: { 
    padding: 10,
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
  },
  buttonAdd: {
    backgroundColor: '#0098FF', 
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textButtonAdd: {
    color: 'white',
    fontSize: 18,
    paddingLeft: 10,
  },
});
