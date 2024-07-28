import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontProvider } from './Component/FontContext';
import * as SplashScreen from 'expo-splash-screen';



import Bienvenue from './Screen/Connexion/Bienvenue';
import Connexion from './Screen/Connexion/Connexion';
import MotDePasseOublie from './Screen/Connexion/MotDePasseOublie';
import VerificationMotDePasse from './Screen/Connexion/VerificationMotDePasse';
import InformationInscription from './Screen/Inscription/InformationInscription';
import SkipPage from './Screen/Connexion/SkipPage';
import DrawerNavigator from './Component/DrawerNavigator';
import VerifierNumeroTelephone from './Screen/Inscription/VerifierNumeroTelephone';
import EnvoieCode from './Screen/Inscription/EnvoieCode';
import RechercheScreen from './CompteClient/Component/RechercheScreen';
import Recherche from './CompteClient/Component/Recherche';
import PageMaBoutique from './CompteClient/Screen/PageMaBoutique';
import ToutesLesBoutiques from './CompteClient/Component/ToutesLesBoutiques';


const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <FontProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='SkipPage'>
          <Stack.Screen name="SkipPage" component={SkipPage} options={{ headerShown: false }} />
          <Stack.Screen name="Bienvenue" component={Bienvenue} options={{ headerShown: false }} />
          <Stack.Screen name="Connexion" component={Connexion} options={{ headerShown: false }} />
          <Stack.Screen name="MotDePasseOublie" component={MotDePasseOublie} options={{ headerShown: false }} />
          <Stack.Screen name="VerificationMotDePasse" component={VerificationMotDePasse} options={{ headerShown: false }} />
          <Stack.Screen name="VerifierNumeroTelephone" component={VerifierNumeroTelephone} options={{ headerShown: false }} />
          <Stack.Screen name="EnvoieCode" component={EnvoieCode} options={{ headerShown: false }} />
          <Stack.Screen name="InformationInscription" component={InformationInscription} options={{ headerShown: false }} />
          <Stack.Screen name="Accueil" component={DrawerNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Recherche" component={Recherche} />
          <Stack.Screen name="RechercheScreen" component={RechercheScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="PageMaBoutique" component={PageMaBoutique} options={{headerShown: false}}/>
          <Stack.Screen name="ToutesLesBoutiques" component={ToutesLesBoutiques} options={{headerShown: false}}/>
        
        </Stack.Navigator>
    </NavigationContainer>
    </FontProvider>
    
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
