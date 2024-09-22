import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Commandes = () => {
  // Exemple de données pour les commandes
  const [orders, setOrders] = useState([
    { id: '1', customerName: 'John Doe', total: '$100', status: 'En cours', date: '2024-09-15' },
    { id: '2', customerName: 'Jane Smith', total: '$250', status: 'Expédiée', date: '2024-09-14' },
    { id: '3', customerName: 'Alice Johnson', total: '$150', status: 'Livrée', date: '2024-09-13' },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderId}>Commande #{item.id}</Text>
      <Text>Client: {item.customerName}</Text>
      <Text>Total: {item.total}</Text>
      <Text>Statut: {item.status}</Text>
      <Text>Date: {item.date}</Text>
      <View style={styles.actions}>
        <Button title="Voir Détails" onPress={() => viewOrderDetails(item.id)} />
        <Button title="Mettre à Jour" onPress={() => updateOrderStatus(item.id)} />
      </View>
    </View>
  );

  const viewOrderDetails = (id) => {
    // Logique pour afficher les détails de la commande
  };

  const updateOrderStatus = (id) => {
    // Logique pour mettre à jour le statut de la commande
  };

  return (
    <SafeAreaView style={styles.container}>
     
      <Text style={styles.title}>Liste des Commandes</Text>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
 
    </SafeAreaView>
    
  );
}

export default Commandes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign:'center'
  },
  orderItem: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
