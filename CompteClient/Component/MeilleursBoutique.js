import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import Color from '../../Styles/Color';
import ClientStyle from '../../Styles/ClientStyle';
import meilleursBoutiquesData from '../data/meilleursBoutiquesData';

const MeilleursBoutique = () => {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={ClientStyle.heartIconContainer}>
                <AntDesign name="hearto" size={15} color={Color.orange} />
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{item.nom}</Text>
                    <MaterialCommunityIcons
                        name="truck-delivery"
                        size={15}
                        color={item.livraison ? Color.vert : 'gray'}
                        style={styles.iconDelivery}
                    />
                    <AntDesign name="star" size={15} color="gold" />
                    <Text style={styles.rating}>{item.note}</Text>
                </View>
                <View style={styles.addressContainer}>
                    <FontAwesome name="location-arrow" size={12} color={Color.orange} />
                    <Text style={styles.address}>{item.adresse}</Text>
                </View>
                <View style={styles.categoryContainer}>
                    <Text style={styles.category}>#{item.categorie}</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Itinéraire</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            horizontal
            data={meilleursBoutiquesData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 5,
        marginVertical: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
        overflow: 'hidden',
        width: 290
    },
    image: {
        width: '100%',
        height: 120
    },
    infoContainer: {
        padding: 10
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
        marginRight: 5
    },
    iconDelivery: {
        marginRight: 5
    },
    rating: {
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 5
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    address: {
        marginLeft: 5,
        fontSize: 12,
        color: 'gray',
        fontFamily:'InriaSerif'
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    category: {
        fontSize: 12,
        fontFamily:'InriaSerif'
    },
    button: {
        backgroundColor: Color.orange,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 50
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        fontFamily:'InriaSerif'
    }
});

export default MeilleursBoutique;
