import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Color from '../../Styles/Color';
import API_BASE_URL from '../../ApiConfig';

const Header = ({ boutique }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  // Remplacez les antislashs par des slashs et ajoutez la base URL
  const imageUrl = boutique.images && boutique.images[0]
    ? `${API_BASE_URL}/${boutique.images[0].replace(/\\/g, '/')}`
    : null;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.boutiqueInfo}>
        {imageUrl ? (
          <>
            {loading && (
              <ActivityIndicator size="small" color={Color.orange} style={styles.loader} />
            )}
            <Image
              style={styles.image}
              source={{ uri: imageUrl }}
              onLoadEnd={() => setLoading(false)}
              onError={() => setLoading(false)} // Arrêter le chargement si une erreur survient
            />
          </>
        ) : (
          <Text style={styles.noImageText}></Text>
        )}
        <Text style={styles.shopName}>{boutique.nom}</Text>
      </View>
      
      <TouchableOpacity style={styles.switchButton} onPress={() => navigation.navigate('TabNavigator')}>
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
    padding: 20,
    marginTop: 20,
    height: 100,
  },
  boutiqueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  loader: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  noImageText: {
    fontSize: 16,
    color: Color.grey,
    marginRight: 10,
  },
  shopName: {
    fontSize: 20,
    
    fontWeight: 'bold',
  },
  switchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  switchText: {
    color: 'black',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});
