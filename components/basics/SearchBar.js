import { View, StyleSheet, TextInput } from "react-native";
import React from "react";
import { COLORS } from "../../common";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function SearchBar(props) {
  return (
    <View style={styles.searchBarContainer}>
      <TextInput style={styles.searchBar} {...props} />
      <Icon
        style={styles.icon}
        name={props.value.length > 0 ? "close-circle" : "magnify"}
        size={32}
        color={COLORS.BASE[60]}
        onPress={props.value.length > 0 ? props.onClear : props.onSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    alignItems: "center",
    paddingHorizontal: 22,
    flexDirection: "row",
  },
  searchBar: {
    backgroundColor: COLORS.BASE[40],
    height: 50,
    borderRadius: 100,
    width: "100%",
    paddingHorizontal: 24,
  },
  icon: {
    zIndex: 3000,
    marginLeft: -45,
  },
});
