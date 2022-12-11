import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BottomContainer, PitButton, SmallMap } from "../components";
import { COLORS, TEXT_STYLES, formatTimestamp } from "../common";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { pitAPI } from "../api";
import { observer } from "mobx-react";
import { pitStore, userStore } from "../stores";
import { showLocation } from "react-native-map-link";

const HistoryItem = ({ item }) => {
  return (
    <Pressable
      onPress={() => navigation.navigate("ParkingDetails", { id: item.id })}
      style={styles.historyList}
    >
      <View style={styles.historyContent}>
        <Text style={styles.historyTime}>
          {formatTimestamp(item.startTime)}
        </Text>
        <Text style={styles.historyText}> • </Text>
        <Text style={styles.historyText}>{item.duration}</Text>
      </View>
      <Icon name="chevron-right" size={16} color={COLORS.BASE[100]} />
    </Pressable>
  );
};

const PitDetails = observer(({ route, navigation }) => {
  const { id } = route.params;
  useEffect(() => {
    pitAPI.getPit(id).then((res) => setPit({ ...res, id }));
    return () => {};
  }, [route]);

  const pitParkingHistory = userStore.parkings.filter((obj) => obj.pitID == id);
  const [pit, setPit] = useState({});
  const { longitude, latitude, name, vicinity } = pit;
  const dist = userStore.getCurrentDistance({ longitude, latitude });
  const pitName = !name
    ? `Pit @${Math.round(latitude * 1000) / 1000},${
        Math.round(longitude * 1000) / 1000
      }`
    : name;

  const getDirections = () => {
    showLocation({
      longitude,
      latitude,
      sourceLatitude: userStore.userLocation.latitude,
      sourceLongitude: userStore.userLocation.longitude,
      googleForceLatLon: false,
      alwaysIncludeGoogle: true,
      title: name,
      dialogTitle: "Get Directions",
      appsWhiteList: ["google-maps", "apple-maps"],
      dialogMessage: "",
      naverCallerName: "com.example.myapp",
      directionsMode: "drive",
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <SmallMap location={{ longitude, latitude }} />
        <View style={styles.pitItem}>
          <View style={styles.row}>
            <Text style={styles.name}>{pitName}</Text>
            <Icon
              name={pitStore.isUserPit(id) ? "star" : "star-outline"}
              size={30}
              color={COLORS.TINT[100]}
              onPress={() => pitStore.toggleSavePit(pit)}
            />
          </View>
          {vicinity && <Text style={styles.content}>{vicinity}</Text>}
          <Text style={styles.content}>{dist}</Text>
        </View>
        {pitParkingHistory.length > 0 && (
          <Text style={styles.historyTitle}>Parking History</Text>
        )}
        {pitParkingHistory.map((item) => (
          <HistoryItem item={item} key={item.id} />
        ))}
      </ScrollView>
      <BottomContainer>
        <PitButton
          text="Get Directions"
          style={styles.button}
          onPress={getDirections}
        />
        <PitButton
          text="Park Here"
          type="primary"
          style={styles.button}
          onPress={() => navigation.navigate("AddNewParking", pit)}
        />
      </BottomContainer>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.BASE[0],
  },
  scrollView: {
    marginVertical: 4,
    paddingHorizontal: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  name: {
    ...TEXT_STYLES.heading.h4,
    width: "80%",
  },
  content: {
    ...TEXT_STYLES.title[300],
  },
  historyContainer: {
    marginTop: 10,
  },
  historyTitle: {
    ...TEXT_STYLES.title[700],
    marginTop: 50,
    marginBottom: 21,
  },
  historyList: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderColor: COLORS.BASE[40],
    borderWidth: 1,
    height: 52,
    alignItems: "center",
    marginTop: -1,
  },
  historyContent: {
    flexDirection: "row",
  },
  historyTime: {
    ...TEXT_STYLES.base[700],
    width: 146,
  },

  historyText: {
    ...TEXT_STYLES.base[700],
  },
  button: {
    marginBottom: 0,
  },
});
export default PitDetails;
