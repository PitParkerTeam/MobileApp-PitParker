import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SmallMap from "./SmallMap";
import { COLORS, TEXT_STYLES } from "../common";
import { Entypo } from "@expo/vector-icons";

export default function MyPit({ id, pit }) {
  const navigation = useNavigation();
  function pressHandler() {
    navigation.navigate("PitDetails", { pitId: id });
  }
  return (
    <View style={styles.container}>
      <SmallMap style={styles.map} />
      <Pressable onPress={pressHandler}>
        <View style={styles.pitItem}>
          <View style={styles.row}>
            <Text style={styles.pitName}>{pit.pitName}</Text>
            <Entypo name="star" size={21} color={COLORS.TINT[100]} />
          </View>
          <View style={styles.row}>
            <Text>{pit.area}</Text>
            <Text style={styles.distance}>{pit.distance}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 24,
  },
  map: {
    height: 150,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  pitItem: {
    marginTop: 8,
  },
  pitName: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
