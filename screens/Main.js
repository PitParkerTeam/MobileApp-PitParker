import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Favorites, History, ProfileSettings } from "./Tabs";

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Saved Pits" component={Favorites} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Profile" component={ProfileSettings} />
    </Tab.Navigator>
  );
}