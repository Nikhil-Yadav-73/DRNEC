import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AuthContext from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const EditProfile = () => {
  const navigation = useNavigation();
  const { user, authTokens, logoutUser } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    pfp: null,
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    country: '',
  });

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        let response = await fetch(
          `http://192.168.1.8:8000/api/userprofile/${user.user_id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authTokens.access}`,
            },
          }
        );
        let data = await response.json();
        if (response.status === 200) {
          setProfile({
            pfp: data.profile.pfp || null,
            name: data.user_data.username || '',
            email: data.user_data.email || '',
            phone: data.profile.phone || '',
            city: data.profile.city || '',
            state: data.profile.state || '',
            country: data.profile.country || '',
          });
        } else if (response.status === 401) {
          logoutUser();
        } else {
          Alert.alert('Error', 'Failed to fetch profile data.');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    getUserProfile();
  }, [authTokens, logoutUser, user.user_id]);

  const handleChange = (name, value) => {
    setProfile((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.Images],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      setProfile((prevState) => ({ ...prevState, pfp: result.assets[0].uri }));
    }
  };
  

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append(
      'profile',
      JSON.stringify({
        phone: profile.phone,
        city: profile.city,
        state: profile.state,
        country: profile.country,
      })
    );
    formData.append(
      'user_data',
      JSON.stringify({
        username: profile.name,
        email: profile.email,
      })
    );

    if (profile.pfp) {
      const filename = profile.pfp.split('/').pop();
      const fileType = filename.split('.').pop();
      formData.append('pfp', {
        uri: profile.pfp,
        name: filename,
        type: `image/${fileType}`,
      });
    }

    try {
      let response = await fetch(
        `http://192.168.1.8:8000/api/userprofile/${user.user_id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
          body: formData,
        }
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Profile updated successfully!');
        navigation.navigate('Profile', { updated: true });
      } else {
        Alert.alert('Error', 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>
      <TouchableOpacity onPress={handleImagePick} style={styles.imagePicker}>
        <Image
          source={{
            uri: profile.pfp || 'https://via.placeholder.com/150',
          }}
          style={styles.profileImage}
        />
        <Text style={styles.changeImageText}>Change Image</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={profile.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={profile.email}
        keyboardType="email-address"
        onChangeText={(text) => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={profile.phone}
        keyboardType="phone-pad"
        onChangeText={(text) => handleChange('phone', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={profile.city}
        onChangeText={(text) => handleChange('city', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={profile.state}
        onChangeText={(text) => handleChange('state', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={profile.country}
        onChangeText={(text) => handleChange('country', text)}
      />
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeImageText: {
    marginTop: 10,
    color: 'blue',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
  },
});