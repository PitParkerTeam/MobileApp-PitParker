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
import { MyPit } from "../../components";

const dummy_pits = [
  {
    id: "p1",
    pitName: "Parking Pit #100",
    area: "Vancouver, BC",
    fav: "yes",
    distance: "500m",
  },
  {
    id: "p2",
    pitName: "Parking Pit #200",
    area: "Vancouver, BC",
    fav: "yes",
    distance: "500m",
  },
  {
    id: "p3",
    pitName: "Parking Pit #300",
    area: "Vancouver, BC",
    fav: "yes",
    distance: "500m",
  },
  {
    id: "p4",
    pitName: "Parking Pit #400",
    area: "Vancouver, BC",
    fav: "yes",
    distance: "500m",
  },
  {
    id: "p5",
    pitName: "Parking Pit #500",
    area: "Vancouver, BC",
    fav: "yes",
    distance: "500m",
  },
];

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
      <FlatList
        data={dummy_pits}
        renderItem={({ item }) => <MyPit pit={item} />}
     />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // justifyContent: "center",
  },
  topContainer: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  bottomContainer: {},
});
