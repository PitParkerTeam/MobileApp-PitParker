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

  const { longitude, latitude, name, distance, area } = pit;
  const dist = (distance / 1000).toFixed(2);
  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 24 }}>
        <View>
          <SmallMap disabled={true} location={{ longitude, latitude }} />
        </View>
        <View style={styles.pitItem}>
          <View style={styles.row}>
            <Text style={styles.name}>{name}</Text>
            <Entypo name="star" size={24} color={COLORS.TINT[100]} style={ {marginTop: 24} }/>
          </View>
          <View style={styles.row}>
            <Text>{pit.area}</Text>
            <Text style={styles.distance}>
              {dist < 1 ? `${distance} m` : `${dist} km`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.BASE[0],
    marginVertical: 4
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
