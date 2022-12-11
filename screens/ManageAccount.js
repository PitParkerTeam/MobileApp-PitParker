import { View, Text, SafeAreaView, TextInput, StyleSheet } from "react-native";
import React from "react";
import { COLORS, TEXT_STYLES, formatTime } from "../common";

export default function ManageAccount({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.row}>
          <View>
            <Text>First Name</Text>
            <TextInput style={styles.input}></TextInput>
          </View>
          <View>
            <Text>Last Name</Text>
            <TextInput style={styles.input}></TextInput>
          </View>
          <View>
            <Text>Email</Text>
            <TextInput style={styles.input}></TextInput>
          </View>
        </View>
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
  row: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    marginBottom: 2,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
