import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { userParkingSnapshot } from "../../firebase/parkingStore";

// import SmallMap from '../../components/SmallMap'

export default function History() {
  const [parkingHistory, setParkingHistory] = useState([]);
  useEffect(() => {
    const unsubscribe = userParkingSnapshot((querySnapshot) => {
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
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={parkingHistory}
        renderItem={({ item }) => <HistoryBasics item={item} />}
      />
    </View>
  );
}
