import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons ,AntDesign} from '@expo/vector-icons';
import Color from '../../Styles/Color';

const Portfolios = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color={Color.orange} />
      </TouchableOpacity>
      <Image source={item.imageUrl} style={styles.image} />
      <Text style={styles.name}>{item.nom}</Text>
      <Text style={styles.service}>{item.service}</Text>
      <Text style={styles.experience}>{item.experience} experience</Text>
      <View style={styles.contactInfo}>
        <View style={styles.contactItem}>
          <MaterialCommunityIcons name="email-outline" size={24} color={Color.bleu} />
          <Text style={styles.contactText}>{item.mail}</Text>
        </View>
        <View style={styles.contactItem}>
          <AntDesign name="linkedin-square" size={24} color="blue" />
          <Text style={styles.contactText}>{item.linkedin}</Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="call-outline" size={24} color='green' />
          <Text style={styles.contactText}>{item.telephone}</Text>
        </View>
      </View>
      <Text style={styles.descriptionTitle}>Description:</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.sectionTitle}>Education:</Text>
      {item.education.map((edu, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.eduTitle}>{edu.ecole}</Text>
          <Text>{edu.diplome} - {edu.annee}</Text>
        </View>
      ))}
      <Text style={styles.sectionTitle}>Projects:</Text>
      <FlatList
        horizontal
        data={item.projets}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.project}>
            <Image source={item.image} style={styles.projImage} />
            <Text style={styles.projTitle}>{item.titre}</Text>
            <Text style={styles.projDescription}>{item.description}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.contactButton}>
        <Text style={styles.contactButtonText}>Contacter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 0,
    marginTop:10
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginTop: 0,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  service: {
    fontSize: 20,
    color: 'grey',
    textAlign: 'center',
  },
  experience: {
    fontSize: 18,
    color: 'darkgrey',
    textAlign: 'center',
    marginBottom: 10,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 15,
    marginBottom: 10,
    fontFamily:'InriaSerif'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  section: {
    marginBottom: 10,
    
  },
  eduTitle: {
    fontSize: 16,
    fontWeight: '500', 
  },
  project: {
    marginRight: 15,
    width: 250,
  },
  projImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  projTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  projDescription: {
    fontSize: 14,
  },
  contactInfo: {
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    marginLeft: 10,
    fontSize: 14,
  },
  contactButton: {
    backgroundColor: Color.orange,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom:50
  },
  contactButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Portfolios;
