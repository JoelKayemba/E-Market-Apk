import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons ,AntDesign } from '@expo/vector-icons';
import TabNavigator from './TabNavigator';
import AjouterBoutique from '../CompteClient/Screen/AjouterBoutique';
import CustomDrawerContent from './CustomDrawerContent';
import Color from '../Styles/Color';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Accueil"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Client"
        component={TabNavigator}
        options={{
          headerShown: true,
          title: 'Client',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: '#979797',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
          headerRight: () => (
            <View style={styles.iconContainer}>
               <View style={styles.iconContainer1}>
                  <TouchableOpacity onPress={() => alert('Messages')} style={styles.iconButton}>
                    <AntDesign
                      name="mail"
                      size={20}
                      color={Color.grisIcone}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.iconContainer2}>
                  <TouchableOpacity onPress={() => alert('Notifications')} style={styles.iconButton}>
                    <Ionicons
                      name="notifications-outline"
                      size={20}
                      color={Color.grisIcone}
                    />
                  </TouchableOpacity>
                </View>
            </View>
           
          
          ),
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={focused ? Color.orange : Color.grisIcone}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="AjouterBoutique"
        component={AjouterBoutique}
        options={{
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#979797',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="add-circle"
              size={size}
              color={focused ? 'tomato' : 'gray'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
const styles = {
  iconContainer: {
    flexDirection: 'row',
    marginRight: 10,
    marginBottom:10
    
    
  },
  iconButton: {
    alignItems:'center',
    justifyContent:'center',
    paddingTop:5
  },
  iconContainer1:{
    borderColor: Color.orange,
    borderRadius: 10,
    padding: 5,
    backgroundColor: 'white',
    marginHorizontal:10,
    borderWidth:1,
    borderColor:Color.bleu,
    height:40,
    width:40
  },
  iconContainer2:{
    borderColor: Color.orange,
    borderRadius: 10,
    padding: 5,
    backgroundColor: 'white',
    borderWidth:1,
    borderColor:Color.bleu,
    height:40,
    width:40
  }
};

export default DrawerNavigator;
