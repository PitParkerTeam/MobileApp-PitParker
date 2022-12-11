import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { SmallMap } from "../maps";
import { COLORS, TEXT_STYLES } from "../../common";
import { observer } from "mobx-react-lite";
import { pitStore, userStore } from "../../stores";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const MyPit = observer(({ pit, navigation }) => {
  const { longitude, latitude, name, vicinity } = pit;

  return (
    <Pressable
      onPress={() => navigation.navigate("PitDetails", { id: pit.id })}
      style={styles.container}
    >
      <View>
        <SmallMap
          disabled={true}
          style={styles.map}
          location={{ longitude, latitude }}
        />
        <View style={styles.pitItem}>
          <View style={styles.row}>
            <Text style={styles.pitName}>{name}</Text>
            <Icon
              name={"star"}
              size={30}
              color={COLORS.TINT[100]}
              onPress={() => pitStore.toggleSavePit(pit)}
            />
          </View>
          <View style={styles.row}>
            <Text>{vicinity || ""}</Text>
            <Text style={styles.distance}>
              {userStore.getCurrentDistance({ longitude, latitude })}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BASE[40],
    padding: 24,
  },
  map: {
    height: 150,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  pitItem: {
    marginTop: 8,
  },
  pitName: {
    ...TEXT_STYLES.title[600],
    width: "75%",
  },
  save: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "right",
  },
});

export default MyPit;
