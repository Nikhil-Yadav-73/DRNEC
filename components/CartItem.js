import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = ({ item, updateQuantity, removeItem, navigation }) => {
  return (
    <View style={styles.cartItem}>
      <TouchableOpacity onPress={() => navigation.navigate('ItemDesc', { productId: item.id })}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
      </TouchableOpacity>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price * item.quantity}</Text>
        <View style={styles.quantityContainer}>
          <Button title="-" onPress={() => updateQuantity(item.id, -1)} />
          <TextInput
            style={styles.quantityInput}
            value={item.quantity.toString()}
            editable={false}
          />
          <Button title="+" onPress={() => updateQuantity(item.id, 1)} />
        </View>
        <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
          <Ionicons name="trash-outline" size={20} color="red" />
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: 'green',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityInput: {
    width: 50,
    textAlign: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  removeText: {
    marginLeft: 5,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default CartItem;
