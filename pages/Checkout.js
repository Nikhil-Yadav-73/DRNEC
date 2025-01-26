import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AuthContext from '../context/AuthContext';

const Checkout = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { totalCartValue, shippingCharge, grandTotal, totalItems } = route.params;
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(true);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    sendOrderDetails();
    const timer = setTimeout(() => {
      setShowSuccessAnimation(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const sendOrderDetails = async () => {
    const orderDetails = {
      total_items: totalItems,
      total_cart_value: totalCartValue,
      shipping_charge: shippingCharge,
      grand_total: grandTotal,
      user_id: user.user_id,
    };

    try {
      const response = await fetch('http://192.168.1.8:8000/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert('Success', 'Order details submitted successfully!');
        navigation.navigate("HomePage", {firstTimeToggle : false});
      } else {
        Alert.alert('Error', 'Failed to submit order details.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      {showSuccessAnimation ? (
        <View style={styles.animationContainer}>
          <View style={styles.circle}>
            <Ionicons name="checkmark-circle" size={120} color="#4CAF50" />
          </View>
          <Text style={styles.successText}>Order Placed!</Text>
        </View>
      ) : (
        <View style={styles.orderDetailsContainer}>
          <Text style={styles.header}>Order Summary</Text>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Total Items:</Text>
            <Text style={styles.orderValue}>{totalItems}</Text>
          </View>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Total Cart Value:</Text>
            <Text style={styles.orderValue}>₹ {totalCartValue.toFixed(2)}</Text>
          </View>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Shipping Charges:</Text>
            <Text style={styles.orderValue}>₹ {shippingCharge.toFixed(2)}</Text>
          </View>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Grand Total:</Text>
            <Text style={styles.orderValue}>₹ {grandTotal.toFixed(2)}</Text>
          </View>
          {/* <Button
            title="Submit Order"
            onPress={sendOrderDetails}
            color="#007bff"
          /> */}
          {/* <Button
            title="Go to Home"
            onPress={() => navigation.navigate('HomePage')}
            color="#28a745"
          /> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
  },
  orderDetailsContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    elevation: 2,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderValue: {
    fontSize: 16,
  },
});

export default Checkout;