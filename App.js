import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./context/AuthContext"; 
import HomePage from "./pages/HomePage"; 
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ItemDesc from "./pages/ItemDesc";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import ProfilePage from "./pages/ProfilePage";
import EditProfile from "./pages/EditProfile";
import Checkout from "./pages/Checkout";
import GenderProducts from "./pages/GenderProducts";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <AuthProvider> 
        <AppNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LoginPage" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="SignupPage" component={SignupPage} />
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="ItemDesc" component={ItemDesc} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="Profile" component={ProfilePage} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="GenderProducts" component={GenderProducts} />
    </Stack.Navigator>
  );
};

export default App;
