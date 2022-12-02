import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { COLORS, TEXT_STYLES } from "../common";

export default function PitInput(props) {
  const { inputStyle, labelStyle, inputOptions, labelOptions, label } = props;
  return (
    <View>
      <Text style={[styles.label, labelStyle]} {...labelOptions}>
        {label}
      </Text>
      <TextInput style={[styles.input, inputStyle]} {...inputOptions} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    ...TEXT_STYLES.title[500],
    marginBottom:8
  },
  input: {
    height: 40,
    padding: 10,
    backgroundColor: COLORS.BASE[20],
    borderRadius: 4,
  },
});
