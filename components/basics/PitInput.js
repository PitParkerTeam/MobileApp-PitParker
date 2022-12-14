import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { COLORS, TEXT_STYLES } from "../../common";

export default function PitInput(props) {
  const {
    inputStyle,
    labelStyle,
    value,
    onChangeText,
    labelOptions,
    label,
    inputOptions,
    style
  } = props;
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, labelStyle]} {...labelOptions}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        {...inputOptions}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical:8,
  },
  label: {
    ...TEXT_STYLES.title[500],
    marginBottom: 8,
  },
  input: {
    height: 40,
    padding: 10,
    backgroundColor: COLORS.BASE[20],
    borderRadius: 8,
  },
});
