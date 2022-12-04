import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SearchBar } from "@rneui/themed";
import { MyPit } from "../../components";
import { COLORS, TEXT_STYLES } from "../../common";
import { collection, query, where, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { getPit } from "../../firebase/pit_store";

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
  const [myPits, setMyPits] = useState([]);
  useEffect(() => {
    const unsubscribe = getPit((querySnapshot) => {
      if (querySnapshot.empty) {
        setMyPits([]);
        return;
      }
      setMyPits(
        querySnapshot.docs.map((snapDoc) => ({
          ...snapDoc.data(),
          id: snapDoc.id,
          pitName: snapDoc.name,
        }))
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const updateSearch = (search) => {
    setSearch(search);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Pits</Text>
      <SearchBar
        placeholder="Search"
        onChangeText={updateSearch}
        value={search}
        lightTheme={true}
        round={true}
      />
      <View style={styles.listContainer}>
        <FlatList
          data={myPits}
          renderItem={({ item }) => <MyPit pit={item} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASE[0],
  },
  header: {
    ...TEXT_STYLES.heading.h2,
    marginLeft: "4%",
    marginBottom: "3%",
  },
  listContainer: {
    backgroundColor: COLORS.BASE[20],
  },
});
