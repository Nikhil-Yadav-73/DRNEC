import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, Button, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AuthContext from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import MyFooter from '../components/MyFooter';
import MyNavbar from '../components/MyNavbar'; 

const ProfilePage = () => {
  const { user, authTokens, logoutUser } = useContext(AuthContext);
  const [userprofile, setUserProfile] = useState(null);
  const [userdata, setUserData] = useState(null);
  const [profile, setProfile] = useState({});
  const navigation = useNavigation();

  const getUserProfile = async () => {
    try {
      const response = await fetch(`http://192.168.1.8:8000/api/userprofile/${user.user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        setUserProfile(data.profile);
        setUserData(data.user_data);
      } else if (response.status === 401) {
        logoutUser();
      } else {
        alert("Something went wrong! Try logging in again");
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    if (userprofile && userdata) {
      setProfile({
        pfp: userprofile.pfp || 'default-image.png',
        name: userprofile.name || 'Empty',
        email: userdata.email || 'default@gmail.com',
        phone: userprofile.phone || '+911 1234567890',
        city: userprofile.city || 'Jaipur',
        state: userprofile.state || 'Rajasthan',
        country: userprofile.country || 'Bharat',
      });
    }
  }, [userprofile, userdata]);

  const to_edit_profile = () => {
    navigation.navigate('EditProfile'); // Navigate to edit profile screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Navbar */}
      <MyNavbar />

      {/* Profile Section */}
      <View style={styles.profileCard}>
        <Image source={{ uri: profile.pfp }} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileText}><Text style={styles.boldText}>Email:</Text> {profile.email}</Text>
          <Text style={styles.profileText}><Text style={styles.boldText}>Phone:</Text> {profile.phone}</Text>
          <Text style={styles.profileText}>
            <Text style={styles.boldText}>Location:</Text> {profile.city}, {profile.state}, {profile.country}
          </Text>

          {/* Edit Profile Button */}
          <TouchableOpacity onPress={to_edit_profile} style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <MyFooter />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  profileCard: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  profileInfo: {
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileText: {
    fontSize: 16,
    marginVertical: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  editButton: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfilePage;