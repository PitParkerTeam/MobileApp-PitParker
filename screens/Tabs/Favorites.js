import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import React from "react";
import { SearchBar } from "@rneui/themed";
import { useState } from "react";
import FavPit from "../../components/FavPit";

export default function Favorites() {
  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };
  return (
    <View style={styles.container}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}
          lightTheme={true}
          round={true}
        />
      <View>
        <FavPit />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  topContainer: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "pink",
  }
});
