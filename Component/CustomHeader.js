// CustomHeader.js
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { Ionicons, AntDesign, FontAwesome ,Entypo} from '@expo/vector-icons';
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
        source={require('../assets/imageBack/head.jpg')} 
        style={styles.headerBackground}
      >
        <View style={styles.overlay} />
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.headerButton} onPress={openModal}>
           
            <Entypo name="menu" size={35} color="white"  style={styles.profileImage}/>
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('MessageList')} style={styles.iconButton}>
              <AntDesign name="mail" size={20} color='white' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PageProfil')} style={styles.iconButton}>
              <FontAwesome name="user" size={20} color='white' />
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
    marginRight: 5,
    marginLeft:10
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Ajoutez un fond semi-transparent
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    height: 44,
    width: 44,
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
