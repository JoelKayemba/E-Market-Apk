import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Animated } from 'react-native';
import { AntDesign, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import Color from '../../Styles/Color';
import ClientStyle from '../../Styles/ClientStyle';
import boutiquePourToiData from '../data/boutiquePourToiData';
import { useNavigation } from '@react-navigation/native';


const LikeNotification = ({ show }) => {
    const opacity = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if (show) {
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    delay: 500,
                    useNativeDriver: true,
                })
            ]).start();
        }
    }, [show]);

    if (!show) return null;

    return (
        <Animated.View style={[styles.notificationContainer, { opacity }]}>
            <Text style={styles.notificationText}>Aimé!</Text>
        </Animated.View>
    );
};

const BoutiquePourToi = () => {
    const [likedBoutiques, setLikedBoutiques] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const navigation=useNavigation();
    

    const toggleLike = (id) => {
        setLikedBoutiques((prevState) => {
            if (prevState.includes(id)) {
                return prevState.filter(boutiqueId => boutiqueId !== id);
            } else {
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 1000);
                return [...prevState, id];
            }
        });
    };

    const handlePress = (boutique) => {
        navigation.navigate('PageMaBoutique', { boutique });
    };

    const renderItem = ({ item }) => {
        const isLiked = likedBoutiques.includes(item.id);

        return (
            <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
                <Image source={item.image} style={styles.image} />
                <TouchableOpacity
                    style={ClientStyle.heartIconContainer}
                    onPress={() => toggleLike(item.id)}
                >
                    <AntDesign name={isLiked ? "heart" : "hearto"} size={15} color={Color.orange} />
                </TouchableOpacity>
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
    };

    return (
        <View>
            <FlatList
                horizontal
                data={boutiquePourToiData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
            />
            <LikeNotification show={showNotification} />
        </View>
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
    },
    notificationContainer: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -50 }],
        backgroundColor: Color.orange,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        zIndex: 1
    },
    notificationText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    }
});

export default BoutiquePourToi;
