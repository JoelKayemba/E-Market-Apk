import React ,{ useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity ,  ScrollView} from 'react-native';
import prestataires from '../data/PrestatairesData';
import { useNavigation } from '@react-navigation/native';




const categories = ['Tous', 'Designer', 'Porteur', 'Electricien', 'Chauffeur', 'Coiffeuse', 'Cuisiniere', 'Architecte', 'Business Woman'];

const Prestataires = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const navigation = useNavigation();

  const filteredData = prestataires.filter(item =>
    selectedCategory === 'Tous' || item.service === selectedCategory
  );

 

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={()=> navigation.navigate('Portfolios', {item})}>
      <Image source={item.imageUrl} style={styles.image} />
      <Text style={styles.name}>{item.nom}</Text>
      <Text style={styles.service}>{item.service}</Text>
      <Text style={styles.experience}>{item.experience}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.categoriesContainer}
        style={styles.categoryScroll}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[styles.categoryButton, selectedCategory === category ? styles.selectedCategory : {}]}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        data={filteredData}
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
  categoriesContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0', 
  },
  categoryScroll: {
    marginBottom: 10, 
  },
  categoryButton: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal:10,
    height:40
  },
  selectedCategory: {
    backgroundColor: '#9EABA2', 
  },
  categoryText: {
    color: 'black',
    fontSize: 16,
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

export default Prestataires;