import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SmallMap } from "../components";
import { getPit } from "../api/firestore/pit_store";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, TEXT_STYLES, formatTime } from "../common";
import { Entypo } from "@expo/vector-icons";
import { fetchParkings } from "../api/firestore/parking_store";

export default function PitDetails({ route }) {
  const { id } = route.params;
  useEffect(() => {
    // const { id } = route.params;
    getPit(id).then((res) => setPit(res));
    return () => {};
  }, [route]);

  const [parkingHistory, setParkingHistory] = useState([]);

  useEffect(() => {
    const unsubscribe = fetchParkings((querySnapshot) => {
      if (querySnapshot.empty) {
        setParkingHistory([]);
        return;
      }
      setParkingHistory(
        querySnapshot.docs.map((snapDoc) => ({
          ...snapDoc.data(),
          id: snapDoc.id,
          parkTime: formatTime(snapDoc.parkTime),
          pitId: snapDoc.data().pitId,
        }))
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const pitParkingHistory = parkingHistory.filter(obj => obj.pitId == id)
  const [pit, setPit] = useState({});

  // const onPressHandler = () => {
  //   console.log(id);
  //   console.log(pitParkingHistory);
  // };

  const { longitude, latitude, name, distance, area, address, rate } = pit;
  const dist = (distance / 1000).toFixed(2);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 24 }}>
        <SmallMap disabled={true} location={{ longitude, latitude }} />
        <View style={styles.pitItem}>
          <View style={styles.row}>
            <Text style={styles.name}>{name}</Text>
            <Entypo
              name="star"
              size={24}
              color={COLORS.TINT[100]}
              style={{ marginTop: 14 }}
            />
          </View>
          <View>
            <Text style={styles.content}>
              {address}, {area}
            </Text>
            <Text style={styles.content}>
              {dist < 1 ? `${distance} m` : `${dist} km`} • ${rate}/hour
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.historyTitle}>Parking History</Text>
        </View>
        <ScrollView>
          <View>
            
          </View>
        </ScrollView>
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
    ...TEXT_STYLES.heading.h3,
    marginTop: 14,
  },
  content: {
    marginTop: 2,
    ...TEXT_STYLES.title[300],
  },
  historyTitle: {
    ...TEXT_STYLES.title[700],
    marginTop: 50,
  },
});
