import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import React from "react";
import { SearchBar } from "@rneui/themed";
import { useState } from "react";
import FavPit from "../../components/FavPit";

export default function MyPits() {
  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };
  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
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
  },
});
