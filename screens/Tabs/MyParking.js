import { View, Text, FlatList, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchParking } from "../../firebase/parking_store";
import Moment from "moment";
import { COLORS } from "../../common/colors";
// import SmallMap from '../../components/SmallMap'

export default function MyParking() {
  const [parkingHistory, setParkingHistory] = useState([]);
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
        }))
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const HistoryBasics = ({ item }) => {
    if (!item.date || !item.location || !item.duration) return;
    return (
      <View style={style.parkingItem}>
        <Text style={style.parkingItem.title}>{item.location}</Text>
        <Text style={style.parkingItem.text}>
          {Moment(item?.date?.seconds * 1000).format("YYYY-MM-DD MM:SS")} •
          {`${item.duration} ${item.durationUnit}${item.duration > 1 ? 's' : ""}`}
        </Text>
        <Text>
          {item.plate && `plate#: ${item.plate}`}
          {item.cost && ` • cost: $${item.cost}`}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <Text style={style.header}>My parking</Text>
      <FlatList
        data={parkingHistory}
        renderItem={({ item }) => <HistoryBasics item={item} />}
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
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
      fontWeight: "700",
      marginBottom: 20,
    },
    text: {
      marginBottom: 5,
    },
  },
  header: {
    fontWeight: "700",
    fontSize: 36,
    marginLeft:"4%"
  },
});
