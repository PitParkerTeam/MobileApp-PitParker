import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { COLORS } from "../../common";

export default function BottomContainer(props) {
  return <View style={styles.bottomTab} {...props} />;
}

const styles = StyleSheet.create({
  bottomTab: {
    borderTopWidth: 1,
    borderTopColor: COLORS.BASE[40],
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    flexDirection: "column",
  },
});
