import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../context/AuthContext' // ✅ Make sure this path is correct
import BACKGROUND_IMAGE from '../assets/loginbg.jpg'; // ✅ Replace with your actual image path
import { useNavigation } from '@react-navigation/native'; // ✅ Import useNavigation for navigation

const LoginScreen = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { login } = useContext(AuthContext); // ✅ AuthContext login
  const navigation = useNavigation(); // ✅ Make sure to import useNavigation from '@react-navigation/native'

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com', // Replace this
      offlineAccess: true,
    });
  }, []);

  // const generateRandomOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSendOtp = () => {
    if (!mobileNumber || mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {
      Alert.alert('Invalid Mobile Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    setOtpLoading(true);
    setTimeout(() => {
      const otp = '123456'; // For testing, use a fixed OTP
      setGeneratedOtp(otp);
      setOtpSent(true);
      setOtpLoading(false);
      Alert.alert('OTP Sent', `Your OTP is: ${otp} (for testing only)`);
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    if (enteredOtp === '123456') {
      setOtpLoading(true);
      const user = {
        id: `otp_${mobileNumber}`,
        name: `User ${mobileNumber}`,
        mobile: mobileNumber,
        loggedInVia: 'otp',
      };
      await login(user); // ✅ Triggers App.js to show Main
      Alert.alert('Login Successful', `Welcome, ${user.name}!`);
      navigation.replace('Main'); // Navigate to Main after login
      setOtpLoading(false);
    } else {
      Alert.alert('Invalid OTP', 'The OTP entered is incorrect.');
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = {
        id: userInfo.user.id,
        name: userInfo.user.name,
        email: userInfo.user.email,
        photo: userInfo.user.photo,
        loggedInVia: 'google',
      };
      await login(user); // ✅ Triggers App.js to show Main
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Cancelled', 'Google Sign-In was cancelled.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('In Progress', 'Google Sign-In already in progress.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Google Play Services not available.');
      } else {
        Alert.alert('Error', `Sign-In failed: ${error.message}`);
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ImageBackground source={BACKGROUND_IMAGE} style={styles.background}>
        <View style={styles.overlay} />

        <View style={styles.container}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <View style={styles.inputContainer}>
            <Icon name="cellphone" size={22} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              placeholderTextColor="#ccc"
              keyboardType="numeric"
              maxLength={10}
              value={mobileNumber}
              onChangeText={setMobileNumber}
              editable={!otpSent && !otpLoading}
            />
            {!otpSent ? (
              <TouchableOpacity
                style={styles.button}
                onPress={handleSendOtp}
                disabled={otpLoading}
              >
                {otpLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Send OTP</Text>
                )}
              </TouchableOpacity>
            ) : (
              <View style={styles.otpSentTextContainer}>
                <Text style={styles.otpSentText}>OTP Sent!</Text>
                <TouchableOpacity onPress={() => setOtpSent(false)}>
                  <Text style={styles.editNumberText}>Edit</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {otpSent && (
            <View style={styles.inputContainer}>
              <Icon name="form-textbox-password" size={22} color="#fff" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
                maxLength={6}
                value={enteredOtp}
                onChangeText={setEnteredOtp}
                editable={!otpLoading}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleVerifyOtp}
                disabled={otpLoading}
              >
                {otpLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Verify OTP</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.orText}>OR</Text>

          <TouchableOpacity
            style={[styles.button, styles.googleButton]}
            onPress={handleGoogleSignIn}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Icon name="google" size={20} color="#fff" style={{ marginRight: 10 }} />
                <Text style={styles.buttonText}>Sign in with Google</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
    minWidth: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  otpSentTextContainer: {
    alignItems: 'flex-end',
    paddingVertical: 10,
  },
  otpSentText: {
    color: '#fff',
    fontSize: 16,
  },
  editNumberText: {
    color: '#ADD8E6',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  orText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  googleButton: {
    backgroundColor: '#DB4437',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
