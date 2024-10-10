import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontProvider } from './Component/FontContext';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import store from './Redux/store';



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
import Adresse from './CompteClient/Component/Adresse';
import CategorieProduit from './CompteClient/Screen/CategorieProduit';
import Deconnexion from './CompteClient/Component/Deconnexion';
import ConnexionLoading from './CompteClient/Component/ConnexionLoading';
import InscriptionLoading from './CompteClient/Component/InscriptionLoading';
import ModifierProfil from './CompteClient/Screen/ModifierProfil';
import PageProfil from './CompteClient/Screen/PageProfil';
import PaymentScreen from './CompteClient/Screen/PaymentScreen';
import MapScreen from './CompteClient/Screen/MapScreen';
import AjouterAnnonce from './CompteClient/Screen/AjouterAnnonce';
import Notifications from './CompteClient/Screen/Notifications';
import ChatScreen from './CompteClient/Screen/ChatScreen';
import MessageList from './CompteClient/Screen/MessageList';
import ChangerMotDePasse from './Screen/Connexion/ChangerMotDePasse';
import ModifierMotDePasse from './CompteClient/Component/ModifierMotDePasse';
import AjouterBoutique from './CompteBoutique/InscriptionBoutique/AjouterBoutique';
import BoutiqueCategorie from './CompteBoutique/InscriptionBoutique/BoutiqueCategorie';
import BoutiqueDescription from './CompteBoutique/InscriptionBoutique/BoutiqueDescription';
import BoutiqueImages from './CompteBoutique/InscriptionBoutique/BoutiqueImages';
import BoutiqueInfo from './CompteBoutique/InscriptionBoutique/BoutiqueInfo';
import AccueilBoutique from './CompteBoutique/Screen/AccueilBoutique';
import AjoutLoading from './CompteBoutique/component/ajoutLoading';
import PageMesServices from './CompteClient/Screen/PageMesServices';
import PageServices from './CompteClient/Screen/PageServices';
import Prestataires from './CompteClient/Screen/Prestataires';
import Portfolios from './CompteClient/Screen/Portfolios';
import InscriptionPres from './ComptePrestataire/screen/InscriptionPres';
import BoutiqueNavigator from './CompteBoutique/component/BoutiqueNavigator';
import GestionProduits from './CompteBoutique/Screen/GestionProduits';
import Commandes from './CompteBoutique/Screen/Commandes';
import NotificationsBoutique from './CompteBoutique/Screen/NotificationsBoutique';
import Messages from './CompteBoutique/Screen/Messages';
import Parametres from './CompteBoutique/Screen/Parametres';
import AjouterProduits from './CompteBoutique/component/AjouterProduits';
import { Provider } from 'react-redux';



const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
      <Provider store={store}>
        <GestureHandlerRootView >
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
            <Stack.Screen name="CategorieProduit" component={CategorieProduit} options={{ headerShown: false }}/>
            <Stack.Screen name="Deconnexion" component={Deconnexion} options={{ headerShown: false }}/>
            <Stack.Screen name="ConnexionLoading" component={ConnexionLoading} options={{ headerShown: false }}/>
            <Stack.Screen name="InscriptionLoading" component={InscriptionLoading} options={{ headerShown: false }}/>
            <Stack.Screen name="ModifierProfil" component={ModifierProfil} options={{ headerShown: false }}/>
            <Stack.Screen name="PageProfil" component={PageProfil} options={{ headerShown: false }}/>
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="AjouterAnnonce" component={AjouterAnnonce} options={{ headerShown: false }}/>
            <Stack.Screen name="MessageList" component={MessageList} options={{ headerShown: false }}/>
            <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }}/>
            <Stack.Screen name="ChangerMotDePasse" component={ChangerMotDePasse} options={{ headerShown: false }}/>
            <Stack.Screen name="ModifierMotDePasse" component={ModifierMotDePasse} options={{ headerShown: false }}/>
            <Stack.Screen name="AjouterBoutique" component={ AjouterBoutique} options={{ headerShown: false }}/>
            <Stack.Screen name="BoutiqueCategorie" component={BoutiqueCategorie} options={{ headerShown: false }}/>
            <Stack.Screen name="BoutiqueDescription" component={BoutiqueDescription} options={{ headerShown: false }}/>
            <Stack.Screen name="BoutiqueImages" component={BoutiqueImages} options={{ headerShown: false }}/>
            <Stack.Screen name="BoutiqueInfo" component={BoutiqueInfo} options={{ headerShown: false }}/>
            <Stack.Screen name="AccueilBoutique" component={AccueilBoutique} options={{ headerShown: false }}/>
            <Stack.Screen name="AjoutLoading" component={AjoutLoading} options={{ headerShown: false }}/>
            <Stack.Screen name="PageMesServices" component={PageMesServices} options={{ headerShown: false }}/>
            <Stack.Screen name="PageServices" component={PageServices} options={{ headerShown: false }}/>
            <Stack.Screen name="Prestataires" component={Prestataires} options={{ headerShown: false }}/>
            <Stack.Screen name="Portfolios" component={Portfolios} options={{ headerShown: false }}/>
            <Stack.Screen name="InscriptionPrestataire" component={InscriptionPres} options={{ headerShown: false }}/>
            <Stack.Screen name="BoutiqueNavigator" component={BoutiqueNavigator} options={{ headerShown: false }}/>
            <Stack.Screen name="GestionProduits" component={GestionProduits} options={{ headerShown: false }}/>
            <Stack.Screen name="Commandes" component={Commandes} options={{ headerShown: false }}/>
            <Stack.Screen name="Parametres" component={Parametres} options={{ headerShown: false }}/>
            <Stack.Screen name="NotificationsBoutique" component={NotificationsBoutique} options={{ headerShown: false }}/>
            <Stack.Screen name="Messages" component={Messages} options={{ headerShown: false }}/>
            <Stack.Screen name="AjouterProduits" component={AjouterProduits} options={{ headerShown: false }}/>

          </Stack.Navigator>
      </NavigationContainer>
      </FontProvider>
      </GestureHandlerRootView>
    </Provider>
    
   
    
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
