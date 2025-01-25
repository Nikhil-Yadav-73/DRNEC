import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";

const MyFooter = () => {
  const currentYear = new Date().getFullYear();

  const handleLinkPress = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <View style={styles.footer}>
      <Text style={styles.copyright}>
        &copy; {currentYear} ShopNik. All rights reserved.
      </Text>
      <View style={styles.socialLinks}>
        <TouchableOpacity
          onPress={() => handleLinkPress("https://www.facebook.com")}
        >
          <Text style={styles.link}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleLinkPress("https://www.linkedin.com")}
        >
          <Text style={styles.link}>LinkedIn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleLinkPress("https://www.instagram.com")}
        >
          <Text style={styles.link}>Instagram</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyFooter;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
    alignItems: "center",
  },
  copyright: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
    marginBottom: 8,
  },
  socialLinks: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  link: {
    fontSize: 14,
    color: "#007bff",
    textDecorationLine: "underline",
    marginHorizontal: 8,
  },
});