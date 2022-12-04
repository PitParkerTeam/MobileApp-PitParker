import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { SmallMap, PitButton } from "../components";
import { COLORS, TEXT_STYLES } from "../common";

export default function ParkingDetails({ route, navigation }) {
  const { item } = route.params;
  const { longitude, latitude, name, notes, image } = item;
  const displayItems = [
    { label: "Park Time", content: "dateString" },
    { label: "Duration", content: "duration" },
    { label: "Cost", content: "cost" },
    { label: "Plate", content: "plate" },
  ];

  const lineDisplay = ({ label, content }) => {
    if (!item[content]) return "";
    const durationString = item?.duration + " " + item?.durationUnit;
    const displayContent =
      content == "cost"
        ? `$${item[content]}`
        : content == "duration"
        ? durationString
        : item[content];
    return (
      <View key={content} style={styles.line}>
        <Text style={styles.line.title}>{label}</Text>
        <Text style={styles.line.content}>{displayContent}</Text>
      </View>
    );
  };
  const viewPit = () => {};
  const parkAgain = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <SmallMap location={{ longitude, latitude }} />
        <Text style={styles.name}>{name}</Text>
        <View style={styles.attrs}>
          {displayItems.map((d) => lineDisplay(d))}
        </View>
        {notes ? (<View></View>) : ""}
      </ScrollView>
      <View style={styles.bottomTab}>
        <PitButton style={styles.button} text="View Pit" onPres={viewPit} />
        <PitButton style={styles.button} text="Park Again" onPres={parkAgain} />
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
    marginVertical:10
  },
  bottomTab: {
    height: 150,
    borderTopWidth: 1,
    borderTopColor: COLORS.BASE[40],
    paddingTop:12,
    paddingLeft:4,
    paddingRight:4,
  },
  button: {
    marginBottom:0,
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
