import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, ScrollView, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AuthContext from "../context/AuthContext";
import MyNavbar from "../components/MyNavbar";
import MyFooter from "../components/MyFooter";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import SearchBarComp from "../components/SearchBarComp";
import Gender from "../components/Gender";
import { useNavigation } from "@react-navigation/native";
import CarouselComp from "../components/CarouselComp";
import TempMsg from "../components/TempMsg";

const HomePage = ({ route }) => {
  const [categories, setCategories] = useState([]);
  const [homeItems, setHomeItems] = useState([]);
  const [showAnimation, setShowAnimation] = useState(route.params.firstTimeToggle);
  const { user, authTokens, logoutUser } = useContext(AuthContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(1);
  const {checkoutSuccess} = route.params;
  const [showMessage, setShowMessage] = useState(checkoutSuccess);
  const [addToCart, setAddToCart] = useState(false);

  useEffect(() => {
    if (showAnimation) {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => setShowAnimation(false));
      }, 3000);
    }
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

  const handleAddToCart = async (productId) => {
    try {
      const response = await fetch(`http://192.168.1.8:8000/api/items/add_to_cart/${user.user_id}/${productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        setAddToCart(true);
        setTimeout(() => setAddToCart(false), 1300);
      } else {
        console.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
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

  if (showAnimation) {
    return (
      <Animated.View style={{ ...styles.overlay, opacity: fadeAnim }}>
        <LinearGradient colors={["blue", "pink"]} style={styles.gradient}>
          <Text style={styles.animationText}>ShopNik</Text>
        </LinearGradient>
      </Animated.View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MyNavbar />
      {showMessage && <TempMsg message="Checkout Successful !" duration={2500} onClose={() => setShowMessage(false)}/>}
      {addToCart && <TempMsg message="Added to Cart !" duration={2000} onClose={() => setAddToCart(false)}/>}
      <SearchBarComp />

      <CarouselComp categories={categories}/>

      <Gender navigation={navigation} />

      {/* <View style={styles.productGrid}>
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
      </View> */}

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
            onAddToCart={handleAddToCart} // Pass the function
          />
        ))}
      </View>

      <MyFooter />
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animationText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
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
    paddingTop: 10,
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
});