import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const SellAnimalScreen = () => {
  // State for form data
  const [step, setStep] = useState(1); // Step-based navigation (1: Photos, 2: Details, 3: Submit)
  const [photos, setPhotos] = useState([]);
  const [animalType, setAnimalType] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [ageUnit, setAgeUnit] = useState('months');
  const [weight, setWeight] = useState('');
  const [vaccinated, setVaccinated] = useState(false);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [availableFrom, setAvailableFrom] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [contactNumber, setContactNumber] = useState(''); // Auto-filled in real app
  const [showContact, setShowContact] = useState(true);
  const [hideContactForFee, setHideContactForFee] = useState(false);
  const [makeFeatured, setMakeFeatured] = useState(false);
  const [verifiedBadge, setVerifiedBadge] = useState(false);

  // Photo upload handler
  const pickImage = () => {
    if (photos.length >= 5) {
      Alert.alert('Limit Reached', 'You can upload a maximum of 5 photos.');
      return;
    }

    ImagePicker.launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const newPhoto = response.assets[0].uri;
        setPhotos([...photos, newPhoto]);
      }
    });
  };

  // Date picker handler
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || availableFrom;
    setShowDatePicker(false);
    setAvailableFrom(currentDate);
  };

  // Render photo thumbnails
  const renderPhotoItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.thumbnail} />
  );

  // Submit handler
  const handleSubmit = () => {
    // In a real app, you'd send the data to a backend API
    Alert.alert('Success', 'Your listing has been submitted successfully!');
    // Reset form (optional)
    setPhotos([]);
    setAnimalType('');
    setBreed('');
    setAge('');
    setWeight('');
    setVaccinated(false);
    setDescription('');
    setPrice('');
    setLocation('');
    setAvailableFrom(new Date());
    setContactNumber('');
    setShowContact(true);
    setHideContactForFee(false);
    setMakeFeatured(false);
    setVerifiedBadge(false);
    setStep(1);
  };

  // Step navigation
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>List Your Animal for Sale</Text>
        <Text style={styles.headerSubtitle}>
          Help others find your livestock. Upload clear photos, provide correct details, and boost your chances of selling fast.
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressStep, step >= 1 && styles.progressStepActive]}>
          <Text style={styles.progressText}>1. Photos</Text>
        </View>
        <View style={[styles.progressStep, step >= 2 && styles.progressStepActive]}>
          <Text style={styles.progressText}>2. Details</Text>
        </View>
        <View style={[styles.progressStep, step >= 3 && styles.progressStepActive]}>
          <Text style={styles.progressText}>3. Submit</Text>
        </View>
      </View>

      {/* Step 1: Photo Upload */}
      {step === 1 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="camera" size={20} color="#4CAF50" /> 📸 Upload Animal Photos (Max 5)
          </Text>
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Text style={styles.uploadButtonText}>Tap to open camera or gallery</Text>
          </TouchableOpacity>
          <FlatList
            data={photos}
            renderItem={renderPhotoItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            style={styles.photoList}
          />
          <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Step 2: Animal Details */}
      {step === 2 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="paw" size={20} color="#4CAF50" /> 🐾 Animal Details
          </Text>

          {/* Animal Type */}
          <View style={styles.inputContainer}>
            <Ionicons name="list" size={20} color="#8B4513" style={styles.inputIcon} />
            <Picker
              selectedValue={animalType}
              onValueChange={(itemValue) => setAnimalType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Animal Type" value="" />
              <Picker.Item label="Cow" value="Cow" />
              <Picker.Item label="Buffalo" value="Buffalo" />
              <Picker.Item label="Goat" value="Goat" />
              <Picker.Item label="Sheep" value="Sheep" />
              <Picker.Item label="Pig" value="Pig" />
              <Picker.Item label="Hen" value="Hen" />
            </Picker>
          </View>

          {/* Breed */}
          <View style={styles.inputContainer}>
            <Ionicons name="document-text" size={20} color="#8B4513" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Breed"
              value={breed}
              onChangeText={setBreed}
              placeholderTextColor="#A9A9A9"
            />
          </View>

          {/* Age */}
          <View style={styles.inputContainer}>
            <Ionicons name="calendar" size={20} color="#8B4513" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Age"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              placeholderTextColor="#A9A9A9"
            />
            <Picker
              selectedValue={ageUnit}
              onValueChange={(itemValue) => setAgeUnit(itemValue)}
              style={styles.smallPicker}
            >
              <Picker.Item label="Months" value="months" />
              <Picker.Item label="Years" value="years" />
            </Picker>
          </View>

          {/* Weight */}
          <View style={styles.inputContainer}>
            <Ionicons name="scale" size={20} color="#8B4513" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Weight (Kg)"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              placeholderTextColor="#A9A9A9"
            />
          </View>

          {/* Vaccinated */}
          <View style={styles.inputContainer}>
            <Ionicons name="medkit" size={20} color="#8B4513" style={styles.inputIcon} />
            <Text style={styles.inputLabel}>Vaccinated?</Text>
            <Switch
              value={vaccinated}
              onValueChange={setVaccinated}
              trackColor={{ false: '#A9A9A9', true: '#4CAF50' }}
              thumbColor={vaccinated ? '#FFF' : '#FFF'}
            />
          </View>

          {/* Description */}
          <View style={styles.inputContainer}>
            <Ionicons name="chatbox" size={20} color="#8B4513" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              multiline
              placeholderTextColor="#A9A9A9"
            />
          </View>

          {/* Navigation Buttons */}
          <View style={styles.navigationButtons}>
            <TouchableOpacity style={styles.prevButton} onPress={prevStep}>
              <Text style={styles.prevButtonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Step 3: Price, Location, Contact, Boost Options, and Submit */}
      {step === 3 && (
        <View style={styles.section}>
          {/* Price */}
          <Text style={styles.sectionTitle}>
            <Ionicons name="cash" size={20} color="#4CAF50" /> 💰 Price & Location
          </Text>
          <View style={styles.inputContainer}>
            <Ionicons name="pricetag" size={20} color="#8B4513" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Price (₹)"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              placeholderTextColor="#A9A9A9"
            />
          </View>

          {/* Location */}
          <View style={styles.inputContainer}>
            <Ionicons name="location" size={20} color="#8B4513" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
              placeholderTextColor="#A9A9A9"
            />
          </View>

          {/* Available From */}
          <View style={styles.inputContainer}>
            <Ionicons name="calendar" size={20} color="#8B4513" style={styles.inputIcon} />
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
              <Text style={styles.datePickerText}>
                Available from: {availableFrom.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={availableFrom}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          {/* Contact Preference */}
          <Text style={styles.sectionTitle}>
            <Ionicons name="call" size={20} color="#4CAF50" /> 📞 Contact Preference
          </Text>
          <View style={styles.inputContainer}>
            <Ionicons name="phone-portrait" size={20} color="#8B4513" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Contact Number"
              value={contactNumber}
              onChangeText={setContactNumber}
              keyboardType="phone-pad"
              placeholderTextColor="#A9A9A9"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Show contact to all buyers</Text>
            <Switch
              value={showContact}
              onValueChange={setShowContact}
              trackColor={{ false: '#A9A9A9', true: '#4CAF50' }}
              thumbColor={showContact ? '#FFF' : '#FFF'}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Hide contact – let buyers unlock for ₹10</Text>
            <Switch
              value={hideContactForFee}
              onValueChange={setHideContactForFee}
              trackColor={{ false: '#A9A9A9', true: '#4CAF50' }}
              thumbColor={hideContactForFee ? '#FFF' : '#FFF'}
            />
          </View>

          {/* Boost Options */}
          <Text style={styles.sectionTitle}>
            <Ionicons name="star" size={20} color="#4CAF50" /> 🌟 Boost Options
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Make it Featured – ₹50</Text>
            <Switch
              value={makeFeatured}
              onValueChange={setMakeFeatured}
              trackColor={{ false: '#A9A9A9', true: '#4CAF50' }}
              thumbColor={makeFeatured ? '#FFF' : '#FFF'}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Verified Seller Badge – ₹199/year</Text>
            <Switch
              value={verifiedBadge}
              onValueChange={setVerifiedBadge}
              trackColor={{ false: '#A9A9A9', true: '#4CAF50' }}
              thumbColor={verifiedBadge ? '#FFF' : '#FFF'}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>
              <Ionicons name="send" size={16} color="#FFF" /> 📤 Post Your Animal
            </Text>
          </TouchableOpacity>

          {/* Navigation Buttons */}
          <View style={styles.navigationButtons}>
            <TouchableOpacity style={styles.prevButton} onPress={prevStep}>
              <Text style={styles.prevButtonText}>Previous</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC', // Light beige background
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
    color: '#8B4513', // Brown color
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
  },
  progressStep: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  progressStepActive: {
    backgroundColor: '#4CAF50', // Green for active step
  },
  progressText: {
    fontSize: 14,
    color: '#FFF',
  },
  section: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#4CAF50',
  },
  photoList: {
    marginVertical: 10,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  picker: {
    flex: 1,
    color: '#333',
  },
  smallPicker: {
    width: 120,
    color: '#333',
  },
  inputLabel: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  datePickerButton: {
    flex: 1,
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  prevButton: {
    backgroundColor: '#A9A9A9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  prevButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default SellAnimalScreen;