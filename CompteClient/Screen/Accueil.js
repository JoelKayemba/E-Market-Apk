import React from 'react';
import { View, FlatList, Text ,StyleSheet} from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';
import ClientStyle from '../../Styles/ClientStyle';
import Publicite from '../Component/Publicite';
import Produit from '../Component/Produit';
import Categorie from '../Component/Categorie';
import Recherche from '../Component/Recherche';
import Adresse from '../Component/Adresse';
import produits from '../data/produits';
import CustomHeader from '../../Component/CustomHeader';

const Accueil = ({ navigation }) => {

    const renderHeader = () => (
        <View>
            <View style={ClientStyle.containerRecherche}  >
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
        <View style={{ flex: 1 }}>
            <CustomHeader navigation={navigation} />
            <FlatList
                ListHeaderComponent={renderHeader}
                data={produits}
                renderItem={({ item }) => (
                    <Produit
                        produits={[item]} 
                    />
                )}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={ClientStyle.columnWrapper}
            />
        </View>
    );
};
const styles = StyleSheet.create({
  
});

export default Accueil;
