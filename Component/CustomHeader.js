import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Color from '../Styles/Color';

const CustomHeader = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.headerButton} onPress={openModal}>
          <Image
            source={require('../assets/logo/emarketLogo.png')} 
            style={styles.profileImage}
          />
          <Ionicons name="chevron-down" size={20} color={Color.grisIcone} />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => alert('Messages')} style={styles.iconButton}>
            <AntDesign name="mail" size={20} color={Color.grisIcone} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Notifications')} style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={20} color={Color.grisIcone} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.modalText}>Mon profil client</Text>
            <TouchableOpacity style={styles.addBoutiqueButton}>
              <Text style={styles.addBoutiqueText}>Ajouter Boutique</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 100,
    backgroundColor: 'white',
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  profileImage: {
    width: 120,
    height: 60,
    borderRadius: 20,
    marginRight: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Color.bleu,
    height: 40,
    width: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Color.orange,
    borderRadius: 20,
    padding: 5,
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
