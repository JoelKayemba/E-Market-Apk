import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity ,Text } from 'react-native';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import Accueil from '../CompteClient/Screen/Accueil';
import Boutique from '../CompteClient/Screen/PageBoutique';
import Panier from '../CompteClient/Screen/PagePanier';
import Profil from '../CompteClient/Screen/PageProfil';
import Annonce from '../CompteClient/Screen/Annonce';
import Color from '../Styles/Color';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent;

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
          } else if (route.name === 'Annonce') {
            iconName = 'megaphone';
            IconComponent = Entypo;
          }

          
          const activeColor = navigation.getState().index === 2 ? '#fff' : color;

          return <IconComponent name={iconName} size={size} color={activeColor} />;
        },
        tabBarLabel: ({ focused, color }) => {
          const activeColor = navigation.getState().index === 2 ? '#fff' : color;
          let label;

          if (route.name === 'Accueil') {
            label = 'Accueil';
          } else if (route.name === 'Boutique') {
            label = 'Boutique';
          } else if (route.name === 'Panier') {
            label = 'Panier';
          } else if (route.name === 'Profil') {
            label = 'Profil';
          } 

          return (
            <Text style={{ color: activeColor, fontSize: 10 }}>
              {label}
            </Text>
          );
        },
        tabBarActiveTintColor: Color.orange,
        tabBarInactiveTintColor: Color.grisIcone,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          justifyContent: 'center',
          paddingBottom: 20,
        },
      })}
    >
      <Tab.Screen name="Accueil" component={Accueil} options={{ headerShown: false }} />
      <Tab.Screen name="Boutique" component={Boutique} options={{ headerShown: false }} />
      <Tab.Screen
        name="Annonce"
        component={Annonce}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Entypo
              name="megaphone" 
              size={size}
              color="#fff" 
              style={{ backgroundColor: Color.bleu, borderRadius: 50, padding: 10 }}
            />
          ),
          tabBarLabel: () => null, 
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={{
                top: -30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Color.bleu,
                borderRadius: 50,
                width: 70,
                height: 70,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.25,
                shadowRadius: 3.5,
              }}
            >
              {props.children}
            </TouchableOpacity>
          ),
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: '#00000099', 
            borderTopWidth: 0, 
            elevation: 0, 
          },
        }}
      />
      <Tab.Screen name="Panier" component={Panier} options={{ headerShown: false }} />
      <Tab.Screen name="Profil" component={Profil} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  
});

export default TabNavigator;
