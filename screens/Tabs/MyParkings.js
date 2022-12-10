import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, formatTime, TEXT_STYLES } from "../../common";
import { ParkingRecord, CurrentParking } from "../../components";
import { observer } from "mobx-react-lite";
import { userStore } from "../../stores";

const MyParkings = observer(({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My parking</Text>
      <View style={styles.currentParking}>
        {userStore.currentParkings.map((parking) => (
          <CurrentParking parking={parking} key={parking.id} showMap/>
        ))}
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={userStore.parkings}
          renderItem={({ item }) => (
            <ParkingRecord item={item} navigation={navigation} />
          )}
        />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: { backgroundColor: COLORS.BASE[0] },
  listContainer: { backgroundColor: COLORS.BASE[20] },
  currentParking: { padding: 10 },
  header: {
    ...TEXT_STYLES.heading.h2,
    marginLeft: "4%",
  },
});

export default MyParkings;
