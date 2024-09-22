import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import AccueilBoutique from '../Screen/AccueilBoutique';
import GestionProduits from '../Screen/GestionProduits';
import Commandes from '../Screen/Commandes';
import Parametres from '../Screen/Parametres';


const Tab = createBottomTabNavigator();

const BoutiqueNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Accueil') {
            iconName = 'home-outline';
          } else if (route.name === 'Produits') {
            iconName = 'cube-outline';
          } else if (route.name === 'Commandes') {
            iconName = 'clipboard-outline';
          } else if (route.name === 'Paramètres') {
            iconName = 'settings-outline';
          } 

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Accueil" component={AccueilBoutique} options={{ headerShown: false }}/>
      <Tab.Screen name="Produits" component={GestionProduits} options={{ headerShown: false }}/>
      <Tab.Screen name="Commandes" component={Commandes} options={{ headerShown: false }}/>
      <Tab.Screen name="Paramètres" component={Parametres} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}

export default BoutiqueNavigator;
