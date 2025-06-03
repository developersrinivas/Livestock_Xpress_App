import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const SearchScreen = () => {
  const [animals, setAnimals] = useState([
    { id: '1', name: 'Holstein Cow', price: 1250, image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Cow_female_black_white.jpg', status: '10+ offers now' },
    { id: '2', name: 'Nubian Goat', price: 350, image: 'https://cdn.pixabay.com/photo/2018/11/16/13/25/goat-3819397_1280.jpg', status: 'New listing' },
    { id: '3', name: 'Suffolk Sheep', price: 220, image: 'https://cdn.pixabay.com/photo/2020/04/21/19/08/lambs-5074389_1280.jpg', status: '' },
    { id: '4', name: 'Quarter Horse', price: 1600, image: 'https://cdn.pixabay.com/photo/2014/02/25/04/06/horse-274102_1280.jpg', status: 'Featured' },
    { id: '5', name: 'Berkshire Pig', price: 400, image: 'https://cdn.pixabay.com/photo/2017/07/28/08/11/pig-2547920_1280.jpg', status: '' },
    { id: '6', name: 'Angus Cow', price: 1300, image: 'https://cdn.pixabay.com/photo/2022/03/25/10/56/cow-7090780_1280.jpg', status: 'High demand' },
    { id: '7', name: 'Boer Goat', price: 380, image: 'https://cdn.pixabay.com/photo/2022/05/11/18/26/animal-7189976_1280.jpg', status: '' },
    { id: '8', name: 'Dorset Sheep', price: 210, image: 'https://cdn.pixabay.com/photo/2022/08/17/12/05/herd-of-sheep-7392366_1280.jpg', status: 'Last one left!' },
    { id: '9', name: 'Arabian Horse', price: 1750, image: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Arabian_Horse_at_Al_Shaqab_Stud.jpg', status: '' },
    { id: '10', name: 'Yorkshire Pig', price: 420, image: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Yorkshire_Pig_%28Large_White%29.jpg', status: 'Reduced price' },
    { id: '11', name: 'Jersey Cow', price: 1100, image: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Jersey_cow_with_calf.jpg', status: '' },
    { id: '12', name: 'Saanen Goat', price: 320, image: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Saanen_goat.jpg', status: '' },
    { id: '13', name: 'Merino Sheep', price: 250, image: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Merino_sheep_Australia.jpg', status: 'Popular choice' },
    { id: '14', name: 'Friesian Horse', price: 1800, image: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Friesian_horse_-_black.jpg', status: '' },
    { id: '15', name: 'Duroc Pig', price: 390, image: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Duroc_pig.jpg', status: '' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [animalType, setAnimalType] = useState('Animal Type');
  const [priceRange, setPriceRange] = useState('Price Range');
  const [distance, setDistance] = useState('Distance');

  const renderAnimalItem = ({ item }) => (
    <View style={styles.animalCard}>
      <View style={styles.imageContainer}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.animalImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        {item.status !== '' && (
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.animalName}>{item.name}</Text>
        <Text style={styles.animalPrice}>₹{item.price.toLocaleString('en-IN')}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient colors={['#8B4513', '#A0522D']} style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>LivestockXpress</Text>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#A9A9A9" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for animals"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#A9A9A9"
        />
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>{animalType}</Text>
          <Ionicons name="chevron-down" size={16} color="#8B4513" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>{priceRange}</Text>
          <Ionicons name="chevron-down" size={16} color="#8B4513" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>{distance}</Text>
          <Ionicons name="chevron-down" size={16} color="#8B4513" />
        </TouchableOpacity>
      </View>

      {/* Animal Listings */}
      <FlatList
        data={animals}
        renderItem={renderAnimalItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefce8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
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
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    elevation: 3,
  },
  filterText: {
    fontSize: 14,
    color: '#8B4513',
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  animalCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
  },
  animalImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '500',
  },
  statusBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(206, 36, 36, 0.73)', // Tomato color with transparency
    backgroundColor: 'rgba(237, 49, 49, 0.24)', // Slightly transparent white background
    shadowColor: '#000',
  },
  statusText: {
    color: 'rgba(206, 36, 36, 0.73)', // Tomato color with transparency
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  infoContainer: {
    padding: 12,
    backgroundColor: '#f9fafb',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  animalName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  animalPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#16a34a',
  },
});

export default SearchScreen;
