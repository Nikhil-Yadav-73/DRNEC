import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ id, name, price, image, rating, reviews }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    // Navigate to the product detail screen
    navigation.navigate('ItemDesc', { productId: id });
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={handlePress}>
        <Image
          style={styles.image}
          source={{ uri: image || 'https://via.placeholder.com/150' }}
          alt={name}
        />
      </TouchableOpacity>
      <View style={styles.cardBody}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.price}>₹ {price}</Text>
      </View>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>View Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 180,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: 'green',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductCard;