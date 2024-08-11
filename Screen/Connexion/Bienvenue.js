import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import Color from '../../Styles/Color';
import useAuth from '../../hook/useAuth';

const Bienvenue = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  //useAuth();

  const handlePress = (destination) => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      navigation.navigate(destination);
    }, 2000); 
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/imageBack/commencer.jpg')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Prêt à commencer?</Text>
          <Text style={styles.subtitle}>Trouvez et vendez en quelques clics seulement</Text>
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : null}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.leftButton]} onPress={() => handlePress('Connexion')}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.rightButton]} onPress={() => handlePress('InformationInscription')}>
            <Text style={styles.buttonText}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Bienvenue;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent pour le texte
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'InriaSerif',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%', 
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  leftButton: {
    marginRight: 5,
    backgroundColor: Color.bleuTransparent,
  },
  rightButton: {
    marginLeft: 0, 
    backgroundColor: Color.orangeTransparent,
  },
});
