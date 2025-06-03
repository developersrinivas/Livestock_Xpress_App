import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';

const ChatScreen = ({ route, navigation }) => {
  const { userName, animalType, animalPhoto } = route.params;

  // Sample chat messages
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'other',
      text: 'Is the goat still available?',
      timestamp: '10:30 AM',
      status: 'read',
    },
    {
      id: '2',
      sender: 'user',
      text: 'Yes, it’s available! Do you want more photos?',
      timestamp: '10:32 AM',
      status: 'read',
    },
    {
      id: '3',
      sender: 'other',
      image: 'https://via.placeholder.com/200',
      timestamp: '10:35 AM',
      status: 'delivered',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const quickReplies = ['Still available?', 'Final price?'];

  // Simulate typing indicator
  useEffect(() => {
    const interval = setInterval(() => {
      setTyping((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Send message
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const newMsg = {
      id: (messages.length + 1).toString(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  // Send image
  const pickImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const newImage = response.assets[0].uri;
        const newMsg = {
          id: (messages.length + 1).toString(),
          sender: 'user',
          image: newImage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'sent',
        };
        setMessages([...messages, newMsg]);
      }
    });
  };

  // Render chat bubbles
  const renderMessage = ({ item }) => (
    <>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
      <View
        style={[
          styles.messageBubble,
          item.sender === 'user' ? styles.userBubble : styles.otherBubble,
        ]}
      >
        {item.text ? (
          <Text style={styles.messageText}>{item.text}</Text>
        ) : (
          <TouchableOpacity onPress={() => { setSelectedImage(item.image); setModalVisible(true); }}>
            <Image source={{ uri: item.image }} style={styles.messageImage} />
          </TouchableOpacity>
        )}
        {item.sender === 'user' && (
          <Text style={styles.messageStatus}>
            {item.status === 'sent' ? '✓' : item.status === 'delivered' ? '✓✓' : '✓✓'}
          </Text>
        )}
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#8B4513" />
        </TouchableOpacity>
        <Image source={{ uri: animalPhoto }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Chat with {userName}</Text>
          <Text style={styles.animalType}>🐄 {animalType}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="#8B4513" />
        </TouchableOpacity>
      </View>

      {/* Chat Area */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatArea}
        inverted
      />
      {typing && <Text style={styles.typingIndicator}>{userName} is typing…</Text>}

      {/* Quick Replies */}
      <View style={styles.quickReplies}>
        {quickReplies.map((reply, index) => (
          <TouchableOpacity
            key={index}
            style={styles.quickReplyButton}
            onPress={() => setNewMessage(reply)}
          >
            <Text style={styles.quickReplyText}>{reply}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Ionicons name="attach" size={24} color="#8B4513" style={styles.attachIcon} />
        </TouchableOpacity>
        <TextInput
          style={styles.messageInput}
          placeholder="Type your message…"
          value={newMessage}
          onChangeText={setNewMessage}
          placeholderTextColor="#A9A9A9"
        />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="send" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Image Modal */}
      <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeModal} onPress={() => setModalVisible(false)}>
            <Ionicons name="close" size={30} color="#FFF" />
          </TouchableOpacity>
          {selectedImage && <Image source={{ uri: selectedImage }} style={styles.fullImage} />}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC', // Light beige
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  animalType: {
    fontSize: 14,
    color: '#666',
  },
  chatArea: {
    padding: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#A9A9A9',
    textAlign: 'center',
    marginVertical: 5,
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
  },
  userBubble: {
    backgroundColor: '#4CAF50', // Green for user
    alignSelf: 'flex-end',
  },
  otherBubble: {
    backgroundColor: '#FFF',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  messageText: {
    fontSize: 16,
    color: '#FFF',
  },
  messageImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  messageStatus: {
    fontSize: 12,
    color: '#FFF',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  typingIndicator: {
    fontSize: 14,
    color: '#666',
    marginLeft: 16,
    marginBottom: 5,
  },
  quickReplies: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  quickReplyButton: {
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    elevation: 2,
  },
  quickReplyText: {
    fontSize: 14,
    color: '#8B4513',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  attachIcon: {
    marginRight: 10,
  },
  messageInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeModal: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  fullImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
});

export default ChatScreen;