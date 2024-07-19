import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const Accueil = ({ navigation}) => {
  return (
    <View style={styles.container}>
    <Text>Accueil</Text>
  </View>
  )
}

export default Accueil

const styles = StyleSheet.create({})