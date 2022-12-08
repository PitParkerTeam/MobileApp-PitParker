import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SmallMap, PitButton, ParkingDetailLines } from "../components";
import { COLORS, TEXT_STYLES } from "../common";
import { getParking } from "../api/firestore/parking_store";

export default function ParkingDetails({ route, navigation }) {
  useEffect(() => {
    const { id } = route.params;
    getParking(id).then((res) => setItem(res));
    return () => {};
  }, [route]);

  const [item, setItem] = useState({});
  const { longitude, latitude } = item;
  const { name, notes, pitID, cost, plate, duration } = item;
  const parkAgain = () => {
    const params = {
      longitude,
      latitude,
      name,
      cost,
      plate,
      notes,
      duration,
    };
    navigation.navigate("AddNewParking", params);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <SmallMap location={{ longitude, latitude }} />
        <Text style={styles.name}>{name}</Text>
        <ParkingDetailLines item={item} />
        {notes ? (
          <View>
            <Text style={styles.line.title}>Notes</Text>
            <Text>{notes}</Text>
          </View>
        ) : (
          ""
        )}
      </ScrollView>
      <View style={styles.bottomTab}>
        <PitButton
          style={styles.button}
          text="View Pit"
          onPress={() => navigation.navigate("PitDetails", { id: pitID })}
        />
        <PitButton
          style={styles.button}
          text="Park Again"
          onPress={parkAgain}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.BASE[0],
  },
  scrollView: {
    marginHorizontal: 24,
    marginVertical: 10,
  },
  bottomTab: {
    height: 150,
    borderTopWidth: 1,
    borderTopColor: COLORS.BASE[40],
    paddingTop: 12,
    paddingLeft: 4,
    paddingRight: 4,
  },
  button: {
    marginBottom: 0,
  },
  name: {
    ...TEXT_STYLES.heading.h4,
    marginTop: 24,
  },
});
