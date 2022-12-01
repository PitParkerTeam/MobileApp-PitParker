import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Favorites, History, Account } from "./Tabs";
import { BottomTab } from "../components";
const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTab {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="SavedPits"
        component={Favorites}
        options={{ title: "My Pits" }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{ title: "My Parking" }}
      />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}
