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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.categorySection}>

        <View style={styles.categoryRow}>
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('GenderProducts', { gender: "men" })}
          >
            <Text style={styles.categoryText}>Men's</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('GenderProducts', { gender: 'women' })}
          >
            <Text style={styles.categoryText}>Women's</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryRow}>
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('GenderProducts', { gender: 'boys' })}
          >
            <Text style={styles.categoryText}>Boys</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('GenderProducts', { gender: 'girls' })}
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
    paddingHorizontal: 10,
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
});

export default Gender;