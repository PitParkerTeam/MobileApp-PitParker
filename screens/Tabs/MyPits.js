import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MyPit, SearchBar, Empty } from "../../components";
import { COLORS, TEXT_STYLES } from "../../common";
import { pitStore } from "../../stores";
import { observer } from "mobx-react";

const MyPits = observer(({ navigation }) => {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Pits</Text>
      <SearchBar
        value={search}
        onChangeText={(val) => setSearch(val)}
        onClear={() => setSearch("")}
      />
      <FlatList
        style={styles.listContainer}
        data={pitStore.userPits.filter((item) =>
          item.name
            .concat(item?.vicinity)
            .toLowerCase()
            .includes(search.toLowerCase())
        )}
        renderItem={({ item }) => <MyPit pit={item} navigation={navigation} />}
        ListEmptyComponent={<Empty text="You have no saved pits"/> }
      />
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
    backgroundColor: COLORS.BASE[0],
  },
});
export default MyPits;
