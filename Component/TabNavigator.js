import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import Accueil from '../CompteClient/Screen/Accueil';
import Boutique from '../CompteClient/Screen/Boutique';
import Panier from '../CompteClient/Screen/Panier';
import Profil from '../CompteClient/Screen/Profil';
import Color from '../Styles/Color';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent;

          // Déterminer quel composant d'icône utiliser en fonction du nom de la route
          if (route.name === 'Accueil') {
            iconName = focused ? 'home' : 'home-outline';
            IconComponent = Ionicons;
          } else if (route.name === 'Boutique') {
            iconName = focused ? 'shop' : 'shop';
            IconComponent = Entypo; 
          } else if (route.name === 'Panier') {
            iconName = focused ? 'cart' : 'cart-outline';
            IconComponent = Ionicons;
          } else if (route.name === 'Profil') {
            iconName = focused ? 'user' : 'user';
            IconComponent = AntDesign; 
          }

          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Color.orange,
        tabBarInactiveTintColor: Color.grisIcone,
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
