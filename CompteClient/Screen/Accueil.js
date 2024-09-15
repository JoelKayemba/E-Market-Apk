import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, SafeAreaView ,FlatList} from 'react-native';
import ClientStyle from '../../Styles/ClientStyle';
import Publicite from '../Component/Publicite';
import Produit from '../Component/Produit';
import Categorie from '../Component/Categorie';
import Adresse from '../Component/Adresse';
import produits from '../data/produits';
import CustomHeader from '../../Component/CustomHeader';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Accueil = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const scrollY = useRef(new Animated.Value(0)).current; // Reference to track scroll position

    const onRefresh = async () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const renderHeader = () => (
        <View>
            <View style={ClientStyle.containerRecherche}>
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
        <SafeAreaView style={{ flex: 1 }}>
            {/* Using Animated.View for the header */}
            <Animated.View style={{
                transform: [{
                    translateY: scrollY.interpolate({
                        inputRange: [0, 200],
                        outputRange: [0, -200], // Hides the header by moving it up
                        extrapolate: 'clamp'
                    })
                }],
                zIndex: 1, // Ensure the header stays on top
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0
            }}>
                <CustomHeader navigation={navigation} />
            </Animated.View>

            <AnimatedFlatList
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
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                contentContainerStyle={{ paddingTop: 155 }} // Add space for the header
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  // Add styles if needed
});

export default Accueil;
