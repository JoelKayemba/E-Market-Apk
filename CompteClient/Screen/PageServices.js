import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import CustomHeader from '../../Component/CustomHeader';
import Color from '../../Styles/Color';
import Services from '../Component/Services';
import Prestataires from './Prestataires';
import { AntDesign } from '@expo/vector-icons';

const PageServices = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('services');

  const renderContent = () => {
    if (activeTab === 'services') {
      return <Services />;
    } else {
      return <Prestataires />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      
      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'services' ? styles.activeTab : null]}
          onPress={() => setActiveTab('services')}
        >
          <Text style={styles.tabText}>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('RechercheScreen')} style={styles.recherche}>
            <AntDesign name="search1" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'prestataires' ? styles.activeTab : null]}
          onPress={() => setActiveTab('prestataires')}
        >
          <Text style={styles.tabText}>Prestataires</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  );
};

export default PageServices;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
    backgroundColor:'transparent',
    marginBottom:10
  },
  tab: {
    padding: 10,
    backgroundColor: Color.bleu,
    borderRadius: 10,
    
  },
  activeTab: {
    backgroundColor: 'grey',
  },
  tabText: {
    color: 'white',
    fontSize: 15,
  },
  recherche:{
    padding:10,
    borderRadius:50,
    backgroundColor:'#9EABA2'
  }
});
