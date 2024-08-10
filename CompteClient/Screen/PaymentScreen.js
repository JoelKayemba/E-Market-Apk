import React from 'react';
import { View, Button, Alert, Linking } from 'react-native';
import Color from '../../Styles/Color';

const PaymentScreen = () => {

  const handlePayment = async () => {
    const paymentUrl = 'https://buy.stripe.com/test_00g5l2aY3ghF8Ra145';

    try {
      const supported = await Linking.canOpenURL(paymentUrl);

      if (supported) {
        await Linking.openURL(paymentUrl);
      } else {
        Alert.alert("Erreur", "Impossible d'ouvrir le lien de paiement.");
      }
    } catch (error) {
      Alert.alert("Erreur", "Une erreur est survenue lors de l'ouverture du lien de paiement.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Payer" onPress={handlePayment} color={Color.orange}/>
    </View>
  );
};

export default PaymentScreen;
