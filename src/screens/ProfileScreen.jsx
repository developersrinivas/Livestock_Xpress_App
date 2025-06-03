import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SectionList,
  StyleSheet,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  // Sample user data
  const [user, setUser] = useState({
    name: 'Srinivas',
    phone: '+91-9876543210',
    location: 'Jangareddygudem, Andhra Pradesh',
    isVerified: false,
    profilePhoto: null,
  });

  // Sample listings data
  const [listings, setListings] = useState([
    {
      id: '1',
      animalType: 'Goat - Jamunapari',
      price: 5000,
      status: 'Active',
    },
    {
      id: '2',
      animalType: 'Cow - Holstein',
      price: 25000,
      status: 'Sold',
    },
  ]);

  // Sample purchased contacts and wishlist
  const purchasedContacts = 5;
  const savedAnimals = 3;
  const paymentHistory = [
    { id: '1', description: 'Verified Seller Badge', amount: 199, date: '2025-05-01' },
  ];

  // Handlers
  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'This feature would allow editing name, phone, and location.');
  };

  const handleEditListing = (id) => {
    Alert.alert('Edit Listing', `Editing listing with ID: ${id}`);
  };

  const handleDeleteListing = (id) => {
    Alert.alert('Delete Listing', 'Are you sure you want to delete this listing?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setListings(listings.filter((listing) => listing.id !== id)),
      },
    ]);
  };

  const logoutAndNavigate = async () => {
    try {
      console.log('Logging out...');
      await AsyncStorage.removeItem('user');
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: logoutAndNavigate,
      },
    ]);
  };

  const handleLanguageSettings = () => {
    Alert.alert('Language Settings', 'This feature would allow changing the app language.');
  };

  const handleContactSupport = () => {
    Alert.alert('Contact Support', 'This feature would allow contacting support via email or chat.');
  };

  const handleTermsAndConditions = () => {
    Alert.alert('Terms & Conditions', 'This feature would display the app\'s terms and conditions.');
  };

  const handleBecomeVerified = () => {
    Alert.alert('Become Verified', 'Proceed to payment of ₹199/year to become a Verified Seller?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Proceed',
        onPress: () => setUser({ ...user, isVerified: true }),
      },
    ]);
  };

  const handleAddNewAnimal = () => {
    navigation.navigate('Sell');
  };

  // Render listing item
  const renderListingItem = ({ item }) => (
    <View style={styles.listingCard}>
      <View style={styles.listingInfo}>
        <Text style={styles.listingType}>🐄 {item.animalType}</Text>
        <Text style={styles.listingPrice}>₹{item.price}</Text>
        <Text style={[styles.listingStatus, item.status === 'Sold' && styles.statusSold]}>
          {item.status}
        </Text>
      </View>
      <View style={styles.listingActions}>
        <TouchableOpacity onPress={() => handleEditListing(item.id)} style={styles.actionButton}>
          <Ionicons name="pencil" size={20} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteListing(item.id)} style={styles.actionButton}>
          <Ionicons name="trash" size={20} color="#FF6347" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // SectionList data
  const sections = [
    {
      title: 'Header',
      data: [{}],
      renderItem: () => (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Profile – Build Trust & Track Your Activity</Text>
          <Text style={styles.headerSubtitle}>
            Update your information, manage your listings, and become a Verified Seller.
          </Text>
        </View>
      ),
    },
    {
      title: 'User Info',
      data: [{}],
      renderItem: () => (
        <View style={styles.userInfoCard}>
          {user.profilePhoto ? (
            <Image source={{ uri: user.profilePhoto }} style={styles.profilePhoto} />
          ) : (
            <View style={styles.profilePhotoPlaceholder}>
              <Ionicons name="person" size={40} color="#A9A9A9" />
            </View>
          )}
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userPhone}>📞 {user.phone}</Text>
            <Text style={styles.userLocation}>📍 {user.location}</Text>
            {user.isVerified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                <Text style={styles.verifiedText}>Verified Seller</Text>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Ionicons name="pencil" size={20} color="#8B4513" />
          </TouchableOpacity>
        </View>
      ),
    },
    {
      title: '📦 My Animal Posts',
      data: listings.length > 0 ? listings : [{ id: 'empty', type: 'empty' }],
      renderItem: ({ item }) =>
        item.type === 'empty' ? (
          <Text style={styles.emptyText}>No listings available</Text>
        ) : (
          renderListingItem({ item })
        ),
      footer: () => (
        <TouchableOpacity style={styles.addButton} onPress={handleAddNewAnimal}>
          <Ionicons name="add" size={20} color="#FFF" />
          <Text style={styles.addButtonText}>Add New Animal</Text>
        </TouchableOpacity>
      ),
    },
    {
      title: '💳 My Purchases & Contacts',
      data: [{}],
      renderItem: () => (
        <View>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{purchasedContacts}</Text>
              <Text style={styles.statLabel}>Purchased Contacts</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{savedAnimals}</Text>
              <Text style={styles.statLabel}>Saved Animals</Text>
            </View>
          </View>
          {paymentHistory.length > 0 && (
            <View style={styles.paymentHistory}>
              <Text style={styles.subSectionTitle}>Payment History</Text>
              {paymentHistory.map((payment) => (
                <View key={payment.id} style={styles.paymentItem}>
                  <Text style={styles.paymentDescription}>{payment.description}</Text>
                  <Text style={styles.paymentAmount}>₹{payment.amount}</Text>
                  <Text style={styles.paymentDate}>{payment.date}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ),
    },
    ...(user.isVerified
      ? []
      : [
          {
            title: 'Verification',
            data: [{}],
            renderItem: () => (
              <View style={styles.verificationCard}>
                <Text style={styles.verificationText}>
                  Get Verified for ₹199/year & boost your trust
                </Text>
                <TouchableOpacity style={styles.verifyButton} onPress={handleBecomeVerified}>
                  <Text style={styles.verifyButtonText}>Become Verified</Text>
                </TouchableOpacity>
              </View>
            ),
          },
        ]),
    {
      title: '⚙️ Settings & Support',
      data: ['Language Settings', 'Contact Support / Help', 'Terms & Conditions', 'Logout'],
      renderItem: ({ item }) => (
        <TouchableOpacity
          style={[styles.settingsItem, item === 'Logout' && styles.logoutButton]}
          onPress={
            item === 'Language Settings'
              ? handleLanguageSettings
              : item === 'Contact Support / Help'
              ? handleContactSupport
              : item === 'Terms & Conditions'
              ? handleTermsAndConditions
              : handleLogout
          }
        >
          <Ionicons
            name={
              item === 'Language Settings'
                ? 'globe'
                : item === 'Contact Support / Help'
                ? 'mail'
                : item === 'Terms & Conditions'
                ? 'document-text'
                : 'log-out'
            }
            size={20}
            color={item === 'Logout' ? '#FF6347' : '#8B4513'}
            style={styles.settingsIcon}
          />
          <Text style={[styles.settingsText, item === 'Logout' && { color: '#FF6347' }]}>
            {item}
          </Text>
        </TouchableOpacity>
      ),
    },
  ];

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => item.id || index.toString()}
      renderSectionHeader={({ section: { title } }) =>
        title !== 'Header' && title !== 'User Info' ? (
          <Text style={styles.sectionTitle}>{title}</Text>
        ) : null
      }
      renderSectionFooter={({ section }) => (section.footer ? section.footer() : null)}
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
    color: '#8B4513',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  userInfoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    margin: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profilePhotoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  userLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  verifiedText: {
    fontSize: 14,
    color: '#4CAF50',
    marginLeft: 5,
  },
  editButton: {
    padding: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  listingCard: {
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
  listingInfo: {
    flex: 1,
  },
  listingType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  listingPrice: {
    fontSize: 14,
    color: '#8B4513',
    marginTop: 5,
  },
  listingStatus: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 5,
  },
  statusSold: {
    color: '#FF6347',
  },
  listingActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 10,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 10,
  },
  addButtonText: {
    fontSize: 16,
    color: '#FFF',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  statCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  paymentHistory: {
    marginHorizontal: 16,
    marginTop: 10,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 5,
  },
  paymentItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  paymentDescription: {
    fontSize: 14,
    color: '#333',
  },
  paymentAmount: {
    fontSize: 14,
    color: '#8B4513',
    marginTop: 5,
  },
  paymentDate: {
    fontSize: 12,
    color: '#A9A9A9',
    marginTop: 5,
  },
  verificationCard: {
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
  verificationText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  verifyButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  verifyButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingsIcon: {
    marginRight: 10,
  },
  settingsText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    borderBottomWidth: 0,
  },
});

export default ProfileScreen;