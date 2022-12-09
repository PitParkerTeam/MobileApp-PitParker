import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SmallMap } from "../components";
import { getPit } from "../api/firestore/pit_store";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, TEXT_STYLES, formatTime } from "../common";
import { Entypo } from "@expo/vector-icons";
import { fetchParkings } from "../api/firestore/parking_store";
import { ParkingRecord } from "../components";

export default function PitDetails({ route, navigation }) {
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
          duration: snapDoc.data().duration,
          durationUnit: snapDoc.data().durationUnit,
        }))
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const pitParkingHistory = parkingHistory.filter((obj) => obj.pitId == id);
  const [pit, setPit] = useState({});

  // const Item = ({ item }) => {
  //   <View style={styles.historyList}>
  //     <Pressable
  //       onPress={() => navigation.navigate("ParkingDetails", { id: item.id })}
  //     >
  //       <Text>
  //         {item.parkTime} •
  //         {`${item.duration} ${item.durationUnit}${
  //           item.duration > 1 ? "s" : ""
  //         }`}
  //       </Text>
  //     </Pressable>
  //   </View>;
  // };
  // const onPressHandler = () => {
  //   console.log(id);
  //   console.log(pitParkingHistory);
  // };
  // const renderItem = ({ item }) => {}
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
        <View style={styles.historyContainer}>
          {/* <Pressable onPress={onPressHandler}>
            <Text>test</Text>
          </Pressable> */}
          {/* <FlatList
            data={pitParkingHistory}
            renderItem={({ item }) => <ParkingRecord item={item} />}
          ></FlatList> */}
          <ScrollView>
            {pitParkingHistory.map((item) => {
              return (
                <View>
                  <Pressable
                    onPress={() =>
                      navigation.navigate("ParkingDetails", { id: item.id })
                    }
                  >
                    <View style={styles.historyList}>
                      <Text style={styles.historyContent}>
                        {item.parkTime} •
                        {`${item.duration} ${item.durationUnit}${
                          item.duration > 1 ? "s" : ""
                        }`}
                      </Text>
                      <Entypo name="chevron-right" size={16} color="black" />
                    </View>
                  </Pressable>
                </View>
              );
            })}
          </ScrollView>
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
    ...TEXT_STYLES.heading.h3,
    marginTop: 14,
  },
  content: {
    marginTop: 2,
    ...TEXT_STYLES.title[300],
  },
  historyContainer: {
    height: 200,
    backgroundColor: "aqua",
  },
  historyTitle: {
    ...TEXT_STYLES.title[700],
    marginTop: 50,
  },
  historyList: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 8,
    // marginBottom: 8,
    borderColor: COLORS.BASE[40],
    borderWidth: 1,
    // borderLeftWidth: 0,
    // borderRightWidth: 0,
    // height: 30,
    // ...COLORS.BASE[100],
  },
  historyContent: {
    fontSize: 14,
    fontWeight: "600",
  }
  // parkingItem: {
  //   height: 130,
  //   marginTop: 6,
  //   marginBottom: 6,
  //   padding: "4%",
  //   width: "100%",
  //   backgroundColor: COLORS.BASE[0],
  //   borderColor: COLORS.BASE[40],
  //   borderWidth: 1,
  //   borderLeftWidth: 0,
  //   borderRightWidth: 0,
  //   title: {
  //     ...TEXT_STYLES.base[700],
  //     marginBottom: 20,
  //   },
  //   text: {
  //     marginBottom: 5,
  //   },
  // },
});
