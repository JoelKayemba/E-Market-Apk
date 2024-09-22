import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Image, ScrollView } from 'react-native';
import Color from '../Styles/Color';
import API_BASE_URL from '../ApiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, AntDesign, Ionicons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ModalAjouter = ({ visible, closeModal, ajouterBoutique, openBoutique, devenirPrestataire, openPrestataire }) => {
  const [boutiques, setBoutiques] = useState([]);
  const [prestataires, setPrestataires] = useState([]); // Pour les comptes prestataires
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchBoutiquesEtPrestataires = async () => {
      try {
        const idclient = await AsyncStorage.getItem('idclient');

        if (idclient) {
          const [boutiqueResponse, prestataireResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/ownBoutique/boutiquesUtilisateur?idclient=${idclient}`),
            //fetch(`${API_BASE_URL}/ownPrestataire/prestatairesUtilisateur?idclient=${idclient}`)
          ]);

          const boutiquesData = await boutiqueResponse.json();
          //const prestatairesData = await prestataireResponse.json();

          if (boutiqueResponse.ok && boutiquesData) {
            setBoutiques(boutiquesData);
          }

          /*if (prestataireResponse.ok && prestatairesData) {
            setPrestataires(prestatairesData);
          }*/
        }
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des boutiques et prestataires:', error);
        setLoading(false);
      }
    };

    if (visible) {
      fetchBoutiquesEtPrestataires();
    }
  }, [visible]);

  return (
    <Modal
      transparent={false} // Le modal occupe tout l'espace
      visible={visible}
      onRequestClose={closeModal}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        {/* Bouton de fermeture */}
        <TouchableOpacity onPress={closeModal} style={styles.closeIcon}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Boutiques existantes */}
            {boutiques.length > 0 && (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Vos Boutiques</Text>
                {boutiques.map((boutique, index) => (
                  <TouchableOpacity key={index} style={styles.boutiqueContainer} onPress={() => openBoutique(boutique)}>
                    <View style={styles.boutiqueImageContainer}>
                      {boutique.image1 ? (
                        <Image source={{ uri: `${API_BASE_URL}/${boutique.image1.replace(/\\/g, '/')}` }} style={styles.boutiqueImage} />
                      ) : (
                        <Entypo name="shop" size={24} color="gray" />
                      )}
                    </View>
                    <Text style={styles.boutiqueName}>{boutique.nom}</Text>
                    <Ionicons name="chevron-forward-outline" size={24} color="gray" />
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Comptes Prestataires existants */}
            {prestataires.length > 0 && (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Vos Comptes Prestataires</Text>
                {prestataires.map((prestataire, index) => (
                  <TouchableOpacity key={index} style={styles.boutiqueContainer} onPress={() => openPrestataire(prestataire)}>
                    <View style={styles.boutiqueImageContainer}>
                      <FontAwesome name="user-tie" size={24} color="gray" />
                    </View>
                    <Text style={styles.boutiqueName}>{prestataire.nom}</Text>
                    <Ionicons name="chevron-forward-outline" size={24} color="gray" />
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Boutons d'actions */}
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
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    paddingBottom: 20,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  boutiqueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
    justifyContent: 'space-between',
  },
  boutiqueImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  boutiqueImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    resizeMode: 'cover',
  },
  boutiqueName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0077b5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    width: 300,
  },
  addButton2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    width: 300,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    marginRight: 10,
  },
  closeIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
});

export default ModalAjouter;
