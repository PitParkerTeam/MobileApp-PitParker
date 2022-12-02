import { View, Text, SafeAreaView } from "react-native";
import React from "react";

export default function ParkingDetails({ route, navigation }) {
  const{item} = route.params
  return (
    <SafeAreaView>
      <Text>ParkingDetails</Text>
      <Text></Text>
    </SafeAreaView>
  );
}
