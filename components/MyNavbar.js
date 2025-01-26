import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../context/AuthContext";
import SearchBar from "./SearchBarComp";

const MyNavbar = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("HomePage", {firstTimeToggle : false})}>
          <Text style={styles.brand}>ShopNik</Text>
        </TouchableOpacity>
        <View style={styles.iconGroup}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cart")}
            style={styles.icon}
          >
            <Ionicons name="cart-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={styles.icon}
          >
            <Ionicons name="person-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
    paddingTop: 40,
  },
  brand: {
    fontSize: 20,
    fontWeight: "bold",
    color: "navy",
  },
  iconGroup: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 16,
  },
});

export default MyNavbar;
