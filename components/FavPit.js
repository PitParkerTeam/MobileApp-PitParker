import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

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

export default function FavPit({ id, pitName, region, fav, distance }) {
  const navigation = useNavigation();
  function pressHandler() {
    navigation.navigate("PitDetails", { pitId: id });
  }
  return (
    <View style={styles.container}>
      <Pressable onPress={pressHandler}>
        <View style={styles.pitItem}>
          <View>
            <Image
              source={{ uri: "https://reactjs.org/logo-og.png" }}
              style={styles.image}
            />
          </View>
          <View>
            <View>
              <Text>{pitName}</Text>
            </View>
            <View>{fav}</View>
          </View>
          <View>
            <View>
              <Text>{region}</Text>
            </View>
            <View>
              <Text>{distance}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  pitItem: {
    padding: 12,
    marginVertical: 8,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width: 340,
    height: 160,
  },
});
