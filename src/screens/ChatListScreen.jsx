import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChatListScreen = ({ navigation }) => {
  // Sample chat data
  const [chats, setChats] = useState([
    {
      id: '1',
      userName: 'John Doe',
      animalType: 'Goat - Jamunapari',
      animalPhoto: 'https://via.placeholder.com/50',
      lastMessage: 'Is the goat still available?',
      time: 'Just now',
      unreadCount: 2,
      isBuyer: true,
    },
    {
      id: '2',
      userName: 'Jane Smith',
      animalType: 'Cow - Holstein',
      animalPhoto: 'https://via.placeholder.com/50',
      lastMessage: 'Can you send more photos?',
      time: '1h ago',
      unreadCount: 0,
      isBuyer: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All'); // All, Buyers, Sellers, Unread

  // Filter chats based on search and tabs
  const filteredChats = chats.filter((chat) => {
    const matchesSearch =
      chat.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.animalType.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === 'All') return matchesSearch;
    if (filter === 'Buyers') return matchesSearch && chat.isBuyer;
    if (filter === 'Sellers') return matchesSearch && !chat.isBuyer;
    if (filter === 'Unread') return matchesSearch && chat.unreadCount > 0;
    return matchesSearch;
  });

  // Render each chat card
  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatCard}
      onPress={() =>
        navigation.navigate('Chat', {
          userName: item.userName,
          animalType: item.animalType,
          animalPhoto: item.animalPhoto,
        })
      }
    >
      <Image source={{ uri: item.animalPhoto }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.animalType}>🐄 {item.animalType}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
      <View style={styles.chatMeta}>
        <Text style={styles.time}>{item.time}</Text>
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Talk to Buyers & Sellers Instantly</Text>
        <Text style={styles.headerSubtitle}>
          View all your chats. Tap on a contact to continue the conversation.
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#A9A9A9" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or animal"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#A9A9A9"
        />
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {['All', 'Buyers', 'Sellers', 'Unread'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.filterTab, filter === tab && styles.filterTabActive]}
            onPress={() => setFilter(tab)}
          >
            <Text style={[styles.filterText, filter === tab && styles.filterTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chat List */}
      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC', // Light beige
  },
  header: {
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513', // Brown
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  filterTabActive: {
    backgroundColor: '#4CAF50', // Green
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  filterTextActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  chatList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  chatCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  animalType: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  lastMessage: {
    fontSize: 14,
    color: '#A9A9A9',
  },
  chatMeta: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 12,
    color: '#A9A9A9',
  },
  unreadBadge: {
    backgroundColor: '#FF6347',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 5,
  },
  unreadText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ChatListScreen;