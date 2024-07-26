import React from 'react';
import { View, FlatList, Text } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';
import ClientStyle from '../../Styles/ClientStyle';
import Publicite from '../Component/Publicite';
import Produit from '../Component/Produit';
import Categorie from '../Component/Categorie';
import Recherche from '../Component/Recherche';
import Adresse from '../Component/Adresse';
import produits from '../data/produits';

const Accueil = ({ navigation }) => {

    const renderHeader = () => (
        <View>
            <View style={ClientStyle.containerRecherche}>
                <Recherche />
                <Adresse />
            </View>
            <View style={ClientStyle.containerCategorie}>
                <Categorie />
            </View>
            <Publicite />
            <View style={ClientStyle.containerRecommandation}>
                <Text style={ClientStyle.textPourToi}>Recommandation</Text>
            </View>
        </View>
    );

    return (
        <FlatList
            ListHeaderComponent={renderHeader}
            data={produits}
            renderItem={({ item }) => (
                <Produit
                    produits={[item]} // Passe un tableau contenant un seul produit
                />
            )}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={ClientStyle.columnWrapper}
        />
    );
};

export default Accueil;
