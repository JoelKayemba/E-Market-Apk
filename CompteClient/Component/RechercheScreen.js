import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Color from '../../Styles/Color';
import DismissKeyboard from '../../Component/DismissKeyboard';
import ToutesLesBoutiques from '../Component/ToutesLesBoutiques';
import Produit from '../Component/Produit';
import produits from '../data/produits';
import meilleursBoutiquesData from '../data/meilleursBoutiquesData';
import boutiquePourToiData from '../data/boutiquePourToiData';
import boutiqueProcheData from '../data/boutiqueProcheData';

const fusionnerDonneesBoutiques = [
  ...meilleursBoutiquesData,
  ...boutiquePourToiData,
  ...boutiqueProcheData
];

const RechercheScreen = ({ navigation }) => {
    const [query, setQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchType, setSearchType] = useState('boutique');

    const fusionnerDonnees = {
        produit: produits,
        boutique: fusionnerDonneesBoutiques
    };

    
    useEffect(() => {
        setFilteredItems([]);
        setQuery('');
    }, [searchType]);

    const handleSearch = (text) => {
        setQuery(text);
        if (text) {
            const results = fusionnerDonnees[searchType].filter((item) =>
                item.nom.toLowerCase().includes(text.toLowerCase()) ||
                (item.categorie && item.categorie.toLowerCase().includes(text.toLowerCase()))
            );
            setFilteredItems(results);
        } else {
            setFilteredItems([]);
        }
    };

    const clearSearch = () => {
        setQuery('');
        setFilteredItems([]);
    };

    const renderSearchTypeSelector = () => (
        <View style={styles.selectorContainer}>
            <TouchableOpacity
                style={[styles.selectorButton, searchType === 'boutique' && styles.selected]}
                onPress={() => setSearchType('boutique')}
            >
                <Text style={[styles.selectorText, searchType === 'boutique' && styles.selectedText]}>Boutiques</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.selectorButton, searchType === 'produit' && styles.selected]}
                onPress={() => setSearchType('produit')}
            >
                <Text style={[styles.selectorText, searchType === 'produit' && styles.selectedText]}>Produits</Text>
            </TouchableOpacity>
        </View>
    );

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
                            placeholder={`Rechercher ${searchType === 'boutique' ? 'une boutique' : 'un produit'}...`}
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
                
                {renderSearchTypeSelector()}

                {!query ? (
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>Veuillez saisir une requête pour rechercher {searchType === 'boutique' ? 'des boutiques' : 'des produits'}.</Text>
                    </View>
                ) : filteredItems.length === 0 ? (
                    <View style={styles.noResultsContainer}>
                        <Image source={require('../../assets/logo/vide.png')} style={styles.noResultsImage} />
                        <Text style={styles.noResultsText}>{searchType === 'boutique' ? 'Aucune boutique trouvée' : 'Aucun produit trouvé'}</Text>
                    </View>
                ) : (
                    <View style={styles.resultsContainer}>
                        {searchType === 'boutique' ? (
                            <ToutesLesBoutiques boutiques={filteredItems} />
                        ) : (
                            <Produit produits={filteredItems} />
                        )}
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
        marginBottom: 5,
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
        borderWidth:1,
        borderColor:Color.bleu
    },
    input: {
        flex: 1,
        marginLeft: 10,
    },
    clearButton: {
        marginLeft: 10,
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
    selectorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    selectorButton: {
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#e0e0e0',
        marginHorizontal: 5,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selected: {
        backgroundColor: Color.bleuTransparent,
    },
    selectorText: {
        fontSize: 16,
        color: '#000',
    },
    selectedText: {
        color: '#FFF',
    },
    resultsContainer: {
        flex: 1,
    }
});

export default RechercheScreen;
