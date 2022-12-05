import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { COLORS, TEXT_STYLES } from "../common";


export default function ParkingRecord({ item, navigation }) {
  if (!item.parkTime || !item.longitude || !item.latitude || !item.duration ) return;
  return (
    <View style={styles.parkingItem}>
      <Text style={styles.parkingItem.title}>{item.name}</Text>
      <Pressable
        onPress={() => navigation.navigate("ParkingDetails", { item })}
      >
        <Text style={styles.parkingItem.text}>
          {item.parkTime} •
          {`${item.duration} ${item.durationUnit}${
            item.duration > 1 ? "s" : ""
          }`}
        </Text>
        <Text>
          {item.plate && `plate#: ${item.plate}`}
          {item.cost && ` • cost: $${item.cost}`}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  parkingItem: {
    height: 150,
    marginTop: 6,
    marginBottom: 6,
    padding: "4%",
    width: "100%",
    backgroundColor: COLORS.BASE[0],
    borderColor: COLORS.BASE[40],
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    title: {
      ...TEXT_STYLES.base[700],
      marginBottom: 20,
    },
    text: {
      marginBottom: 5,
    },
  },
});