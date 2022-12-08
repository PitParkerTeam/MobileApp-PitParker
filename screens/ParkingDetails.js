import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SmallMap, PitButton } from "../components";
import { COLORS, formatTime, TEXT_STYLES } from "../common";
import { getParking } from "../api/firestore/parking_store";
const displayItems = [
  { label: "Park Time", content: "parkTime" },
  { label: "Duration", content: "duration" },
  { label: "Cost", content: "cost" },
  { label: "Plate", content: "plate" },
  { label: "Slot", content: "slot" },
];
const LineDisplay = ({ label, content, item }) => {
  if (!item[content]) return "";
  const durationString = item?.duration + " " + item?.durationUnit;
  const displayContent =
    content == "cost"
      ? `$${item[content]}`
      : content == "duration"
      ? durationString
      : content == "parkTime"
      ? formatTime(item[content])
      : item[content];
  return (
    <View key={content} style={styles.line}>
      <Text style={styles.line.title}>{label}</Text>
      <Text style={styles.line.content}>{displayContent}</Text>
    </View>
  );
};

export default function ParkingDetails({ route, navigation }) {
  useEffect(() => {
    const { id } = route.params;
    getParking(id).then((res) => setItem(res));
    return () => {};
  }, [route]);

  const [item, setItem] = useState({});
  const { longitude, latitude, name, notes, pitID, cost, plate, duration } =
    item;

  const parkAgain = () => {
    const params = {
      longitude,
      latitude,
      name,
      cost,
      plate,
      notes,
      duration,
    };
    navigation.navigate("AddNewParking", params);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <SmallMap location={{ longitude, latitude }} />
        <Text style={styles.name}>{name}</Text>
        <View style={styles.attrs}>
          {displayItems.map((d) => (
            <LineDisplay item={item} label={d.label} content={d.content} />
          ))}
        </View>
        {notes ? (
          <View>
            <Text style={styles.line.title}>Notes</Text>
            <Text>{notes}</Text>
          </View>
        ) : (
          ""
        )}
      </ScrollView>
      <View style={styles.bottomTab}>
        <PitButton
          style={styles.button}
          text="View Pit"
          onPress={() => navigation.navigate("PitDetails", { id: pitID })}
        />
        <PitButton
          style={styles.button}
          text="Park Again"
          onPress={parkAgain}
        />
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
  scrollView: {
    marginHorizontal: 24,
    marginVertical: 10,
  },
  bottomTab: {
    height: 150,
    borderTopWidth: 1,
    borderTopColor: COLORS.BASE[40],
    paddingTop: 12,
    paddingLeft: 4,
    paddingRight: 4,
  },
  button: {
    marginBottom: 0,
  },
  name: {
    ...TEXT_STYLES.heading.h4,
    marginTop: 24,
  },
  attrs: {
    marginTop: 20,
  },
  line: {
    title: {
      ...TEXT_STYLES.title[600],
      width: "30%",
    },
    content: {
      ...TEXT_STYLES.title[400],
    },
    marginTop: 8,
    marginBottom: 8,
    flexDirection: "row",
  },
});
