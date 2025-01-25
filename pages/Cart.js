import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [shippingCharge] = useState(50);
  const { user, authTokens, logoutUser } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    let response = await fetch(`http://192.168.1.8:8000/api/cart/${user.user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens.access}`,
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setCartItems(data);
    } else if (response.status === 401) {
      logoutUser();
    }
  };

  const updateQuantity = async (id, increment) => {
    let response = await fetch(
      `http://192.168.1.8:8000/api/update_cartitem_quantity/${id}/${increment}/${user.user_id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access}`,
        },
      }
    );
    let data = await response.json();
    if (response.status === 200) {
      setCartItems(data);
    } else if (response.status === 401) {
      logoutUser();
    }
  };

  const removeItem = async (id) => {
    let response = await fetch(`http://192.168.1.8:8000/api/items/delete_cart_item/${user.user_id}/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens.access}`,
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setCartItems(data);
    } else if (response.status === 401) {
      logoutUser();
    }
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  let totalCartValue = 0;
  cartItems.forEach((item) => {
    const price = parseFloat(item.item.price);
    const quantity = parseInt(item.quantity);
    if (!isNaN(price) && !isNaN(quantity)) {
      totalCartValue += price * quantity;
    }
  });

  const grandTotal = totalCartValue + shippingCharge;

  const applyDiscount = () => {
    if (discountCode === 'DISCOUNT20') {
      Alert.alert('Discount applied: $20');
    } else {
      Alert.alert('Invalid discount code');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{user.username}'s Shopping Cart</Text>

      {cartItems.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item: cartItem }) => (
              <View style={styles.cartItem}>
                <TouchableOpacity onPress={() => navigation.navigate('ProductDesc', { productId: cartItem.item.id })}>
                  <Text style={styles.cartItemTitle}>{cartItem.item.name}</Text>
                  <Text style={styles.cartItemPrice}>${cartItem.item.price * cartItem.quantity}</Text>
                </TouchableOpacity>
                <View style={styles.quantityContainer}>
                  <Button title="-" onPress={() => updateQuantity(cartItem.item.id, -1)} />
                  <TextInput
                    style={styles.quantityInput}
                    value={cartItem.quantity.toString()}
                    editable={false}
                  />
                  <Button title="+" onPress={() => updateQuantity(cartItem.item.id, 1)} />
                </View>
                <TouchableOpacity onPress={() => removeItem(cartItem.item.id)}>
                  <Text style={styles.removeItem}>Remove Item</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Cart Summary</Text>

            <View style={styles.summaryRow}>
              <Text>Total Items: </Text>
              <Text>{totalItems}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>Total Cart Value: </Text>
              <Text>${totalCartValue.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>Shipping Charges: </Text>
              <Text>${shippingCharge}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text>Discount Code: </Text>
              <TextInput
                style={styles.input}
                value={discountCode}
                onChangeText={(text) => setDiscountCode(text)}
                placeholder="Enter discount code"
              />
              <Button title="Apply" onPress={applyDiscount} />
            </View>

            <View style={styles.summaryRow}>
              <Text>Grand Total: </Text>
              <Text>${grandTotal.toFixed(2)}</Text>
            </View>

            <Button title="Checkout" onPress={() => navigation.navigate('Checkout')} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  cartItemTitle: {
    fontSize: 18,
  },
  cartItemPrice: {
    fontSize: 16,
    color: 'green',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityInput: {
    width: 50,
    textAlign: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
  },
  removeItem: {
    color: 'red',
    marginTop: 5,
  },
  summaryContainer: {
    marginTop: 20,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    width: 150,
    marginRight: 10,
  },
});

export default Cart;