// page servant a afficher les details de chaque services entrer et permettant la reservation du service

import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Animated, Easing ,TextInput, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import { AntDesign, MaterialCommunityIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import Color from '../../Styles/Color';

const PageMesServices = ({ route, navigation }) => {
    const { boutique } = route.params;
    const [mainImage, setMainImage] = useState(boutique.image); 
    const [animationValue] = useState(new Animated.Value(1)); // Pour l'animation de l'image
    const [description, setDescription] = useState('');
    const [dates, setDates] = useState(["", "", ""]);

    

   
    const handleBooking = () => {
        if (description && dates.every(date => date.trim() !== '')) {
            alert('le service a ete reserve');
            setDescription('');
            setDates(["", "", ""]);
        } else {
            alert('Completez les cases vide');
        }
    };
    const handleDateChange = (text, index) => {
        const newDates = [...dates];
        newDates[index] = text;
        setDates(newDates);
    };

    const animateImageChange = (newImage) => {
        Animated.timing(animationValue, {
            toValue: 0, // Réduire l'image à zéro
            duration: 200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            // Changer l'image principale après l'animation
            setMainImage(newImage);

            // Revenir à la taille normale
            Animated.timing(animationValue, {
                toValue: 1,
                duration: 200,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }).start();
        });
    };

    const renderHeader = () => (
        <>
            <View style={styles.imageContainer}>
                <Animated.Image source={mainImage} style={[styles.image, { transform: [{ scale: animationValue }] }]} />
                <View style={styles.overlay}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
                        <Ionicons name="arrow-back" size={24} color={Color.orange} />
                    </TouchableOpacity>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity style={styles.iconContainer}>
                            <AntDesign name="hearto" size={24} color={Color.orange} />
                        </TouchableOpacity>
                        
                    </View>
                </View>
                {/* Images supplémentaires positionnées sous l'image principale */}
                <View style={styles.thumbnailContainer}>
                    {/* Miniature de l'image principale */}
                    <TouchableOpacity onPress={() => animateImageChange(boutique.image)}>
                        <Image source={boutique.image} style={styles.thumbnail} />
                    </TouchableOpacity>
                    {/* Autres miniatures */}
                    {boutique.image2 && (
                        <TouchableOpacity onPress={() => animateImageChange(boutique.image2)}>
                            <Image source={boutique.image2} style={styles.thumbnail} />
                        </TouchableOpacity>
                    )}
                    {boutique.image3 && (
                        <TouchableOpacity onPress={() => animateImageChange(boutique.image3)}>
                            <Image source={boutique.image3} style={styles.thumbnail} />
                        </TouchableOpacity>
                    )}
                    {boutique.image4 && (
                        <TouchableOpacity onPress={() => animateImageChange(boutique.image4)}>
                            <Image source={boutique.image4} style={styles.thumbnail} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            
            <View style={styles.infoContainer}>
                <View style={styles.firstContainer}>
                    <Text style={styles.name}>{boutique.nom}</Text>
                    <View style={styles.secondContainer}>
                        <View style={styles.detailsContainer}>
                            <AntDesign
                                name="home"
                                size={15}
                                color={Color.vert}
                            />
                        </View>
                        <View style={styles.detailsContainer}>
                            <AntDesign name="star" size={15} color="gold" />
                            <Text style={styles.rating}>{boutique.note}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    <FontAwesome name="location-arrow" size={12} color={Color.orange} />
                    <Text style={styles.address}>{boutique.adresse}</Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Itinéraire</Text>
                </TouchableOpacity>
                <Text style={styles.category}>#{boutique.categorie}</Text>
                <Text style={styles.textDescription}>Description</Text>
                <Text style={styles.description}>{boutique.description}</Text>
            </View>
            
        </>
    );

    

    return (
        
        <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        
    >
        <ScrollView style={styles.container}>
            {renderHeader()}
            <View style={styles.inputContainer}>
                
                <TextInput
                    style={styles.descriptionInput}
                    placeholder="Descrption de la reservation"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />
                {dates.map((date, index) => (
                    
                    <TextInput
                        key={index}
                        style={styles.dateInput}
                        placeholder={`Date ${index + 1}`}
                        value={date}
                        onChangeText={(text) => handleDateChange(text, index)}
                    />
                ))}
            </View>
            <TouchableOpacity
                style={[styles.bookingButton, { backgroundColor: description && dates.every(date => date.trim() !== '') ? Color.vert : 'lightgrey' }]}
                disabled={!description || dates.some(date => date.trim() === '')}
                onPress={handleBooking}
            >
                <Text style={styles.buttonText2}>Reserver le service</Text>
            </TouchableOpacity>
        </ScrollView>
    </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 330,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        marginBottom:200
    },
    backIcon: {
        marginRight: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    iconContainer: {
        marginHorizontal: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    thumbnailContainer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    thumbnail: {
        width: 60,
        height: 60,
        marginHorizontal: 5,
        borderWidth: 3,
        borderColor: '#718355',
        borderRadius: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 50,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    infoContainer: {
        padding: 10,
        marginHorizontal: 20,
    },
    firstContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    secondContainer: {
        flexDirection: 'row',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        width:250
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        marginRight: 5,
    },
    address: {
        marginLeft: 5,
        fontSize: 14,
        color: 'gray',
        fontFamily: 'InriaSerif',
    },
    rating: {
        marginLeft: 5,
        fontSize: 14,
        fontWeight: 'bold',
    },
    category: {
        fontSize: 11,
        marginVertical: 5,
        fontFamily: 'InriaSerif',
        marginLeft: 15,
        marginTop: -5,
    },
    textDescription: {
        fontSize: 16,
        fontWeight: '500',
    },
    description: {
        fontSize: 14,
        fontFamily: 'InriaSerif',
        marginRight: 50,
        marginTop: 10,
    },
    button: {
        backgroundColor: Color.orange,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 50,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'InriaSerif',
    },
    descriptionInput: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        margin: 20,
        borderRadius:10
    },
    dateInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginHorizontal: 20,
        marginBottom: 10,
        borderRadius:10
    },
    bookingButton: {
        margin: 20,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
  buttonText2:{
    fontFamily:'InriaSerif',
    color:'black'
  }
   
});

export default PageMesServices;
