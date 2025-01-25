import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import AuthContext from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const MyNavbar = () => {
  const { authTokens, logoutUser, user } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [searchCategories, setSearchCategories] = useState([]);
  const [searchPosts, setSearchPosts] = useState([]);
  const navigation = useNavigation();

  const handleSearch = async () => {
    await Promise.all([
      handleSearchItems(),
      handleSearchCategories(),
      handleSearchPosts(),
    ]);
  };

  const clearSearchResults = () => {
    setSearchItems([]);
    setQuery("");
  };

  const handleSearchItems = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.8:8000/api/search_items/?query=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSearchItems(data.results);
      } else {
        if (response.statusText === "Unauthorized") logoutUser();
        else Alert.alert("Error", "Something went wrong! Try logging in again.");
      }
    } catch (error) {
      console.error("Error fetching search items:", error);
    }
  };

  const handleSearchCategories = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.8:8000/api/search_categories/?query=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSearchCategories(data.results);
      } else {
        if (response.statusText === "Unauthorized") logoutUser();
        else Alert.alert("Error", "Something went wrong! Try logging in again.");
      }
    } catch (error) {
      console.error("Error fetching search categories:", error);
    }
  };

  const handleSearchPosts = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.8:8000/api/search_posts/?query=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSearchPosts(data.results);
      } else {
        if (response.statusText === "Unauthorized") logoutUser();
        else Alert.alert("Error", "Something went wrong! Try logging in again.");
      }
    } catch (error) {
      console.error("Error fetching search posts:", error);
    }
  };

  const renderSearchItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ItemDesc", { productId: item.id })}
      style={styles.searchItem}
    >
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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

      // search bar and results baad mein component mein laane hain

      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={query}
          onChangeText={(text) => setQuery(text)}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Ionicons name="search-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {searchItems.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsHeader}>
            Search results for '{query}'
          </Text>
          <FlatList
            data={searchItems}
            renderItem={renderSearchItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.resultsList}
          />
        </View>
      )}


      {searchItems.length > 0 && (
        <TouchableOpacity onPress={clearSearchResults} style={styles.closeButton}>
          <Ionicons name="close-circle-outline" size={24} color="#000" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MyNavbar;

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
    paddingTop: 30,
  },
  brand: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  iconGroup: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 16,
  },
  searchBar: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  searchInput: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 4,
  },
  resultsHeader: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 16,
  },
  resultsList: {
    paddingHorizontal: 16,
  },
  searchItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    color: "#777",
  },
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});