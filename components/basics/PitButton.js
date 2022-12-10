import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { COLORS, TEXT_STYLES } from "../../common";
export default function PitButton({
  text,
  onPress,
  type = "normal",
  style,
  textStyle,
  ...others
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.basic,
        styles[type],
        pressed && { opacity: 0.8 },
        style,
      ]}
      android_ripple={{ color: COLORS.LIGHT, foreground: true }}
      onPress={onPress}
      {...others}
    >
      <Text style={[styles[type].text, textStyle]}>{text}</Text>
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
const textBasic = {
  ...TEXT_STYLES.title[700],
};

const styles = StyleSheet.create({
  basic: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal:12,
    padding: 12,
    width:"100%"
  },
  normal: {
    ...normalBtn,
    backgroundColor: COLORS.BASE[0],
    text: {
      ...textBasic,
      fontSize: 18,
      color: COLORS.TINT[100],
    },
  },
  primary: {
    ...normalBtn,
    backgroundColor: COLORS.TINT[100],
    text: {
      ...textBasic,
      fontSize: 18,
      color: COLORS.BASE[0],
    },
  },
  text: {
    text: {
      fontSize: 32,
      color: COLORS.BASE[0],
      ...textBasic,
    },
  },
});
