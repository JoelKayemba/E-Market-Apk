import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Image, ScrollView , ActivityIndicator} from 'react-native';
import { FontAwesome, AntDesign, Ionicons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchMesBoutiques } from '../Redux/actions/MesBoutiquesAction';
import API_BASE_URL from '../ApiConfig';

const ModalAjouter = ({ visible, closeModal, ajouterBoutique, openBoutique, devenirPrestataire }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { boutiques, loading, error } = useSelector((state) => state.mesBoutiques);
  

  useEffect(() => {
    const fetchData = async () => {
      const idclient = await AsyncStorage.getItem('idclient');
      if (idclient) {
        dispatch(fetchMesBoutiques(idclient));
      }
    };

    if (visible) {
      fetchData();
    }
  }, [visible, dispatch]);

  return (
    <Modal
      transparent={false}
      visible={visible}
      onRequestClose={closeModal}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={closeModal} style={styles.closeIcon}>
          <AntDesign name="close" size={24} color="red" />
        </TouchableOpacity>

        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            {loading &&   <ActivityIndicator size="large" color="orange" />}
            {error && <Text style={{ color: 'red' }}>{error}</Text>}

            {Array.isArray(boutiques) && boutiques.length > 0 && (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Vos Boutiques</Text>
                {boutiques.map((boutique, index) => (
                  <TouchableOpacity key={index} style={styles.boutiqueContainer} onPress={() => openBoutique(boutique)}>
                    <View style={styles.boutiqueImageContainer}>
                      {boutique.images && boutique.images[0] ? (
                        <Image 
                          source={{ uri: `${API_BASE_URL}/${boutique.images[0].replace(/\\/g, '/')}` }} 
                          style={styles.boutiqueImage} 
                        />
                      ) : (
                        <Entypo name="shop" size={24} color="orange" />
                      )}
                    </View>
                    <Text style={styles.boutiqueName}>{boutique.nom}</Text>
                    <Ionicons name="chevron-forward-outline" size={24} color="gray" />
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
    paddingTop:20
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
