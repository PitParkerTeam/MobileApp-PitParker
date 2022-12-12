import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, formatTime, TEXT_STYLES } from "../../common";
import { ParkingRecord, CurrentParking, Empty } from "../../components";
import { observer } from "mobx-react-lite";
import { userStore } from "../../stores";

const MyParkings = observer(({ navigation }) => {
  const listItemRender = ({ item }) => {
    if (userStore.isCurrent(item))
      return (
        <View style={styles.currentParking}>
          <CurrentParking key={item.id} parking={item} showMap />
        </View>
      );
    else return <ParkingRecord item={item} navigation={navigation} />;
  };
  const isEmpty = userStore.parkings.length < 1
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Parking</Text>
      <View
        style={{
          height: "93%",
          backgroundColor: isEmpty ? COLORS.BASE[0] : COLORS.BASE[20],
        }}
      >
        <FlatList
          data={userStore.parkings}
          renderItem={listItemRender}
          ListEmptyComponent={<Empty text="You have no parking records" />}
          style={styles.list}
        />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: { 
    backgroundColor: COLORS.BASE[0],
  },

  currentParking: { 
    padding: 12, 
    backgroundColor:COLORS.BASE[0] },
  header: {
    ...TEXT_STYLES.heading.h2,
    marginLeft: "4%",
    marginBottom: 5,
  },
});

export default MyParkings;
