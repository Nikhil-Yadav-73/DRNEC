import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import AuthContext from "../context/AuthContext";
import MyNavbar from "../components/MyNavbar";
import MyFooter from "../components/MyFooter";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { SearchBar } from "react-native-screens";
import Gender from "../components/Gender";

const HomePage = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  const [homeItems, setHomeItems] = useState([]);
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    getCategories();
    getHomeItems();
  }, []);

  const getHomeItems = async () => {
    try {
      const response = await fetch("http://192.168.1.8:8000/api/items/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setHomeItems(Array.isArray(data.results) ? data.results : []);
      } else {
        handleFetchError(response);
      }
    } catch (error) {
      console.error("Error fetching home items:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch("http://192.168.1.8:8000/api/categories/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(Array.isArray(data.results) ? data.results : []);
      } else {
        handleFetchError(response);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleFetchError = (response) => {
    if (response.status === 401) {
      logoutUser();
    } else {
      Alert.alert("Error", "Something went wrong! Try logging in again.");
    }
  };

  const nextSlide = () => {
    if (currentIndex + itemsPerPage < categories.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MyNavbar />
      <SearchBar navigation={ navigation } />
      
      <View style={styles.carouselContainer}>
        <TouchableOpacity onPress={prevSlide} style={styles.carouselButton}>
          <Text style={styles.carouselButtonText}>&#8249;</Text>
        </TouchableOpacity>
        <FlatList
          horizontal
          data={categories.slice(currentIndex, currentIndex + itemsPerPage)}
          renderItem={({ item }) => (
            <View style={styles.carouselItem}>
              <CategoryCard key={item.id} id={item.id} category={item.name} />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
        <TouchableOpacity onPress={nextSlide} style={styles.carouselButton}>
          <Text style={styles.carouselButtonText}>&#8250;</Text>
        </TouchableOpacity>
      </View>

      <Gender navigation={navigation}/>

      <View style={styles.productGrid}>
        {homeItems.map((homeItem) => (
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