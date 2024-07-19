import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Accueil from '../CompteClient/Screen/Accueil';
import Boutique from '../CompteClient/Screen/Boutique';
import Panier from '../CompteClient/Screen/Panier';
import Profil from '../CompteClient/Screen/Profil';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Accueil') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Boutique') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Panier') {
            iconName = focused ? 'basket' : 'basket-outline';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Accueil" component={Accueil} options={{ headerShown: false }} />
      <Tab.Screen name="Boutique" component={Boutique} options={{ headerShown: false }} />
      <Tab.Screen name="Panier" component={Panier} options={{ headerShown: false }} />
      <Tab.Screen name="Profil" component={Profil} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
