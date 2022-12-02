import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SmallMap from "./SmallMap";

export default function MyPit({ id, pit }) {
  const navigation = useNavigation();
  function pressHandler() {
    navigation.navigate("PitDetails", { pitId: id });
  }
  const [myPits, setMyPits] = useState([]);
  // const onAdd = function ()
  return (
    <View style={styles.container}>
      <SmallMap style={styles.map} />
      <Pressable onPress={pressHandler}>
        <View style={styles.pitItem}>
          <View style={styles.row}>
            <Text>{pit.pitName}</Text>
            <Text>{pit.fav}</Text>
          </View>
          <Text>{pit.distance}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin:24,
  },
  map: {
    height: 150,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
