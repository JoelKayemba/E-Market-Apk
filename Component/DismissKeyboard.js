// pour cacher le clavier quand on clique en dehors du champ de clavier
import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;
