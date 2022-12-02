import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SmallMap, PitInput } from "../components";
import { COLORS } from "../common";

export default function AddNewParking() {
  const [plate, setPlate] = useState("");
  const [cost, setCost] = useState(null);
  const [slot, setSlot] = useState(null);
  const [note, setNote] = useState(null);
  return (
    <View style={styles.container}>
      <SmallMap />
      <PitInput
        label="Plate"
        inputOptions={{ text: plate, onChangeText: setPlate }}
      />
      <PitInput
        label="Cost"
        inputOptions={{
          text: cost,
          onChangeText: setCost,
          keyboardType: "decimal-pad",
        }}
      />
      <PitInput
        label="Slot"
        inputOptions={{ text: slot, onChangeText: setSlot }}
      />
      <PitInput
        label="Notes"
        inputStyle={{minHeight: 80}}
        inputOptions={{ text: note, onChangeText: setNote, numberOfLines:6, multiline: true }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.BASE[0],
    padding:24
  },
});
