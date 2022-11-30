import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HistoryDetails,
  PitDetails,
  SignIn,
  Main,
  AddNewParking,
} from "./screens";
import getUser from "./firebase/firestore";

const Stack = createNativeStackNavigator();
const options = { headerShown: false };


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} options={options} />
        <Stack.Screen
          name="HistoryDetails"
          component={HistoryDetails}
          options={options}
        />
        <Stack.Screen
          name="PitDetails"
          component={PitDetails}
          options={options}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerTitle: "Sign in" }}
        />
        <Stack.Screen
          name="AddNewParking"
          component={AddNewParking}
          options={{ headerTitle: "Add New Parking" }}
        />
      </Stack.Navigator>
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
