import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { COLORS, formatTimestamp, TEXT_STYLES } from "../../common";

export default function ParkingRecord({ item, navigation }) {
  if (!item.startTime || !item.longitude || !item.latitude || !item.duration)
    return;
  const coordString = `${Math.round(item.latitude * 1000) / 1000}, ${
    Math.round(item.longitude * 1000) / 1000
  }`;
  return (
    <Pressable
      onPress={() => navigation.navigate("ParkingDetails", { id: item.id })}
      style={styles.parkingItem}
    >
      <Text style={styles.parkingItem.title}>
        {`Parking @ ${item.name || coordString}`}
      </Text>
      <Text style={styles.parkingItem.text}>
        {formatTimestamp(item.startTime)} • {item.duration}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  parkingItem: {
    height: 160,
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
