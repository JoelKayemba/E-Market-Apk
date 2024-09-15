import React , {useState} from 'react';
import { View, FlatList, Text ,StyleSheet} from 'react-native';
import ClientStyle from '../../Styles/ClientStyle';
import Publicite from '../Component/Publicite';
import Produit from '../Component/Produit';
import Categorie from '../Component/Categorie';
import Adresse from '../Component/Adresse';
import produits from '../data/produits';
import CustomHeader from '../../Component/CustomHeader';

const Accueil = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = async () => {
        setRefreshing(true);
        // logique pour récupérer les dernières données
        // Par exemple, recharger les données depuis une API
        setTimeout(() => { // Simuler un appel réseau
            setRefreshing(false);
        }, 2000);
    };

    const renderHeader = () => (
        <View>
            <View style={ClientStyle.containerRecherche}  >
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
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        </View>
    );
};
const styles = StyleSheet.create({
  
});

export default Accueil;
