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
import VerifierNumeroTelephone from './Screen/Inscription/VerifierNumeroTelephone';
import EnvoieCode from './Screen/Inscription/EnvoieCode';
import RechercheScreen from './CompteClient/Component/RechercheScreen';
import Recherche from './CompteClient/Component/Recherche';
import PageMaBoutique from './CompteClient/Screen/PageMaBoutique';
import ToutesLesBoutiques from './CompteClient/Component/ToutesLesBoutiques';
import MeilleursBoutique from './CompteClient/Component/MeilleursBoutique';
import BoutiquePourToi from './CompteClient/Component/BoutiquePourToi';
import BoutiqueProche from './CompteClient/Component/BoutiqueProche';
import PageMonProduit from './CompteClient/Screen/PageMonProduit';
import PagePanier from './CompteClient/Screen/PagePanier';
import Accueil from './CompteClient/Screen/Accueil';
import TabNavigator from './Component/TabNavigator';
import AuthLoadingScreen from './CompteClient/Component/AuthLoadingScreen';
import MapPicker from './Component/MapPicker';
import Adresse from './CompteClient/Component/Adresse';
import CategorieProduit from './CompteClient/Screen/CategorieProduit';
import Deconnexion from './CompteClient/Component/Deconnexion';
import ConnexionLoading from './CompteClient/Component/ConnexionLoading';
import InscriptionLoading from './CompteClient/Component/InscriptionLoading';





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
          <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Accueil" component={Accueil} options={{ headerShown: false }} />
          <Stack.Screen name="Recherche" component={Recherche} />
          <Stack.Screen name="RechercheScreen" component={RechercheScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="ToutesLesBoutiques" component={ToutesLesBoutiques} options={{headerShown: false}}/>
          <Stack.Screen name="MeilleursBoutique" component={MeilleursBoutique} options={{headerShown: false}}/>
          <Stack.Screen name="BoutiquePourToi" component={BoutiquePourToi} options={{headerShown: false}}/>
          <Stack.Screen name="BoutiqueProche" component={BoutiqueProche} options={{headerShown: false}}/>
          <Stack.Screen name="PageMaBoutique" component={PageMaBoutique} options={{headerShown: false}}/>
          <Stack.Screen name="PageMonProduit" component={PageMonProduit} options={{headerShown: false}}/>
          <Stack.Screen name="PagePanier" component={PagePanier} options={{headerShown: false}}/>
          <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Adresse" component={Adresse} options={{ headerShown: false }}/>
          <Stack.Screen name="MapPicker" component={MapPicker} options={{ headerShown: false }}/>
          <Stack.Screen name="CategorieProduit" component={CategorieProduit} options={{ headerShown: false }}/>
          <Stack.Screen name="Deconnexion" component={Deconnexion} options={{ headerShown: false }}/>
          <Stack.Screen name="ConnexionLoading" component={ConnexionLoading} options={{ headerShown: false }}/>
          <Stack.Screen name="InscriptionLoading" component={InscriptionLoading} options={{ headerShown: false }}/>
          
        
        
        
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
