import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
// import ItemDesc from "./pages/ItemDesc";
// import Category from "./pages/Category";
// import Cart from "./pages/Cart";
// import ProfilePage from "./pages/ProfilePage";
// import Checkout from "./pages/Checkout";
// import Posts from "./pages/Posts";
// import NewPost from "./pages/NewPost";
// import EditPost from "./pages/EditPost";
// import EditProfile from "./pages/EditProfile";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";

const Stack = createNativeStackNavigator();

function App() {
  return (<NavigationContainer>
    <AuthProvider>
      
        <Stack.Navigator initialRouteName="LoginPage" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="SignupPage" component={SignupPage} />

          <Stack.Screen name="HomePage" component={PrivateRoute(HomePage)} />
          {/* <Stack.Screen name="ItemDesc" component={PrivateRoute(ItemDesc)} />
          <Stack.Screen name="Category" component={PrivateRoute(Category)} />
          <Stack.Screen name="Cart" component={PrivateRoute(Cart)} />
          <Stack.Screen name="ProfilePage" component={PrivateRoute(ProfilePage)} />
          <Stack.Screen name="Checkout" component={PrivateRoute(Checkout)} />
          <Stack.Screen name="Posts" component={PrivateRoute(Posts)} />
          <Stack.Screen name="NewPost" component={PrivateRoute(NewPost)} />
          <Stack.Screen name="EditPost" component={PrivateRoute(EditPost)} />
          <Stack.Screen name="EditProfile" component={PrivateRoute(EditProfile)} /> */}
        </Stack.Navigator>
      
    </AuthProvider></NavigationContainer>
  );
}

export default App;