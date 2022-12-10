import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, MyPits, MyParkings, Account } from "./Tabs";
import { BottomTab } from "../components";
import { pitAPI } from "../api";
import { userStore } from "../stores";
import { observer } from "mobx-react";

const Tab = createBottomTabNavigator();

const Main = observer(()=> {
   useEffect(() => {
     const unsubscribe = pitAPI.fetchPits((querySnapshot) => {
       if (querySnapshot.empty) {
          userStore.setUserPits([])
         return;
       }
       userStore.setUserPits(
         querySnapshot.docs.map((snapDoc) => ({
           ...snapDoc.data(),
           place_id: snapDoc.id,
           id: snapDoc.id,
         }))
       );
     });
     return () => {
       unsubscribe();
     };
   }, []);
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
      <Tab.Screen name="Account" component={Account} options={{title: "Account"}}/>
    </Tab.Navigator>
  );
})

export default Main
