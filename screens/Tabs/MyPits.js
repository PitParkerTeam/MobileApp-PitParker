import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { SearchBar } from "@rneui/themed";
import { MyPit } from "../../components";
import { COLORS, TEXT_STYLES } from "../../common";
import { pitStore, userStore } from "../../stores";
import { observer } from "mobx-react";

const MyPits = observer(({ navigation }) => {
  const [search, setSearch] = useState("");
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
          data={pitStore.userPits}
          renderItem={({ item }) => (
            <MyPit pit={item} navigation={navigation} />
          )}
        />
      </View>
    </SafeAreaView>
  );
});

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
export default MyPits;
