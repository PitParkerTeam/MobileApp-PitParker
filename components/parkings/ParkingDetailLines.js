import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TEXT_STYLES, formatTime } from "../../common";

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
    <View style={styles.line}>
      <Text style={styles.line.title}>{label}</Text>
      <Text style={styles.line.content}>{displayContent}</Text>
    </View>
  );
};

export default ParkingDetailLines = ({ item }) => {
  return (
    <View style={styles.attrs}>
      {displayItems.map((d) => (
        <LineDisplay
          item={item}
          label={d.label}
          content={d.content}
          key={d.content}
        />
      ))}
    </View>
  );
};


const styles = StyleSheet.create({
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
