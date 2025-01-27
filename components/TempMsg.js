import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const TempMsg = ({ message, duration, onClose }) => {
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => onClose && onClose());  // Ensure interaction is restored when hidden
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, fadeAnim, onClose]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#4caf50',
    padding: 10,
    paddingTop: 50,
    alignItems: 'center',
    zIndex: 999,
  },
  message: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TempMsg;
