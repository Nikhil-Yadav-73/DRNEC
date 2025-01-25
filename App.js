// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import ItemDesc from "./pages/ItemDesc";
// import Cart from "./pages/Cart";
// // import Category from "./pages/Category";
// // import ProfilePage from "./pages/ProfilePage";
// // import Checkout from "./pages/Checkout";
// // import Posts from "./pages/Posts";
// // import NewPost from "./pages/NewPost";
// // import EditPost from "./pages/EditPost";
// // import EditProfile from "./pages/EditProfile";
// import { AuthProvider, AuthContext } from "./context/AuthContext"; // Import the AuthContext directly

// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <AuthProvider>
//         <AppNavigator />
//       </AuthProvider>
//     </NavigationContainer>
//   );
// }

// const AppNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="LoginPage" screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="LoginPage" component={LoginPage} />
//       <Stack.Screen name="SignupPage" component={SignupPage} />
//       <Stack.Screen name="HomePage" component={HomePage} />
//       <Stack.Screen name="Cart" component={Cart} />
//       <Stack.Screen name="ItemDesc" component={ItemDesc} />
//       {/* 
//         Uncomment and add the other screens you need
//         <Stack.Screen name="Category" component={Category} />
//         <Stack.Screen name="ProfilePage" component={ProfilePage} />
//         <Stack.Screen name="Checkout" component={Checkout} />
//         <Stack.Screen name="Posts" component={Posts} />
//         <Stack.Screen name="NewPost" component={NewPost} />
//         <Stack.Screen name="EditPost" component={EditPost} />
//         <Stack.Screen name="EditProfile" component={EditProfile} />
//       */}
//     </Stack.Navigator>
//   );
// };

// export default App;


import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./context/AuthContext"; 
import HomePage from "./pages/HomePage"; 
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ItemDesc from "./pages/ItemDesc";
import Cart from "./pages/Cart";

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
    </Stack.Navigator>
  );
};

export default App;
