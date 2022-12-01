import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getFavPits } from "../firebase/firestore";

export default function FavPit({ id, pit }) {
  const navigation = useNavigation();
  function pressHandler() {
    navigation.navigate("PitDetails", { pitId: id });
  }
  const [myPits, setMyPits] = useState([]);
  // const onAdd = function ()
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
              <Text>{pit.pitName}</Text>
            </View>
            <View>
              <Text>{pit.fav}</Text>
            </View>
          </View>
          <View>
            <View>
              <Text>{pit.region}</Text>
            </View>
            <View>
              <Text>{pit.distance}</Text>
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
