import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Color from '../Styles/Color';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.iconContainer}>
        <Ionicons name="menu" size={24} color={Color.grisIcone} />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    margin: 16,
    alignItems: 'center',
  },
});

export default CustomDrawerContent;
