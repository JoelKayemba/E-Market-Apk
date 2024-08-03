import { StyleSheet } from 'react-native';
import Color from './Color';

const GlobalStyles = StyleSheet.create({
    container:{
  
    },
    scrollViewContent: {
    },
    img: {
      width: '100%',
      height: 300,
    },
    img2:{
        width: '100%',
        height: 270,

    },
    containerTitre: {
      alignItems: 'center',
      marginTop:20,
      marginBottom: 20,
      marginHorizontal:20
    },
    Titre: {
      fontSize: 36,
      fontWeight: 'bold',
    },
    Titre2: {
      fontSize: 15,
      color: Color.grisSousTitre,
    },
    containerInput: {
      marginBottom: 20,
      marginTop:20,
      marginHorizontal:20
    },
   
    containerConnexion: {
      alignItems: 'center',
      marginHorizontal:20,
      marginTop:10
    },
    buttonContainer: {
      width: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 10,
      
     
    },
    button: {
      backgroundColor: Color.orange,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      height:50,
      
      
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontSize:20
    },
    forgotPasswordText: {
      color: Color.orange,
      marginBottom: 20,
      marginTop:20
    },
    inscriptionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inscriptionText: {
      marginRight: 5,
    },
    inscriptionLien: {
      color: Color.orange,
    },
    renvoiCodeContainer:{
      alignItems: 'center',
    },
    renvoiText:{
    fontSize: 15,
      color: Color.grisSousTitre,
    },
    renvoyerCode:{
        color: Color.orange,
    }
});

export default GlobalStyles;