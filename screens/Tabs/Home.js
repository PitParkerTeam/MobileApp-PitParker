import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Map, PitButton, CurrentParking } from "../../components";
import { COLORS } from "../../common";
import { userStore, pitStore } from "../../stores";
import { observer } from "mobx-react";

const Home = observer(() => {
  const [activeTab, setActiveTab] = useState("nearby");

  const TabSet = () => (
    <View style={styles.buttons}>
      <PitButton
        style={[styles.button, styles.leftButton]}
        onPress={() => setActiveTab("nearby")}
        text="Nearby Pits"
        type={activeTab == "nearby" ? "primary" : "normal"}
      />
      <PitButton
        style={[styles.button, styles.rightButton]}
        onPress={() => setActiveTab("my")}
        text="My Pits"
        type={activeTab == "my" ? "primary" : "normal"}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <TabSet />
      <ScrollView style={styles.currentParkings}>
        {userStore.currentParkings.map((parking) => (
          <CurrentParking parking={parking} key={parking.id} />
        ))}
        <View style={{ marginBottom: 40 }} />
      </ScrollView>
      <Map
        userLocation={userStore.userLocation}
        pits={activeTab == "nearby" ? pitStore.nearbyPits : pitStore.userPits}
        iconColor={activeTab == "nearby" ? COLORS.TINT[120] : COLORS.TINT[100]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  currentParkings: {
    zIndex: 3000,
    position: "absolute",
    bottom: 10,
    width: "100%",
    padding: 24,
    height: 220,
  },
  buttons: {
    position: "absolute",
    zIndex: 2000,
    top: 60,
    flexDirection: "row",
    backgroundColor: COLORS.BASE[0],
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: COLORS.TINT[100],
    color: COLORS.BASE[0],
  },
  leftButton: {
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    marginRight: -0.5,
  },
  rightButton: {
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    marginLeft: -0.5,
  },
  button: {
    margin: 0,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 0,
    width: 150,
  },
});
export default Home;
