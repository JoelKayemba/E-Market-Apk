import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import TabNavigator from './TabNavigator';
import AjouterBoutique from '../CompteClient/Screen/AjouterBoutique';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Accueil"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Client"
        component={TabNavigator}
        options={{
          headerShown: true,
          title: 'Accueil',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#979797',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={focused ? 'tomato' : 'gray'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="AjouterBoutique"
        component={AjouterBoutique}
        options={{
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#979797',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="add-circle"
              size={size}
              color={focused ? 'tomato' : 'gray'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
