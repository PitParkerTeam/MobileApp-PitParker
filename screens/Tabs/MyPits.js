import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SearchBar } from "@rneui/themed";
import { MyPit } from "../../components";
import { COLORS, TEXT_STYLES } from "../../common";
import { fetchPits } from "../../api/firestore/pit_store";

export default function MyPits( { navigation }) {
  const [search, setSearch] = useState("");
  const [myPits, setMyPits] = useState([]);
  useEffect(() => {
    const unsubscribe = fetchPits((querySnapshot) => {
      if (querySnapshot.empty) {
        setMyPits([]);
        return;
      }
      setMyPits(
        querySnapshot.docs.map((snapDoc) => ({
          ...snapDoc.data(),
          id: snapDoc.id,
          pitName: snapDoc.data().name,
          area: snapDoc.data().area,
          distance: snapDoc.data().distance,
          longitude: snapDoc.data().longitude,
          latitude: snapDoc.data().latitude,
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
          renderItem={({ item }) => <MyPit pit={item} navigation={navigation}/>}
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
    flex: 1,
    backgroundColor: COLORS.BASE[20],
  },
});
