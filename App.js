import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ParkingDetails,
  PitDetails,
  Login,
  Signup,
  Main,
  AddNewParking,
} from "./screens";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase-setup";

const Stack = createNativeStackNavigator();
const options = { headerShown: false };

export default function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserAuthenticated(true);
      } else {
        setIsUserAuthenticated(false);
      }
    });
  });
  const AuthStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    );
  };
  const AppStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Main} options={options} />
      <Stack.Screen
        name="ParkingDetails"
        component={ParkingDetails}
        options={options}
      />
      <Stack.Screen
        name="PitDetails"
        component={PitDetails}
        options={options}
      />
      <Stack.Screen
        name="AddNewParking"
        component={AddNewParking}
        options={{ headerTitle: "Add New Parking" }}
      />
    </Stack.Navigator>
  );
  return (
    <NavigationContainer>
      {isUserAuthenticated ? AppStack() : AuthStack()}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
