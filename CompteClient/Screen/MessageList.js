import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image ,Modal} from 'react-native';
import React from 'react';
import { AntDesign , Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Color from '../../Styles/Color';
import { Modalize } from 'react-native-modalize';

const MessageList = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [conversations, setConversations] = useState([
    { 
      id: '1', 
      name: 'John Doe', 
      lastMessage: 'salut man je t\'espere bien portant pour aujourd\'hui on abeaucoup de truc a faire', 
      image: require('../../assets/imageBack/a.jpg') ,
      messageNonlue:2,
      time: '5 min'
    },
    { 
      id: '2', 
      name: 'Jane Smith', 
      lastMessage: 'gros ca dit quoi', 
      image: require('../../assets/imageBack/b.jpg') ,
      messageNonlue:1,
      time: '10 min'
    },
    { 
      id: '3', 
      name: 'John Doe', 
      lastMessage: 'salut man je t\'espere bien portant pour aujourd\'hui on abeaucoup de truc a faire', 
      image: require('../../assets/imageBack/a.jpg') ,
      messageNonlue:0,
      time: '5 min'
    },
    { 
      id: '4', 
      name: 'Jane Smith', 
      lastMessage: 'gros ca dit quoi', 
      image: require('../../assets/imageBack/b.jpg') ,
      messageNonlue:1,
      time: '10 min'
    },
    { 
      id: '5', 
      name: 'John Doe', 
      lastMessage: 'salut man je t\'espere bien portant pour aujourd\'hui on abeaucoup de truc a faire', 
      image: require('../../assets/imageBack/a.jpg') ,
      messageNonlue:0,
      time: '5 min'
    },
    { 
      id: '6', 
      name: 'Jane Smith', 
      lastMessage: 'gros ca dit quoi', 
      image: require('../../assets/imageBack/b.jpg') ,
      messageNonlue:0,
      time: '10 min'
    },
    { 
      id: '7', 
      name: 'John Doe', 
      lastMessage: 'salut man je t\'espere bien portant pour aujourd\'hui on abeaucoup de truc a faire', 
      image: require('../../assets/imageBack/a.jpg') ,
      messageNonlue:2,
      time: '5 min'
    },
    { 
      id: '8', 
      name: 'Jane Smith', 
      lastMessage: 'gros ca dit quoi', 
      image: require('../../assets/imageBack/b.jpg') ,
      messageNonlue:1,
      time: '10 min'
    },
  ]);

  const truncateText = (text, maxLength = 60) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const openMenu = (item) => {
    setSelectedItem(item);
    setMenuVisible(true);
  };
  
  const closeMenu = () => {
    setMenuVisible(false);
    setSelectedItem(null);
  };
  
  const deleteConversation = () => {
    if (selectedItem) {
      setConversations(conversations.filter(conversation => conversation.id !== selectedItem.id));
      closeMenu();
    }
  };
  
  const renderMenu = () => {
    return (
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <TouchableOpacity style={styles.menuContainer} onPress={closeMenu}>
          <View style={styles.menuOptions}>
            <TouchableOpacity style={styles.menuOption} onPress={deleteConversation}>
              <Text style={styles.menuText}>Supprimer</Text>
            </TouchableOpacity>
            
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  
  

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.icones}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Color.bleu} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.loupe}>
          <AntDesign name="search1" size={24} color={Color.bleu} />
        </TouchableOpacity>
      </View>
     
      <Text style={styles.textMessage}>Messages</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        ListHeaderComponent={renderHeader}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('ChatScreen', { userName: item.name, userImage: item.image})}
            onLongPress={() => openMenu(item)}
          >
            <View style={styles.user}>
              <Image
                source={item.image} 
                style={styles.image}
              />
            </View>
            <View style={styles.containerMessage}>
              <View style={styles.messageContent}>
                <Text style={styles.userName}>{item.name}</Text>
                <View style={styles.containerLastMessage}>
                  <Text style={styles.lastMessage}>{truncateText(item.lastMessage)}</Text>
                </View>
              
              </View>
              <View>
                  <Text style={styles.time}>{item.time}</Text>
                  {item.messageNonlue > 0 && (
                    <View style={styles.containerNonlue}>
                      <Text style={styles.nonlue}>{item.messageNonlue}</Text>
                    </View>
                  )}
                  
              </View>

            </View>
            
          </TouchableOpacity>
        )}
        
        contentContainerStyle={styles.listContentContainer}
      />
      {renderMenu()}
    </View>
  );
};

export default MessageList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0
  },
  loupe: {
    marginRight: 20,
    marginTop: 40
  },
  backButton:{
    marginTop: 40,
    marginLeft:10
  },
  user: {
    height: 70,
    width: 70,
    alignItems: 'center',
    borderRadius: 50,
    justifyContent: 'center'
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 50
  },
  containerMessage:{
    flexDirection:'row'
  },
  textMessage: {
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 20,
    color: Color.bleu,
    marginTop:10
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,

    marginTop: 20
  },
  messageContent: {
    marginLeft: 0
  },
  userName: {
    fontWeight: 'bold',
    marginLeft:10,
    fontSize:20,
    color:Color.bleuTransparent
    
  },
  lastMessage: {
    color: '#666'
  },
  containerLastMessage:{
    marginHorizontal:10,
    width:250,
    marginTop:5
  },
  time:{
    marginRight:20,
    fontSize:10,
    marginTop:5,
    color:Color.bleuTransparent
  },
  containerNonlue:{
    height:20,
    width:20,
    backgroundColor:Color.bleu,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5,
    marginTop:10
  },
  nonlue:{
    color:'white',
    fontFamily:'InriaSerif'
  },
  listContentContainer: {
    paddingTop: 10
  },
  icones:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuOptions: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
  },
  menuOption: {
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 18,
    color: 'black',
  }
  
});
