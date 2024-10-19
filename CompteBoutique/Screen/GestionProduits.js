import { StyleSheet, Text, View, FlatList, TouchableOpacity , Image, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Octicons from '@expo/vector-icons/Octicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Header from '../component/Header';

const GestionProduits = ({route}) => {

  const boutique = route.params?.boutique;
  
  const [products, setProducts] = useState([
    { id: '1', name: 'Produit 1', price: '$10', stock: 20 ,image: require('../../assets/Images/imagesProduits/fashion1.jpg')},
    { id: '2', name: 'Produit 2', price: '$15', stock: 5 ,image: require('../../assets/Images/imagesProduits/fashion2.jpg')},
    { id: '3', name: 'Produit 3', price: '$20', stock: 0 ,image: require('../../assets/Images/imagesProduits/fashion3.jpg')},
  ]);

  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <View style={styles.card}>
        <View>
          <Text style={styles.productName}>{item.name}</Text>
          <Text>Prix: {item.price}</Text>
          <Text>Stock: {item.stock}</Text>
        </View>
        <View>
          <Image source={item.image} style={styles.image}/>
        </View>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={() => editProduct(item.id)}>
          <AntDesign name="edit" size={20} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteProduct(item.id)}>
          <EvilIcons name="trash" size={30} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const editProduct = (id) => {
    // Logique pour éditer le produit
  };

  const deleteProduct = (id) => {
    // Logique pour supprimer le produit
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.secondContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('AjouterProduits', {boutique})} style={styles.buttonAdd}>
            <Octicons name="plus" size={20} color="white" style={styles.iconAdd} />
            <Text style={styles.textButtonAdd}>Ajouter un Produit</Text>
          </TouchableOpacity>
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GestionProduits;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  secondContainer: {
    padding: 20,
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
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 10,
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
  buttonAdd: {
    backgroundColor: '#1E90FF', 
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, 
  },
  textButtonAdd: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600', 
    paddingLeft: 10,
  },
  iconAdd: {
    marginRight: 8,
  },
});
