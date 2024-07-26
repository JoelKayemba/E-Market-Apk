import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import ClientStyle from '../../Styles/ClientStyle';
import Produit from './Produit';
import produits from '../data/produits';
import Color from '../../Styles/Color';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DismissKeyboard from '../../Component/DismissKeyboard';

const RechercheScreen = () => {
  const [query, setQuery] = useState('');
  const [filteredProduits, setFilteredProduits] = useState([]);
  const navigation = useNavigation();

  const handleSearch = (text) => {
    setQuery(text);
    if (text) {
      const results = produits.filter((item) =>
        item.nom.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProduits(results);
    } else {
      setFilteredProduits([]);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setFilteredProduits([]);
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color={Color.orange} style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.rechercheContainer}>
            <Ionicons name="search" size={20} color={Color.grisIcone} />
            <TextInput
              style={styles.input}
              placeholder="Rechercher un produit..."
              value={query}
              onChangeText={handleSearch}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                <Ionicons name="close" size={20} color={Color.grisIcone} />
              </TouchableOpacity>
            )}
           
          </View>
        </View>

        {!query ? (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>Veuillez saisir une requête pour rechercher des produits.</Text>
          </View>
        ) : filteredProduits.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <Image source={require('../../assets/logo/vide.png')} style={styles.noResultsImage} />
            <Text style={styles.noResultsText}>Aucun produit trouvé</Text>
          </View>
        ) : (
          <View style={ClientStyle.containerProduitRecommander}>
            <Produit produits={filteredProduits} />
          </View>
        )}
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 50,
  },
  icon: {
    paddingLeft: 2,
    paddingTop: 10,
  },
  rechercheContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: Color.grisIcone,
    height: 40,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  clearButton: {
    marginLeft: 10,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: Color.orange,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  messageText: {
    color: Color.grisIcone,
    fontSize: 16,
    textAlign: 'center',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noResultsImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  noResultsText: {
    fontSize: 16,
    color: Color.grisIcone,
  },
});

export default RechercheScreen;
