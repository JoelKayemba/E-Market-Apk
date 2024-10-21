import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Octicons from '@expo/vector-icons/Octicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { fetchProducts } from '../../Redux/actions/productActions';
import API_BASE_URL from '../../ApiConfig';

const GestionProduits = ({ route }) => {
  const boutique = route.params?.boutique;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);

  // Utilisez `useFocusEffect` pour récupérer les produits à chaque fois que la page devient active
  useFocusEffect(
    React.useCallback(() => {
      if (boutique?.idBoutique) {
        dispatch(fetchProducts(boutique.idBoutique));
      }
    }, [dispatch, boutique])
  );

  // Filtrer les produits pour supprimer les doublons (basé sur l'idProduit)
  const uniqueProducts = products.filter(
    (product, index, self) =>
      index === self.findIndex((p) => p.idProduit === product.idProduit)
  );

  const renderItem = ({ item }) => {
    const correctedImagePath = item.image ? item.image.replace(/\\/g, '/') : null;

    return (
      <View style={styles.productItem}>
        <View style={styles.card}>
          <View>
            <Text style={styles.productName}>{item.nom}</Text>
            <Text>Prix: {item.prix}</Text>
            <Text>Description: {item.description}</Text>
          </View>
          <View>
            {correctedImagePath ? (
              <Image source={{ uri: `${API_BASE_URL}/${correctedImagePath}` }} style={styles.image} />
            ) : (
              <MaterialIcons name="error-outline" size={24} color="orange" />
            )}
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.editButton} onPress={() => editProduct(item.idProduit)}>
            <AntDesign name="edit" size={20} color="#4CAF50" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => deleteProduct(item.idProduit)}>
            <EvilIcons name="trash" size={30} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const editProduct = (id) => {
    // Logique pour éditer le produit
  };

  const deleteProduct = (id) => {
    // Logique pour supprimer le produit
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Chargement des produits...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.secondContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('AjouterProduits', { boutique })} style={styles.buttonAdd}>
            <Octicons name="plus" size={20} color="white" style={styles.iconAdd} />
            <Text style={styles.textButtonAdd}>Ajouter un Produit</Text>
          </TouchableOpacity>
          {uniqueProducts.length > 0 ? (
            <FlatList
              data={uniqueProducts}
              renderItem={renderItem}
              keyExtractor={(item) => item.idProduit ? item.idProduit.toString() : Math.random().toString()} // Utiliser un fallback si l'id est undefined
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.noProductsContainer}>
              <Text style={styles.noProductsText}>Aucun produit trouvé</Text>
            </View>
          )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  noProductsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductsText: {
    fontSize: 18,
    color: '#666',
  },
});
