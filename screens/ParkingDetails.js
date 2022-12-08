import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SmallMap, PitButton, ParkingDetailLines, BottomContainer } from "../components";
import { COLORS, TEXT_STYLES } from "../common";
import { getParking } from "../api/firestore/parking_store";
import ImageView from "react-native-image-viewing";

export default function ParkingDetails({ route, navigation }) {
  useEffect(() => {
    const { id } = route.params;
    getParking(id).then((res) => setItem(res));
    return () => {};
  }, [route]);

  const [visible, setIsVisible] = useState(false);
  const [item, setItem] = useState({});
  const { longitude, latitude } = item;
  const { name, notes, pitID, image } = item;

  const parkAgain = () => navigation.navigate("AddNewParking", item);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{ paddingHorizontal: 24 }}>
          <SmallMap location={{ longitude, latitude }} />
          <Text style={styles.name}>{name}</Text>
          <ParkingDetailLines item={item} />
          {image && (
            <View style={styles.imageContainer}>
              <Text style={styles.imageTitle}>Image</Text>
              <Pressable onPress={() => setIsVisible(true)}>
                <Image source={{ uri: image }} style={styles.image} />
              </Pressable>
              <ImageView
                images={[{ uri: image }]}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
              />
            </View>
          )}
          <View style={{ marginBottom: 100 }} />
        </View>
      </ScrollView>
      <BottomContainer>
        <PitButton
          style={styles.button}
          text="View Pit"
          onPress={() => navigation.navigate("PitDetails", { id: pitID })}
        />
        <PitButton
          text="Park Again"
          onPress={parkAgain}
        />
      </BottomContainer>
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
    marginVertical: 4,
  },
  button: {
    marginBottom: 0,
  },
  imageContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 6,
  },
  imageTitle: {
    ...TEXT_STYLES.title[600],
    width: "30%",
  },
  name: {
    ...TEXT_STYLES.heading.h4,
    marginTop: 24,
  },
});
