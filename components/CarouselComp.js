import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CategoryCard from "./CategoryCard";

const CarouselComp = ({ categories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;
  const navigation = useNavigation();

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
  );
};

export default CarouselComp;

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
  carouselItem: {
    marginHorizontal: 5,
    width: 200,
  },
  itemSeparator: {
    width: 10,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
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