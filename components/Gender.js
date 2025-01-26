import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  ActivityIndicator, 
  FlatList 
} from 'react-native';

const Gender = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  let counter = 0;

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.categorySection}>
        <Text style={styles.sectionTitle}>Shop by Category</Text>

        <View style={styles.categoryRow}>
          <TouchableOpacity
            style={styles.categoryCard}
            // onPress={() => navigation.navigate('Category', { category: 'Mens' })}
          >
            <Text style={styles.categoryText}>Men's</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryCard}
            // onPress={() => navigation.navigate('Category', { category: 'Womens' })}
          >
            <Text style={styles.categoryText}>Women's</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryRow}>
          <TouchableOpacity
            style={styles.categoryCard}
            // onPress={() => navigation.navigate('Category', { category: 'Kids' })}
          >
            <Text style={styles.categoryText}>Boys</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryCard}
            // onPress={() => navigation.navigate('Category', { category: 'Accessories' })}
          >
            <Text style={styles.categoryText}>Girls</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categorySection: {
    padding: 15,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  categoryCard: {
    backgroundColor: '#f8f8f8',
    width: '48%',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownModal: {
    justifyContent: 'flex-start',
    margin: 0,
    marginTop: 70,
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Gender;