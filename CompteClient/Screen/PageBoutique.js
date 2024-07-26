import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import Recherche from '../Component/Recherche';
import ClientStyle from '../../Styles/ClientStyle';

const Boutique = () => {
  return (
    <View>
      <View style={ClientStyle.containerRecherche}>
        <Recherche/>
      </View>
      
    </View>
  )
}

export default Boutique

const styles = StyleSheet.create({})