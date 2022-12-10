import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { SmallMap } from "../maps";
import { COLORS, TEXT_STYLES, calculateDistance } from "../../common";
import { Entypo } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import { userStore } from "../../stores";

const MyPit = observer(({ pit, navigation }) => {
  const dist = (pit.distance / 1000).toFixed(2);
  const { longitude, latitude, name, vicinity } = pit;
  
  return (
    <Pressable
      onPress={() => navigation.navigate("PitDetails", { id: pit.id })}
      style={styles.container}
    >
      <SmallMap
        disabled={true}
        style={styles.map}
        location={{ longitude, latitude }}
      />
      <View style={styles.pitItem}>
        <View style={styles.row}>
          <Text style={styles.pitName}>{name}</Text>
          <Entypo name="star" size={24} color={COLORS.TINT[100]} />
        </View>
        <View style={styles.row}>
          <Text>{vicinity || ""}</Text>
          <Text style={styles.distance}>
            {dist < 1 ? `${pit.distance} m` : `${dist} km`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
});

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

export default MyPit;
