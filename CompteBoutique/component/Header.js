import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons ,MaterialIcons} from '@expo/vector-icons'; // Assurez-vous d'avoir installé @expo/vector-icons
import { useNavigation } from '@react-navigation/native';
import Color from '../../Styles/Color';

const Header = ({ shopName}) => {
  const navigation= useNavigation();
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.shopName}>MbokaDeal</Text>
      <TouchableOpacity style={styles.switchButton} onPress={()=> navigation.navigate('TabNavigator')}>
      <MaterialIcons name="logout" size={24} color="black" />
       
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white', 
    padding:20,
    marginTop:20,
    height:100
  },
  shopName: {
    fontSize: 20,
    color: Color.orange,
    fontWeight: 'bold',
  },
  switchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white', // Fond blanc pour le bouton
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Ombre pour donner un effet surélevé
  },
  switchText: {
    color: 'black',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});
