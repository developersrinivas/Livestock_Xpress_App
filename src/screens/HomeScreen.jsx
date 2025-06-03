import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SectionList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
  // Sample data
  const categories = [
    { id: '1', name: 'Cow', icon: '🐄' },
    { id: '2', name: 'Buffalo', icon: '🐃' },
    { id: '3', name: 'Goat', icon: '🐐' },
    { id: '4', name: 'Sheep', icon: '🐏' },
    { id: '5', name: 'Pig', icon: '🐖' },
    { id: '6', name: 'Hen', icon: '🐓' },
  ];

  const featuredListings = [
    {
      id: '1',
      name: 'Brown Cow',
      breed: 'Holstein',
      price: 25000,
      image: 'https://via.placeholder.com/150',
      isVerified: true,
    },
    {
      id: '2',
      name: 'White Goat',
      breed: 'Jamunapari',
      price: 5000,
      image: 'https://via.placeholder.com/150',
      isVerified: false,
    },
  ];

  const nearbyAnimals = [
    {
      id: '1',
      name: 'Black Sheep',
      price: 3000,
      location: '5 km away',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: 'Brown Horse',
      price: 15000,
      location: '10 km away',
      image: 'https://via.placeholder.com/150',
    },
  ];

  const recentlyPosted = [
    {
      id: '1',
      name: 'White Hen',
      price: 200,
      location: '2 km away',
      image: 'https://via.placeholder.com/150',
      time: '2h ago',
    },
    {
      id: '2',
      name: 'Black Pig',
      price: 4000,
      location: '8 km away',
      image: 'https://via.placeholder.com/150',
      time: '5h ago',
    },
  ];

  // Render category item
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <View style={styles.categoryIconContainer}>
        <Text style={styles.categoryIcon}>{item.icon}</Text>
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Render featured listing item
  const renderFeaturedItem = ({ item }) => (
    <View style={styles.featuredCard}>
      <Image source={{ uri: item.image }} style={styles.featuredImage} />
      <Text style={styles.featuredName}>{item.name} - {item.breed}</Text>
      <Text style={styles.featuredPrice}>₹{item.price}</Text>
      {item.isVerified && (
        <View style={styles.verifiedBadge}>
          <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
          <Text style={styles.verifiedText}>Verified Seller</Text>
        </View>
      )}
      <TouchableOpacity style={styles.viewDetailsButton}>
        <Text style={styles.viewDetailsText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  // Render nearby/recently posted item
  const renderAnimalItem = ({ item }) => (
    <View style={styles.animalCard}>
      <Image source={{ uri: item.image }} style={styles.animalImage} />
      <View style={styles.animalInfo}>
        <Text style={styles.animalName}>{item.name}</Text>
        <Text style={styles.animalPrice}>₹{item.price}</Text>
        <Text style={styles.animalLocation}>📍 {item.location}</Text>
        {item.time && <Text style={styles.animalTime}>🕐 {item.time}</Text>}
      </View>
      <View style={styles.animalActions}>
        <TouchableOpacity style={styles.actionIcon}>
          <Ionicons name="call" size={20} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => navigation.navigate('Messages', { screen: 'ChatList' })}
        >
          <Ionicons name="chatbubble" size={20} color="#4CAF50" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // SectionList data
  const sections = [
    {
      title: 'Welcome & Search',
      data: [{}],
      renderItem: () => (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Find your perfect livestock – Cows, Buffaloes, Goats & more!
          </Text>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#A9A9A9" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by animal, price, location..."
              placeholderTextColor="#A9A9A9"
            />
            <TouchableOpacity style={styles.voiceSearchIcon}>
              <Ionicons name="mic" size={20} color="#A9A9A9" />
            </TouchableOpacity>
          </View>
        </View>
      ),
    },
    {
      title: '🗂️ Categories',
      data: [{}],
      renderItem: () => (
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
      ),
      footer: () => (
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All →</Text>
        </TouchableOpacity>
      ),
    },
    {
      title: '🏷️ Featured Listings',
      data: [{}],
      renderItem: () => (
        <View>
          <Text style={styles.subSectionPrompt}>Featured Animals – Quick Sale, Top Visibility!</Text>
          <FlatList
            data={featuredListings}
            renderItem={renderFeaturedItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>
      ),
    },
    {
      title: '📍 Animals Near You',
      data: nearbyAnimals,
      renderItem: renderAnimalItem,
    },
    {
      title: '🆕 Recently Posted',
      data: recentlyPosted,
      renderItem: renderAnimalItem,
    },
    {
      title: '🎁 Referral & Promotion',
      data: [{}],
      renderItem: () => (
        <View>
          <View style={styles.referralCard}>
            <Text style={styles.referralText}>Refer 5 friends & earn ₹20 cashback!</Text>
            <TouchableOpacity style={styles.referButton}>
              <Text style={styles.referButtonText}>Refer Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.promotionCard}>
            <Text style={styles.promotionText}>Become a Verified Seller</Text>
            <TouchableOpacity style={styles.promotionButton}>
              <Text style={styles.promotionButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      ),
    },
  ];

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => item.id || index.toString()}
      renderSectionHeader={({ section: { title } }) =>
        title !== 'Welcome & Search' ? (
          <Text style={styles.sectionTitle}>{title}</Text>
        ) : null
      }
      renderSectionFooter={({ section }) =>
        section.footer ? section.footer() : null
      }
      contentContainerStyle={styles.sectionListContainer}
      stickySectionHeadersEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  sectionListContainer: {
    backgroundColor: '#F5F5DC', // Light beige
    paddingBottom: 20,
  },
  welcomeContainer: {
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
  voiceSearchIcon: {
    padding: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  categoryList: {
    paddingHorizontal: 16,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 15,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryIcon: {
    fontSize: 30,
  },
  categoryName: {
    fontSize: 14,
    color: '#333',
  },
  viewAllButton: {
    marginHorizontal: 16,
    marginTop: 10,
  },
  viewAllText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  subSectionPrompt: {
    fontSize: 16,
    color: '#666',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  featuredList: {
    paddingHorizontal: 16,
  },
  featuredCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    width: 200,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  featuredImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },
  featuredName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  featuredPrice: {
    fontSize: 14,
    color: '#8B4513',
    marginTop: 5,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  verifiedText: {
    fontSize: 12,
    color: '#4CAF50',
    marginLeft: 5,
  },
  viewDetailsButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  viewDetailsText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
  },
  animalCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 16,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  animalImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  animalInfo: {
    flex: 1,
  },
  animalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  animalPrice: {
    fontSize: 14,
    color: '#8B4513',
    marginTop: 5,
  },
  animalLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  animalTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  animalActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginLeft: 10,
  },
  referralCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
  },
  referralText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  referButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  referButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  promotionCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
  },
  promotionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  promotionButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  promotionButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default HomeScreen;