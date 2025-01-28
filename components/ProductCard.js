import React from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ id, name, price, image, rating, reviews, onAddToCart }) => {
  const navigation = useNavigation();
  const translateX = new Animated.Value(0);

  // Handle swipe gesture
  const handleGesture = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  // Handle gesture end (check for right swipe threshold)
  const handleGestureEnd = ({ nativeEvent }) => {
    if (nativeEvent.translationX > 100) {
      onAddToCart(id); // Call the add-to-cart function
    }

    // Reset card position after gesture ends
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  // Handle navigation to product description
  const handlePress = () => {
    navigation.navigate('ItemDesc', { productId: id });
  };

  return (
    <PanGestureHandler
      onGestureEvent={handleGesture}
      onEnded={handleGestureEnd}
    >
      <Animated.View style={[styles.card, { transform: [{ translateX }] }]}>
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
      </Animated.View>
    </PanGestureHandler>
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
    elevation: 3,
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
});

export default ProductCard;