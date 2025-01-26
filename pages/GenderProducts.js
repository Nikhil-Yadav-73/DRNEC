import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import AuthContext from "../context/AuthContext";
import MyNavbar from "../components/MyNavbar";
import MyFooter from "../components/MyFooter";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { SearchBar } from "react-native-screens";
import Gender from "../components/Gender";
import { useNavigation } from '@react-navigation/native';

const HomePage = ({route}) => {
  const [items, setItems] = useState([]);
  const [unisexItems, setUnisexItems] = useState([]);
  const { authTokens, logoutUser } = useContext(AuthContext);
  const {gender} = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    getItems();
  }, []);

  const handleFetchError = (response) => {
      if (response.status === 401) {
        logoutUser();
      } else {
        Alert.alert("Error", "Something went wrong! Try logging in again.");
      }
    };

    const getItems = async () => {
      try {
        const response = await fetch(`http://192.168.1.8:8000/api/gender/${gender}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("data: ", data)
          setItems(Array.isArray(data.items) ? data.items : []);
          setUnisexItems(Array.isArray(data.unisex_items) ? data.unisex_items : []);
        } else {
          handleFetchError(response);
        }
      } catch (error) {
        console.error("Error fetching home items:", error);
      }
    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MyNavbar />
      
      {/* <Gender navigation={navigation}/> */}

      <View style={styles.productGrid}>
        {items.map((homeItem) => (
          <ProductCard
            key={homeItem.id}
            id={homeItem.id}
            name={homeItem.name}
            price={homeItem.price}
            image={homeItem.image}
            rating={homeItem.rating}
            reviews={homeItem.reviews}
            link1={homeItem.link1}
            link2={homeItem.link2}
          />
        ))}
      </View>
      <Text>Unisex Items</Text>
      <View style={styles.productGrid}>
        {unisexItems.map((homeItem) => (
          <ProductCard
            key={homeItem.id}
            id={homeItem.id}
            name={homeItem.name}
            price={homeItem.price}
            image={homeItem.image}
            rating={homeItem.rating}
            reviews={homeItem.reviews}
            link1={homeItem.link1}
            link2={homeItem.link2}
          />
        ))}
      </View>

      <MyFooter />
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  carouselItem: {
    marginHorizontal: 5,
  },
  itemSeparator: {
    width: 10,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingBottom: 16,
  },
  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    paddingTop:10,
  },
  carousel: {
    paddingHorizontal: 8,
  },
  carouselButton: {
    padding: 8,
  },
  carouselButtonText: {
    fontSize: 24,
    color: "#333",
  },
  productGrid: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  searchcomponent: {
    paddingTop: 2,
    paddingBottom: 2,
  },
});