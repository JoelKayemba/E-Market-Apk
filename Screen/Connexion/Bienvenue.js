import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Video } from 'expo-av';
import Color from '../../Styles/Color';

const Bienvenue = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Connexion');
    }, 2000); 
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('../../assets/Videos/VdBienvenue.mp4')} 
        style={styles.backgroundVideo}
        resizeMode="cover"
        isLooping
        shouldPlay
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Bienvenue sur E-Market, votre marché en ligne de référence</Text>
        <Text style={styles.subtitle}>Trouvez et vendez en quelques clics seulement</Text>
        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <TouchableOpacity style={styles.buttonContainer} onPress={handlePress}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Commencer</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Bienvenue;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent pour le texte
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily:'InriaSerif'
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%', // Largeur du conteneur de bouton pour occuper la largeur disponible
    borderRadius: 50,
    overflow: 'hidden', // Assure que le contenu du TouchableOpacity reste visible
  },
  button: {
    backgroundColor: Color.orange,
    paddingVertical: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
