import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

const IconTextInput = ({ iconName, iconType, placeholder, value, onChangeText, secureTextEntry, keyboardType }) => {
  let IconComponent = Entypo; 

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
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default IconTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    backgroundColor: '#DEDEDE',
    borderRadius: 50,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
});
