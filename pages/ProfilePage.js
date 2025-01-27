import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import AuthContext from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import MyFooter from '../components/MyFooter';
import MyNavbar from '../components/MyNavbar';
import Loading from '../components/Loading';

const ProfilePage = ({ route }) => {
  const { user, authTokens, logoutUser } = useContext(AuthContext);
  const [userprofile, setUserProfile] = useState(null);
  const [userdata, setUserData] = useState(null);
  const [profile, setProfile] = useState({});
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const { updated } = route.params || {};

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
        Alert.alert('Error', 'Something went wrong! Try logging in again.');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [updated]);

  useEffect(() => {
    if (userprofile && userdata) {
      setProfile({
        pfp: userprofile.pfp || 'https://via.placeholder.com/150',
        name: userdata.username || 'Empty',
        email: userdata.email || 'default@gmail.com',
        phone: userprofile.phone || '+911 1234567890',
        city: userprofile.city || 'Jaipur',
        state: userprofile.state || 'Rajasthan',
        country: userprofile.country || 'Bharat',
      });
    }
  }, [userprofile, userdata]);

  const toEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleLogout = () => {
    logoutUser();
    navigation.navigate('LoginPage');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MyNavbar />

      <View style={styles.profileCard}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: profile.pfp }} style={styles.profileImage} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileText}>
            <Text style={styles.boldText}>Email:</Text> {profile.email}
          </Text>
          <Text style={styles.profileText}>
            <Text style={styles.boldText}>Phone:</Text> {profile.phone}
          </Text>
          <Text style={styles.profileText}>
            <Text style={styles.boldText}>Location:</Text> {profile.city}, {profile.state}, {profile.country}
          </Text>

          <TouchableOpacity onPress={toEditProfile} style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <MyFooter />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  profileImageContainer: {
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileText: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
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
    paddingLeft: 10,
    paddingRight: 10,
  },
  logoutButton: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default ProfilePage;