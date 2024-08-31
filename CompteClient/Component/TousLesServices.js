import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import Color from '../../Styles/Color';
import ClientStyle from '../../Styles/ClientStyle';
import { useNavigation } from '@react-navigation/native';

const TousLesServices = ({ services }) => {
    const navigation= useNavigation();

    const handlePress = (boutique) => {
        navigation.navigate('PageMaBoutique', { boutique });
    };
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
            <Image source={item.image} style={styles.image} />
            <TouchableOpacity style={ClientStyle.heartIconContainer}>
                <AntDesign name="hearto" size={15} color={Color.orange} />
            </TouchableOpacity>
            <View style={styles.infoContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{item.nom}</Text>
                    <AntDesign
                        name="home"
                        size={15}
                        color={Color.vert}
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
            data={services}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
        overflow: 'hidden'
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
        marginRight: 5,
    },
    iconDelivery: {
        marginRight: 5,
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
        fontFamily: 'InriaSerif'
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    category: {
        fontSize: 12,
        fontFamily: 'InriaSerif'
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
        fontFamily: 'InriaSerif'
    }
});

export default TousLesServices;
