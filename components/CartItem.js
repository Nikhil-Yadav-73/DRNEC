import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AuthContext from '../context/AuthContext';

const CartItem = ({ item, navigation, setCartItems }) => {
  const { user, authTokens, logoutUser } = useContext(AuthContext);

  const updateQuantity = async (id, increment) => {
    try {
      let response = await fetch(
        `http://192.168.1.8:8000/api/update_cartitem_quantity/${id}/${increment}/${user.user_id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        setCartItems(data); // Update cart items in parent
      } else if (response.status === 401) {
        logoutUser();
      } else {
        Alert.alert('Error', 'Failed to update item quantity.');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  const removeItem = async (id) => {
    try {
      let response = await fetch(`http://192.168.1.8:8000/api/items/delete_cart_item/${user.user_id}/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      let data = await response.json();
      if (response.status === 200) {
        setCartItems(data); // Update cart items in parent
      } else if (response.status === 401) {
        logoutUser();
      } else {
        Alert.alert('Error', 'Failed to remove item.');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

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