import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, MyPits, MyParkings, Account } from "./Tabs";
import { BottomTab } from "../components";
const Tab = createBottomTabNavigator();

export default function Main() {

  


  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTab {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="SavedPits"
        component={MyPits}
        options={{ title: "My Pits" }}
      />
      <Tab.Screen
        name="MyParking"
        component={MyParkings}
        options={{ title: "My Parking" }}
      />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}
