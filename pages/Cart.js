import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../context/AuthContext';
import CartItem from '../components/CartItem';

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
        cartItems.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            item={cartItem}
            quantity={cartItem.quantity}
            setCartItems={setCartItems}
            navigation={navigation}
          />
        ))
      )}

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Cart Summary</Text>
        <View style={styles.summaryRow}>
          <Text>Total Items: </Text>
          <Text>{totalItems}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Total Cart Value: </Text>
          <Text>₹ {totalCartValue.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Shipping Charges: </Text>
          <Text>₹ {shippingCharge}</Text>
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
          <Text>₹ {grandTotal.toFixed(2)}</Text>
        </View>
        <Button
          title="Checkout"
          onPress={() =>
            navigation.navigate('Checkout', {
              totalCartValue,
              shippingCharge,
              grandTotal,
              totalItems,
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    paddingTop: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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