import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import MyNavbar from '../components/MyNavbar';
import MyFooter from '../components/MyFooter';

const Category = ({ route }) => {
  const { name } = route.params;
  const [items, setItems] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://192.168.1.8:8000/api/categories/${name}`);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching category:', error);
        Alert.alert('Error', 'Failed to fetch category items');
      }
    };

    fetchItems();
  }, [name]);

  if (!items) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <MyNavbar />
      <Text style={styles.header}>{name}</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={styles.productCard}
            onPress={() => navigation.navigate('ItemDesc', { productId: item.id })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.price}>₹ {item.price}</Text>
          </TouchableOpacity>
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.productGrid}
      />
      <MyFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingTop: 16,
    textAlign: 'center',
  },
  productGrid: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    padding: 16,
  },
  productCard: {
    width: '48%',
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    textAlign: 'center',
    color: 'green',
  },
});

export default Category;