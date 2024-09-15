import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AccueilBoutique = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Section du Tableau de Bord */}
      <TouchableOpacity style={styles.section}>
        <Text style={styles.title}>Tableau de Bord</Text>
        <Text>Ventes Aujourd'hui: $500</Text>
        <Text>Commandes en Cours: 10</Text>
        <Text>Produits en Rupture de Stock: 3</Text>
      </TouchableOpacity>

      {/* Section de Gestion des Produits */}
      <TouchableOpacity style={styles.section}>
        <Text style={styles.title}>Gestion des Produits</Text>
        <Text>Ajouter un Nouveau Produit</Text>
        <Text>Liste des Produits</Text>
      </TouchableOpacity>

      {/* Section des Commandes */}
      <TouchableOpacity style={styles.section}>
        <Text style={styles.title}>Commandes et Livraisons</Text>
        <Text>Commandes en Cours</Text>
        <Text>Historique des Commandes</Text>
      </TouchableOpacity>

      {/* Section des Rapports */}
      <TouchableOpacity style={styles.section}>
        <Text style={styles.title}>Rapports</Text>
        <Text>Rapports de Vente</Text>
        <Text>Rapports de Performance</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default AccueilBoutique;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  section: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
