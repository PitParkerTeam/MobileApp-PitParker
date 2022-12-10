import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, MyPits, MyParkings, Account } from "./Tabs";
import { BottomTab } from "../components";
import { pitAPI, parkingAPI } from "../api";
import { userStore } from "../stores";
import { observer } from "mobx-react";
import { formatTime } from "../common";

const Tab = createBottomTabNavigator();

const Main = observer(() => {
  const handlePits = (querySnapshot) => {
    if (querySnapshot.empty) {
      userStore.setUserPits([]);
      return;
    }
    userStore.setUserPits(
      querySnapshot.docs.map((snapDoc) => ({
        ...snapDoc.data(),
        place_id: snapDoc.id,
        id: snapDoc.id,
      }))
    );
  };
  const handleParking = (querySnapshot) => {
    if (querySnapshot.empty) {
      userStore.setParkings([]);
      return;
    }
    userStore.setParkings(
      querySnapshot.docs.map((snapDoc) => ({
        ...snapDoc.data(),
        id: snapDoc.id,
      }))
    );
  };

  useEffect(() => {
    const unsubscribe = parkingAPI.fetchParkings(handleParking);
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribePits = pitAPI.fetchPits(handlePits);
    return () => {
      unsubscribePits();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      userStore.setCurrentTime(Date.now());
    }, 10000);
    return () => clearInterval(interval);
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
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
});

export default Main;
