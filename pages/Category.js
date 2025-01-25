import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Button, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

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
      <Text style={styles.header}>{name}</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>

            <Button
              title="View Product"
              onPress={() => navigation.navigate('ItemDesc', { productId: item.id })}
            />
          </View>
        )}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    marginBottom: 10,
  },
});

export default Category;