// CustomHeader.js
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import Color from '../Styles/Color';
import Recherche from '../CompteClient/Component/Recherche';
import { useNavigation } from '@react-navigation/native';
import ModalAjouter from './ModalAjouter';

const CustomHeader = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const ajouterBoutique = () => {
    navigation.navigate('AjouterBoutique');
    setModalVisible(false);
  };

  const devenirPrestataire = () =>{
    navigation.navigate('InscriptionPrestataire');
    setModalVisible(false)
  };

  const openBoutique = (boutique) => {
    console.log(boutique);
    navigation.navigate('BoutiqueNavigator', { boutique });
    setModalVisible(false)
    
  };

  return (
    <View>
      <ImageBackground
        source={require('../assets/imageBack/header.jpg')} 
        style={styles.headerBackground}
      >
        <View style={styles.overlay} />
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.headerButton} onPress={openModal}>
            <Image
              source={require('../assets/logo/emarketLogo.png')} 
              style={styles.profileImage}
            />
            <Ionicons name="chevron-down" size={20} color='white' />
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('MessageList')} style={styles.iconButton}>
              <AntDesign name="mail" size={20} color={Color.orange} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PageProfil')} style={styles.iconButton}>
              <FontAwesome name="user" size={20} color={Color.orange} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rechercheContainer}>
          <Recherche />
        </View>
      </ImageBackground>

      <ModalAjouter
        visible={modalVisible}
        closeModal={closeModal}
        ajouterBoutique={ajouterBoutique}
        devenirPrestataire={devenirPrestataire}
        openBoutique= {openBoutique}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    width: '100%',
    height: 200,
    position: 'relative', 
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: '60%',
    zIndex: 2, 
    marginTop:20,
    borderBottomLeftRadius: 15,  
    borderBottomRightRadius: 15, 
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 60,
    borderRadius: 20,
    marginRight: 5,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#00000091', 
    borderWidth: 1,
    borderColor: Color.bleu,
    height: 40,
    width: 40,
  },
  rechercheContainer: {
    paddingHorizontal: 10,
    zIndex: 2, 
    marginTop: -20
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default CustomHeader;
