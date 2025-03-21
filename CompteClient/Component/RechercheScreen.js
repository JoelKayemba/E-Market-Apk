// page de recherche

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
import services from '../data/serviceData';
import TousLesServices from './TousLesServices';
import prestataires from '../data/PrestatairesData';
import TousPrestataires from './TousPrestataires';

const fusionnerDonneesBoutiques = [
  ...meilleursBoutiquesData,
  ...boutiquePourToiData,
  ...boutiqueProcheData
];

const RechercheScreen = ({ navigation }) => {
    const [query, setQuery] = useState(''); //pour detecter la valeur entrer dans le champ input
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchType, setSearchType] = useState('boutique');

    const fusionnerDonnees = {
        produit: produits,
        boutique: fusionnerDonneesBoutiques,
        services: services,
        prestataires: prestataires
    };

    useEffect(() => {
        setFilteredItems([]);
        setQuery('');
    }, [searchType]);

    const handleSearch = (text) => {
        setQuery(text);
    
        if (text) {
            const keywords = text.toLowerCase().split(' '); // pour diviser le texte de recherche en un tableau de mots en se basant sur les espaces
            const results = fusionnerDonnees[searchType].filter(item =>
                keywords.every(keyword =>  // every pour vérifier si chaque mot du tableau est présent
                    (item.nom && item.nom.toLowerCase().includes(keyword)) ||  // includes pour verifier le text entrer 
                    (item.categorie && item.categorie.toLowerCase().includes(keyword)) ||
                    (item.service && item.service.toLowerCase().includes(keyword)) ||
                    (item.description && item.description.toLowerCase().includes(keyword))
                )
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
            <TouchableOpacity
                style={[styles.selectorButton, searchType === 'services' && styles.selected]}
                onPress={() => setSearchType('services')}
            >
                <Text style={[styles.selectorText, searchType === 'services' && styles.selectedText]}>Services</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.selectorButton, searchType === 'prestataires' && styles.selected]}
                onPress={() => setSearchType('prestataires')}
            >
                <Text style={[styles.selectorText, searchType === 'prestataires' && styles.selectedText]}>Prestataires</Text>
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
                            placeholder={`Rechercher ${searchType === 'boutique' ? 'une boutique' : searchType === 'produit' ? 'un produit' : searchType === 'services' ? 'services' : 'prestataires'}...`}
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
                        <Text style={styles.messageText}>Veuillez saisir une requête pour rechercher {searchType === 'boutique' ? 'des boutiques' : searchType === 'produit' ? 'des produits' : searchType === 'services' ? 'des services' : 'des prestataires'}.</Text>
                    </View>
                ) : filteredItems.length === 0 ? (
                    <View style={styles.noResultsContainer}>
                        <Image source={require('../../assets/logo/vide.png')} style={styles.noResultsImage} />
                        <Text style={styles.noResultsText}>{searchType === 'boutique' ? 'Aucune boutique trouvée' : searchType === 'produit' ? 'Aucun produit trouvé' : searchType === 'service' ? 'Aucun service trouvé' : 'Aucun prestataire trouvé'}</Text>
                    </View>
                ) : (
                    <View style={styles.resultsContainer}>
                        {searchType === 'boutique' ? (
                            <ToutesLesBoutiques boutiques={filteredItems} />
                        ) : searchType === 'produit' ? (
                            <Produit produits={filteredItems} />
                        ) : searchType === 'services' ? (
                            <TousLesServices services={filteredItems} />
                        ) : searchType === 'prestataires' ? (
                            <TousPrestataires prestataires={filteredItems} />
                        ) : (
                            <Text>Aucun résultat trouvé.</Text>
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
        borderWidth: 1,
        borderColor: Color.bleu
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
        alignItems: 'center', 
        flexWrap: 'wrap', 
        marginVertical: 10,
        paddingHorizontal: 10,
        
    },
    selectorButton: {
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#e0e0e0',
        margin: 5,
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
