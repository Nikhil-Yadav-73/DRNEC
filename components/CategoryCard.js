import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const color_list = [
  'blue', // bg-primary
  'gray', // bg-secondary
  'green', // bg-success
  'red', // bg-danger
  'yellow', // bg-warning
  'cyan', // bg-info
  'lightgray', // bg-light
  'black', // bg-dark
];

function CategoryCard({ id, category }) {
  const navigation = useNavigation();

  const bgColor = color_list[id % color_list.length];

  const textColor = ['lightgray', 'yellow'].includes(bgColor) ? 'black' : 'white';

  const handlePress = () => {
    // Navigate to the category page with category name as parameter
    navigation.navigate('Category', { categoryName: category });
  };

  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <TouchableOpacity onPress={handlePress} style={styles.cardBody}>
        <Text style={[styles.cardTitle, { color: textColor }]}>{category}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  cardBody: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CategoryCard;