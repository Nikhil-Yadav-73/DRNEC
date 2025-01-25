import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../context/AuthContext";
import CartItem from "../components/CartItem";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user, authTokens, logoutUser } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    const response = await fetch(`http://192.168.1.8:8000/api/cart/${user.user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setCartItems(data);
    } else if (response.status === 401) {
      logoutUser();
    }
  };

  const updateQuantity = async (id, increment) => {
    const response = await fetch(
      `http://192.168.1.8:8000/api/update_cartitem_quantity/${id}/${increment}/${user.user_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      setCartItems(data);
    }
  };

  const removeItem = async (id) => {
    const response = await fetch(`http://192.168.1.8:8000/api/items/delete_cart_item/${user.user_id}/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setCartItems(data);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      {cartItems.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          cartItem={cartItem}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
          navigation={navigation}
        />
      ))}
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
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Cart;