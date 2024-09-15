import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, ImageBackground, Image, ScrollView } from 'react-native';
import Color from '../Styles/Color';
import API_BASE_URL from '../ApiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, AntDesign , Entypo } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const ModalAjouter = ({ visible, closeModal, ajouterBoutique ,openBoutique, devenirPrestataire}) => {
  const [boutiques, setBoutiques] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchBoutiques = async () => {
      try {
        const idclient = await AsyncStorage.getItem('idclient');
        //console.log('idclient récupéré :', idclient);

        if (idclient) {
          const response = await fetch(`${API_BASE_URL}/ownBoutique/boutiquesUtilisateur?idclient=${idclient}`);
          const data = await response.json();
          //console.log('Data récupérée :', data);

          if (response.ok && data) {
            setBoutiques(data);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des boutiques:', error);
        setLoading(false);
      }
    };

    if (visible) {
      fetchBoutiques();
    }
  }, [visible]);

  

  return (
    <Modal
      transparent={true}
      visible={visible}
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
            {/* Icône de fermeture en haut à droite */}
            <TouchableOpacity onPress={closeModal} style={styles.closeIcon}>
              <AntDesign name="closecircle" size={30} color="white" />
            </TouchableOpacity>
            
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {boutiques.length > 0 && (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Vos Boutiques</Text>
                  {boutiques.map((boutique, index) => (
                    <TouchableOpacity key={index} style={styles.boutiqueContainer}  onPress={() => openBoutique(boutique)}>
                      <View style={styles.boutiqueImageContainer}>
                        {boutique.image1 ? (
                          <Image source={{ uri: `${API_BASE_URL}/${boutique.image1.replace(/\\/g, '/')}` }} style={styles.boutiqueImage} />
                        ) : (
                            <Entypo name="shop" size={24} color="black" />
                        )}
                      </View>
                      <Text style={styles.boutiqueName}>{boutique.nom}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              <View style={styles.sectionContainer2}>
                <TouchableOpacity style={styles.addButton} onPress={ajouterBoutique}>
                  <FontAwesome name="plus-circle" size={20} color="white" style={styles.icon} />
                  <Text style={styles.addButtonText}>Ajouter Boutique</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton2} onPress={devenirPrestataire}>
                  <FontAwesome name="user-plus" size={20} color="white" style={styles.icon} />
                  <Text style={styles.addButtonText}>Devenir Prestataire</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: 'transparent',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '90%',
    
    zIndex: 2,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'left',
  },
  sectionContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'left',
    width: '100%',
    marginTop:10,
  },
  sectionContainer2: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'left',
    width: '100%',
    marginTop:10,
    justifyContent:'center',
    alignItems:'center'
  },
  sectionTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  boutiqueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: 'gray', 
    
},

  boutiqueImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    overflow: 'hidden',
  },
  boutiqueImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  boutiqueName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.bleu,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9EABA2',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right:0,
    zIndex: 3,
    marginTop:20
  },
});

export default ModalAjouter;
