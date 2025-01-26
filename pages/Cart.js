import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../context/AuthContext';
import CartItem from '../components/CartItem';
import MyNavbar from "../components/MyNavbar";
import Loading from "../components/Loading";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [shippingCharge] = useState(50);
  const [loading, setLoading] = useState(true);
  const { user, authTokens, logoutUser } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    try {
      let response = await fetch(`http://192.168.1.8:8000/api/cart/${user.user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      let data = await response.json();
      if (response.status === 200) {
        setCartItems(data);
      } else if (response.status === 401) {
        logoutUser();
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <MyNavbar />
      <Text style={styles.header}>{user.username}'s Shopping Cart</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {cartItems.length === 0 ? (
          <View style={styles.emptycart}>
            <Text style={styles.emptycartText}>Your cart is empty!</Text>
          </View>
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

        {cartItems.length > 0 && (
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
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  emptycart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#555',
  },
  emptycartText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#555',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop: 10,
    padding: 10,
  },
  summaryContainer: {
    marginTop: 20,
    padding: 10,
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