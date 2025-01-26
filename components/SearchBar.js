import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../context/AuthContext";

const SearchBar = () => {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const navigation = useNavigation();

  const handleSearch = async () => {
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

  const clearSearchResults = () => {
    setSearchItems([]);
    setQuery("");
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
          <TouchableOpacity onPress={clearSearchResults} style={styles.closeButton}>
            <Ionicons name="close-circle-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  resultsContainer: {
    padding: 16,
  },
  resultsHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
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
    alignItems: "center",
    marginTop: 10,
  },
});

export default SearchBar;