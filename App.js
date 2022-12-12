import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ParkingDetails,
  PitDetails,
  Login,
  Signup,
  Main,
  AddNewParking,
  ChangePassword,
} from "./screens";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api";
import * as Notifications from "expo-notifications";
import { TEXT_STYLES } from "./common";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

const Stack = createNativeStackNavigator();

export default function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const hideHeader = { headerShown: false };
  const headerWithTitle = {
    headerBackTitleVisible: false,
    headerTitleStyle: styles.headerTitle,
    headerStyle: styles.header
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserAuthenticated(true);
      } else {
        setIsUserAuthenticated(false);
      }
    });
  });
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
      }
    );
    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      async (notificationResponse) => {

      }
    );
    return () => {
      subscription.remove();
      subscription2.remove();
    };
  });

  const AuthStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown:false
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    );
  };
  const AppStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Main} options={hideHeader} />
      <Stack.Screen
        name="ParkingDetails"
        component={ParkingDetails}
        options={{
          headerTitle: "Parking Details",
          ...headerWithTitle,
        }}
      />
      <Stack.Screen
        name="PitDetails"
        component={PitDetails}
        options={{
          headerTitle: "Pit Details",
          ...headerWithTitle,
        }}
      />
      <Stack.Screen
        name="AddNewParking"
        component={AddNewParking}
        options={{
          headerTitle: "Add New Parking",
          ...headerWithTitle,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerTitle: "Change Password",
          ...headerWithTitle,
        }}
      />
    </Stack.Navigator>
  );
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      {isUserAuthenticated ? AppStack() : AuthStack()}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    
  },
  headerTitle: {
    ...TEXT_STYLES.heading.h4
  }
});
