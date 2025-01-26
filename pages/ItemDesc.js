import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, ScrollView, View, Text, Image, Button, Picker, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../context/AuthContext';
import axios from 'axios'; 
import MyNavbar from '../components/MyNavbar';

const ItemDesc = ({ route }) => {
    const { productId } = route.params;
  const { user} = useContext(AuthContext);
  const [item, setItem] = useState(null);
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://192.168.1.8:8000/api/items/${productId}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    const fetchRecommendedItems = async () => {
      try {
        const response = await axios.get(`http://192.168.1.8:8000/api/items/recommended/${productId}`);
        setRecommendedItems(response.data);
      } catch (error) {
        console.error('Error fetching recommended items:', error);
      }
    };

    fetchItem();
    fetchRecommendedItems();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      const response = await fetch(`http://192.168.1.8:8000/api/items/add_to_cart/${user.user_id}/${productId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      console.log('Item added to cart:', data);
      Alert.alert('Item added to cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  if (!item) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.navstyle}>
      <MyNavbar  />
      <View style={styles.container}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.header}>{item.name}</Text>
        <Text style={styles.text}>{item.description}</Text>
        <Text style={[styles.text, styles.price]}>Price: ₹ {item.price}</Text>
        <Text style={[styles.text, styles.boldText]}>Material: {item.material}</Text>
        <Text style={[styles.text, styles.boldText]}>Category: {item.category.name}</Text>


      {item.category.name === 'kurti' && (
        <View style={styles.sizeSelectContainer}>
          <Text style={styles.text}>Select Size:</Text>
          <Picker
            selectedValue={selectedSize}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedSize(itemValue)}>
            <Picker.Item label="Select size" value="" />
            <Picker.Item label="Small" value="small" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Large" value="large" />
            <Picker.Item label="X-Large" value="xlarge" />
            <Picker.Item label="XX-Large" value="xxlarge" />
          </Picker>
        </View>
      )}

      <Button title="Add to Cart" onPress={handleAddToCart} />

      <Text style={styles.recommendedTitle}>Recommended Products</Text>
      <View style={styles.recommendedItemsContainer}>
        {recommendedItems.map((recommendedItem) => (
          <TouchableOpacity
            key={recommendedItem.id}
            style={styles.recommendedItemCard}
            onPress={() => navigation.navigate('ItemDesc', { productId: recommendedItem.id })}
          >
            <Image source={{ uri: recommendedItem.image }} style={styles.recommendedImage} />
            <Text>{recommendedItem.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  sizeSelectContainer: {
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  recommendedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  recommendedItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  recommendedItemCard: {
    width: '48%',
    margin: '1%',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  recommendedImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  price: {
    color: 'green'
  },
});

export default ItemDesc;