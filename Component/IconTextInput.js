// page pour le text input avec icone a cote

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Entypo, FontAwesome, MaterialIcons, MaterialCommunityIcons, AntDesign, Feather, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import Color from '../Styles/Color';

const IconTextInput = ({ iconName, iconType, placeholder, value, onChangeText, secureTextEntry, keyboardType }) => {
  const [showPassword, setShowPassword] = useState(false);

  let IconComponent = Entypo;
  let VisibilityIcon = showPassword ? 'eye-off' : 'eye'; 

  switch (iconType) {
    case 'ionicons':
      IconComponent = Ionicons;
      break;
    case 'fontawesome':
      IconComponent = FontAwesome;
      break;
    case 'materialicons':
      IconComponent = MaterialIcons;
      break;
    case 'materialcommunityicons':
      IconComponent = MaterialCommunityIcons;
      break;
    case 'antdesign':
      IconComponent = AntDesign;
      break;
    case 'feather':
      IconComponent = Feather;
      break;
    case 'fontawesome5':
      IconComponent = FontAwesome5;
      break;
    case 'fontawesome6':
      IconComponent = FontAwesome6;
      break;
    default:
      IconComponent = Entypo;
  }

  return (
    <View style={styles.inputContainer}>
      <IconComponent name={iconName} size={30} color="#979797" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !showPassword}
        keyboardType={keyboardType}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.visibilityIcon}>
          <Ionicons name={VisibilityIcon} size={30} color="#979797" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default IconTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Color.bleu,
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  visibilityIcon: {
    marginLeft: 10,
  },
});
