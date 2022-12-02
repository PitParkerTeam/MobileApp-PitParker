import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../common";
export default function PitButton({
  text,
  onPress,
  type = "normal",
  style,
  ...others
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.basic,
        styles[type],
        pressed && { opacity: 0.5 },
        style,
      ]}
      android_ripple={{ color: COLORS.LIGHT, foreground: true }}
      onPress={onPress}
      {...others}
    >
      <Text style={[styles[type].text]}>{text}</Text>
    </Pressable>
  );
}
const normalBtn = {
  height: 50,
  borderRadius: 50,
  margin: 12,
  borderWidth: 2,
  borderColor: COLORS.TINT[100],
};
const styles = StyleSheet.create({
  basic: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 14,
    marginRight: 14,
  },
  normal: {
    ...normalBtn,
    padding: 12,
    backgroundColor: COLORS.BASE[0],
    text: { fontSize: 18, color: COLORS.TINT[100] },
  },
  primary: {
    ...normalBtn,
    backgroundColor: COLORS.TINT[100],
    text: { fontSize: 18, color: COLORS.BASE[0] },
  },
  text: {
    text: {
      fontSize: 32,
      color: COLORS.BASE[0],
    },
  },
});
