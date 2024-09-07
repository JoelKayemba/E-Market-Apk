// partie de la page service qui affichera les servivces
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Color from '../../Styles/Color';
import serviceData from '../data/serviceData'; 
import { useNavigation } from '@react-navigation/native';

const categories = ['Tous', 'Coiffure', 'Design', 'Architecture' , 'Restauration'];

const Services = () => {
    const [selectedCategory, setSelectedCategory] = useState('Tous');
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState();
    const navigation = useNavigation();

    const onRefresh = async () => {
        setRefreshing(true);
        // logique pour récupérer les dernières données
        // Par exemple, recharger les données depuis une API
        setTimeout(() => { // Simuler un appel réseau
            setRefreshing(false);
        }, 2000);
    };


    const handlePress = (boutique) => {
        navigation.navigate('PageMesServices', { boutique });
    };

    const filteredData = serviceData.filter((item) => 
        selectedCategory === 'Tous' || item.categorie.includes(selectedCategory)
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.infoContainer}>
                <View style={styles.firsLine}>
                    <Text style={styles.name} >{item.nom}</Text>
                    <AntDesign name="home" size={15} color={Color.vert } style={styles.iconHome}/>
                </View>
                
                <Text style={styles.address}>{item.adresse}</Text>
                <Text style={styles.category}>#{item.categorie}</Text>
            </View>
        </TouchableOpacity>
    );

    

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
            {categories.map((category) => (
                <TouchableOpacity
                    key={category}
                    onPress={() => setSelectedCategory(category)}
                    style={[styles.categoryButton, selectedCategory === category ? styles.selectedCategory : {}]}
                >
                    <Text style={styles.categoryText}>{category}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categoryContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        paddingHorizontal: 10,
        height:40
    },
    categoryButton: {
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginHorizontal: 5,
        backgroundColor: Color.lightGray,
    },
    selectedCategory: {
        backgroundColor: '#9EABA2',
    },
    categoryText: {
        color: 'BLACK',
        fontSize: 16,
    },
    card: {
        flex: 1,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 150,
    },
    firsLine:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    iconHome:{
        marginTop:0
    },
    infoContainer: {
        padding: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    address: {
        fontSize: 14,
        color: 'grey',
        fontFamily:'InriaSerif'
    },
    category: {
        fontSize: 14,
        color: Color.darkGray,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
});

export default Services;
