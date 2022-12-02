import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchParking } from "../../firebase/parking_store";
import { COLORS, TEXT_STYLES } from "../../common";
import { HistoryParking } from "../../components";
import Moment from "moment";

// import SmallMap from '../../components/SmallMap'

export default function MyParking({ navigation }) {
  const [parkingHistory, setParkingHistory] = useState([]);
  const formatTimestamp = (timestamp) =>
    Moment(timestamp.seconds * 1000).format("YYYY-MM-DD MM:SS");
  useEffect(() => {
    const unsubscribe = fetchParking((querySnapshot) => {
      if (querySnapshot.empty) {
        setParkingHistory([]);
        return;
      }
      setParkingHistory(
        querySnapshot.docs.map((snapDoc) => ({
          ...snapDoc.data(),
          id: snapDoc.id,
          dateString: formatTimestamp(snapDoc.data().timestamp),
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
            <HistoryParking item={item} navigation={navigation} />
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
