import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SmallMap } from "../components";
import { getPit } from "../api/firestore/pit_store";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, TEXT_STYLES } from "../common";
import { Entypo } from "@expo/vector-icons";

export default function PitDetails({ route }) {
  useEffect(() => {
    const { id } = route.params;
    getPit(id).then((res) => setPit(res));
    return () => {};
  }, [route]);

  const [pit, setPit] = useState({});

  const { longitude, latitude, name, distance, area, address, rate } = pit;
  const dist = (distance / 1000).toFixed(2);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 24 }}>
          <SmallMap disabled={true} location={{ longitude, latitude }} />
        <View style={styles.pitItem}>
          <View style={styles.row}>
            <Text style={styles.name}>{name}</Text>
            <Entypo name="star" size={24} color={COLORS.TINT[100]} style={ {marginTop: 24} }/>
          </View>
          <View>
            <Text>{address}, {area}</Text>
            <Text style={styles.distance}>
              {dist < 1 ? `${distance} m` : `${dist} km`} • ${rate}/hour
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.BASE[0],
  },
  row: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  name: {
    ...TEXT_STYLES.heading.h4,
    marginTop: 24,
  },

});
