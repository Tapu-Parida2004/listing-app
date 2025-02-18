import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack"; // Importing Stack navigator
import { NavigationContainer } from "@react-navigation/native"; // Importing Navigation container
import { ActivityIndicator, View } from "react-native"; // Importing loading indicator and view components
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importing AsyncStorage for persistent storage
import { Ionicons } from "@expo/vector-icons"; // Importing Ionicons for icons

// screens import
import Register from "../screens/Register";
import Listing from "../screens/Listing";
import Details from "../screens/Details";
import Login from "../screens/Login";
import Settings from "../screens/Settings";

const Stack = createStackNavigator(); // Creating the stack navigator instance

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // State to check login status

  useEffect(() => {
    const checkLoginStatus = async () => {
      // Function to check if the user is logged in using AsyncStorage
      const user = await AsyncStorage.getItem("user");
      setIsLoggedIn(!!user); // Setting the state based on whether the user is logged in or not
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    // Loading state when the login status is being checked
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? "Listing" : "Login"}// Conditionally set the initial route based on login status
        screenOptions={{
          headerStyle: {
            backgroundColor: "#007AFF",
            shadowColor: "transparent",
            elevation: 0,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 22,
          },
          headerLeft: () => (
            <Ionicons
              name="menu-outline"
              size={24}
              color="#fff"
              style={{ marginLeft: 15 }}// Style for the menu icon
            />
          ),
        }}
      >
        {/* Stack Screens */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="Listing"
          component={Listing}
          options={{ title: "Listing" }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{ title: "Details" }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ title: "Settings" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
