import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import AuthContext from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const PrivateRoute = (Component) => {
  return (props) => {
    const { authTokens, loading } = useContext(AuthContext);
    const navigation = useNavigation();

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      );
    }

    if (!authTokens) {
      navigation.navigate("LoginPage");
      return null;
    }

    return <Component {...props} />;
  };
};

export default PrivateRoute;