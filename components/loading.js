import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Loading = () => {
  return (
    <LinearGradient
      colors={['pink', 'blue']}
      style={styles.container}
    >
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#fff" style={styles.spinner} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Loading;