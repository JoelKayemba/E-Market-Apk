import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import DismissKeyboard from '../../Component/DismissKeyboard';
import GlobalStyles from '../../Styles/GlobalStyles';
import Color from '../../Styles/Color';
import IconTextInput from '../../Component/IconTextInput';

const ChangerMotDePasse = ({ route, navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://192.168.21.25:3300/sendEmail/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: route.params.email, password: newPassword }),
      });

      const result = await response.json();

      if (!response.ok) {
        Alert.alert('Erreur', result.message || 'Erreur lors du changement de mot de passe.');
        setLoading(false);
        return;
      }

      Alert.alert('Succès', 'Votre mot de passe a été changé avec succès.');
      navigation.navigate('Connexion');
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors du changement de mot de passe1.');
    }

    setLoading(false);
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View style={styles.containerTitre}>
          <Text style={styles.Titre}>Changer le Mot de Passe</Text>
        </View>
        <View style={GlobalStyles.containerInput}>
          <IconTextInput 
                iconName="lock"
                placeholder="Nouveau mot de passe"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
            <IconTextInput 
                iconName="lock"
                placeholder="Confirmer le mot de passe"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
         
        </View>
        <View style={GlobalStyles.containerConnexion}>
          <TouchableOpacity 
            style={GlobalStyles.buttonContainer} 
            onPress={handleChangePassword} 
            disabled={loading || !newPassword || !confirmPassword}
          >
            <View style={[GlobalStyles.button, loading && styles.loadingButton]}>
              <Text style={GlobalStyles.buttonText}>{loading ? 'Modification...' : 'Changer le mot de passe'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </DismissKeyboard>
  );
}

export default ChangerMotDePasse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 50,
  },
  loadingButton: {
    backgroundColor: Color.grisContainer,
  },
  containerTitre:{
    alignItems:'center'
  },
  Titre:{
    fontSize:24
  }
});
