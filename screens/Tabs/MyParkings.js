import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchParkings } from "../../api";
import { COLORS, formatTime, TEXT_STYLES } from "../../common";
import { ParkingRecord } from "../../components";

// import SmallMap from '../../components/SmallMap'

export default function MyParkings({ navigation }) {
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
        }))
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My parking</Text>
      <View style={styles.currentParking}></View>
      <View style={styles.listContainer}>
        <FlatList
          data={parkingHistory}
          renderItem={({ item }) => (
            <ParkingRecord item={item} navigation={navigation} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: COLORS.BASE[0] },
  listContainer: { backgroundColor: COLORS.BASE[20] },
  currentParking: { padding: 10 },
  header: {
    ...TEXT_STYLES.heading.h2,
    marginLeft: "4%",
  },
});
