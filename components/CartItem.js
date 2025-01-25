import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = ({ cartItem, updateQuantity, removeItem, navigation }) => {
  const handleIncrease = () => {
    updateQuantity(cartItem.item.id, 1);
  };

  const handleDecrease = () => {
    updateQuantity(cartItem.item.id, -1);
  };

  return (
    <View style={styles.cartItem}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ItemDesc", { productId: cartItem.item.id })}
      >
        <Image source={{ uri: cartItem.item.image }} style={styles.itemImage} />
      </TouchableOpacity>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{cartItem.item.name}</Text>
        <Text style={styles.itemPrice}>₹ {cartItem.item.price * cartItem.quantity}</Text>
        <View style={styles.quantityContainer}>
          <Button title="-" onPress={handleDecrease} />
          <TextInput
            style={styles.quantityInput}
            value={cartItem.quantity.toString()}
            editable={false}
          />
          <Button title="+" onPress={handleIncrease} />
        </View>
        <TouchableOpacity
          onPress={() => removeItem(cartItem.item.id)}
          style={styles.removeButton}
        >
          <Ionicons name="trash-outline" size={20} color="red" />
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
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
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    color: "green",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  quantityInput: {
    width: 50,
    textAlign: "center",
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 5,
  },
  removeButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  removeText: {
    marginLeft: 5,
    color: "red",
    fontWeight: "bold",
  },
});

export default CartItem;