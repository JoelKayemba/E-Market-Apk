import React ,{ useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity ,  ScrollView} from 'react-native';
import prestataires from '../data/PrestatairesData';






const TousPrestataires = ( { prestataires }) => {
  

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={item.imageUrl} style={styles.image} />
      <Text style={styles.name}>{item.nom}</Text>
      <Text style={styles.service}>{item.service}</Text>
      <Text style={styles.experience}>{item.experience}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={prestataires}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  list: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    width: 160, 
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  service: {
    fontSize: 14,
    color: 'gray',
  },
  experience: {
    fontSize: 12,
    color: 'darkgray',
  }
});

export default TousPrestataires;