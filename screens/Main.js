import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Favorites, History, Account } from "./Tabs";
import { BottomTab } from "../components";
const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTab {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Saved Pits" component={Favorites} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}
