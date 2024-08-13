import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Color from '../../Styles/Color';

const ChatScreen = ({ route, navigation }) => {
  const { userName, userImage } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState(''); 

  useEffect(() => {
    setMessages([
      { id: '1', text: 'Salut! Comment ça va?', sender: 'Jane', timestamp: new Date().toLocaleTimeString() },
      { id: '2', text: 'Tout va bien, merci! Et toi?', sender: userName, timestamp: new Date().toLocaleTimeString() }
    ]);
  }, []);

  const sendMessage = () => {
    if (text.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: text.trim(),
        sender: userName,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages([...messages, newMessage]);
      setText('');
    }
  };

  const renderMessage = ({ item }) => {
    const isCurrentUser = item.sender === userName;
    return (
      <View style={[styles.messageContainer, isCurrentUser ? styles.currentUser : styles.otherUser]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timeStamp}>{item.timestamp}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtom}>
           <Ionicons name="chevron-back" size={30} color={Color.bleu} />
        </TouchableOpacity>
        <Image source={userImage} style={styles.userImage} />
        <Text style={styles.headerTitle}>{userName}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Écrire un message..."
        />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="send" size={24} color={Color.bleu} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    height:100,
    backgroundColor:'#9EABA2'
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color:Color.bleu,
    marginTop:40
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20, 
    marginRight: 0,
    marginLeft:10,
    marginTop:40
  },
  backButtom:{
    marginTop:40
  },
  messagesContainer: {
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 20,
    maxWidth: '80%'
  },
  currentUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#BDD1C5',
  },
  otherUser: {
    alignSelf: 'flex-start',
    backgroundColor: '#ccc',
  },
  messageText: {
    fontSize: 16,
  },
  timeStamp: {
    fontSize: 10,
    color: '#666',
    alignSelf: 'flex-end',
    marginTop: 5
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    height:70
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 20,
  }
});

export default ChatScreen;
