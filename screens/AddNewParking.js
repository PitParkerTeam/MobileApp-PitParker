import { View, Text, TextInput } from "react-native";
import React from "react";
import LocationCard from "../components/LocationCard";
import PitButton from "../components/PitButton";

export default function AddNewParking() {
  return (
    <View>
      <LocationCard />
      <Text>Parking Time *</Text>
      <TextInput></TextInput>
      <Text>Duration *</Text>
      <TextInput></TextInput>
      <Text>Plate</Text>
      <TextInput></TextInput>
      <Text>Cost</Text>
      <TextInput></TextInput>
      <Text>Slot</Text>
      <TextInput></TextInput>
      <Text>Image</Text>
      {/* <Image /> */}
      <PitButton />

      <Text>Notes</Text>
      <TextInput></TextInput>
      <PitButton />
    </View>
  );
}
