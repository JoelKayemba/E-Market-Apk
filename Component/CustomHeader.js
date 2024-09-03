// le header de la page d'accueil et la page boutique

import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, ImageBackground, Image , Text} from 'react-native';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import Color from '../Styles/Color';
import Recherche from '../CompteClient/Component/Recherche';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const ajouterBoutique=()=>{
    navigation.navigate('AjouterBoutique'),
    setModalVisible(false);
  }

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

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <ImageBackground
            source={require('../assets/imageBack/e.jpg')} 
            style={styles.modalBackground}
          >
            <View style={styles.overlay} />
            <View style={styles.modalContent}>
            <TouchableOpacity style={styles.addBoutiqueButton} onPress={ajouterBoutique}>
                <Text style={styles.addBoutiqueText}>Ajouter Boutique</Text>
              </TouchableOpacity>
              
            </View>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.textClose}>Fermer</Text>
              </TouchableOpacity>
          </ImageBackground>
        </View>
      </Modal>

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
    marginTop:-20
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Couche sombre pour améliorer la lisibilité
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    
  },
  modalContent: {
    backgroundColor:'transparent',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    alignItems: 'center',
    zIndex: 2, // Assure que le contenu est au-dessus de l'overlay
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  closeButton: {
    backgroundColor: '#FF0000A8',
    borderRadius: 20,
    padding: 5,
    marginTop:20,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    width:170,
    top:100

  },
  textClose:{
    color:'white'
  },
  addBoutiqueButton: {
    backgroundColor: Color.bleu,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  addBoutiqueText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CustomHeader;
