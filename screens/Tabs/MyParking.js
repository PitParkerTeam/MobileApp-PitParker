import { View, Text, FlatList, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchParking } from "../../firebase/parking_store";

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
    return (
      <View>
        <Text>123</Text>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={parkingHistory}
        renderItem={({ item }) => <HistoryBasics item={item} />}
      />
    </SafeAreaView>
  );
}
