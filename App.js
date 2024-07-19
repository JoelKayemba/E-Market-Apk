import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Bienvenue from './Screen/Connexion/Bienvenue';
import Connexion from './Screen/Connexion/Connexion';
import MotDePasseOublie from './Screen/Connexion/MotDePasseOublie';
import VerificationMotDePasse from './Screen/Connexion/VerificationMotDePasse';
import InformationInscription from './Screen/Inscription/InformationInscription';
import AdresseInscription from './Screen/Inscription/AdresseInscription';
import SkipPage from './Screen/Connexion/SkipPage';
import DrawerNavigator from './Component/DrawerNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SkipPage'>
        <Stack.Screen name="SkipPage" component={SkipPage} options={{ headerShown: false }} />
        <Stack.Screen name="Bienvenue" component={Bienvenue} options={{ headerShown: false }} />
        <Stack.Screen name="Connexion" component={Connexion} options={{ headerShown: false }} />
        <Stack.Screen name="MotDePasseOublie" component={MotDePasseOublie} options={{ headerShown: false }} />
        <Stack.Screen name="VerificationMotDePasse" component={VerificationMotDePasse} options={{ headerShown: false }} />
        <Stack.Screen name="InformationInscription" component={InformationInscription} options={{ headerShown: false }} />
        <Stack.Screen name="AdresseInscription" component={AdresseInscription} options={{ headerShown: false }} />
        <Stack.Screen name="Accueil" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
