import { StyleSheet, Text, View, Switch, Button, ScrollView } from 'react-native';
import React, { useState } from 'react';

const Parametres = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleNotifications = () => setNotificationsEnabled(previousState => !previousState);
  const toggleTheme = () => setDarkTheme(previousState => !previousState);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Compte</Text>
        <Button title="Modifier le Profil" onPress={() => { /* Logique pour modifier le profil */ }} />
        <Button title="Changer le Mot de Passe" onPress={() => { /* Logique pour changer le mot de passe */ }} />
        <Button title="Déconnexion" onPress={() => { /* Logique pour se déconnecter */ }} color="red" />
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Boutique</Text>
        <Button title="Modifier le Nom de la Boutique" onPress={() => { /* Logique pour modifier le nom */ }} />
        <Button title="Modifier l'Adresse" onPress={() => { /* Logique pour modifier l'adresse */ }} />
        <Button title="Modes de Paiement" onPress={() => { /* Logique pour modifier les modes de paiement */ }} />
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.setting}>
          <Text>Activer les Notifications</Text>
          <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Préférences</Text>
        <View style={styles.setting}>
          <Text>Thème Sombre</Text>
          <Switch value={darkTheme} onValueChange={toggleTheme} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Sécurité</Text>
        <Button title="Vérification en Deux Étapes" onPress={() => { /* Logique pour activer la 2FA */ }} />
        <Button title="Supprimer le Compte" onPress={() => { /* Logique pour supprimer le compte */ }} color="red" />
      </View>
    </ScrollView>
  );
}

export default Parametres;

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
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
});
