import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Switch } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../component/Header';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Importation de l'icône pour la devise

const AccueilBoutique = ({ route, navigation }) => {
  const boutique = route.params?.boutique;
  const [isDeliveryEnabled, setIsDeliveryEnabled] = useState(false);

  // Fonction pour basculer le statut de la livraison
  const toggleDeliveryStatus = () => {
    setIsDeliveryEnabled((previousState) => !previousState);
  };

  return (
    <View style={styles.container}>
      {/* Ajout du Header */}
      <Header boutique={boutique} />

      {/* Switch pour changer le statut de la livraison */}
      <View style={styles.deliveryStatusContainer}>
        <Text style={styles.deliveryStatusText}>
          {isDeliveryEnabled ? 'Livraison Activée' : 'Livraison désactivée'}
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDeliveryEnabled ? '#1E90FF' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDeliveryStatus}
          value={isDeliveryEnabled}
        />
      </View>

      {/* Contenu de la page */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Section du Tableau de Bord */}
        <TouchableOpacity style={styles.section}>
          <Ionicons name="stats-chart" size={24} color="#007AFF" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Tableau de Bord</Text>
            <Text style={styles.subtitle}>Ventes Aujourd'hui: $500</Text>
            <Text style={styles.subtitle}>Commandes en Cours: 10</Text>
            <Text style={styles.subtitle}>Produits en Rupture de Stock: 3</Text>
          </View>
        </TouchableOpacity>

        {/* Section de Gestion des Produits */}
        <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('GestionProduits', { boutique })}>
          <MaterialIcons name="inventory" size={24} color="#34A853" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Gestion des Produits</Text>
            <Text style={styles.subtitle}>Ajouter un Nouveau Produit</Text>
            <Text style={styles.subtitle}>Liste des Produits</Text>
          </View>
        </TouchableOpacity>

        {/* Section pour Choisir la Devise */}
        <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Devises', { boutique })}>
          <FontAwesome name="money" size={24} color="#FF5722" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Choisir la Devise</Text>
            <Text style={styles.subtitle}>Sélectionnez votre devise préférée</Text>
          </View>
        </TouchableOpacity>

        {/* Section des Adresses */}
        <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Adresses', { boutique })}>
          <Ionicons name="location-outline" size={24} color="#FF5722" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Adresses</Text>
            <Text style={styles.subtitle}>Voir et Modifier l'Adresse de la Boutique</Text>
          </View>
        </TouchableOpacity>

        {/* Section des Évaluations et Commentaires */}
        <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Evaluations', { boutique })}>
          <AntDesign name="star" size={24} color="#FFD700" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Évaluations et Commentaires</Text>
            <Text style={styles.subtitle}>Voir les Avis des Clients</Text>
            <Text style={styles.subtitle}>Répondre aux Commentaires</Text>
          </View>
        </TouchableOpacity>

        {/* Section des Promotions */}
        <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Promotions', { boutique })}>
          <MaterialIcons name="local-offer" size={24} color="#E91E63" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Promotions</Text>
            <Text style={styles.subtitle}>Créer de Nouvelles Promotions</Text>
            <Text style={styles.subtitle}>Gérer les Offres Actuelles</Text>
          </View>
        </TouchableOpacity>

        {/* Section des Annonces */}
        <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('AddAnnonce', { boutique })}>
          <Ionicons name="megaphone-outline" size={24} color="#03A9F4" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Annonces</Text>
            <Text style={styles.subtitle}>Faire des Annonces Importantes</Text>
            <Text style={styles.subtitle}>Voir les Annonces Publiées</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AccueilBoutique;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  deliveryStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  deliveryStatusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  icon: {
    marginRight: 15,
    marginTop: 5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
});
