import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SmallMap, PitButton, ParkingDetailLines, BottomContainer } from "../components";
import { COLORS, TEXT_STYLES } from "../common";
import { parkingAPI } from "../api";
import ImageView from "react-native-image-viewing";
import { storage } from "../api/firestore/firebase_setup";
import { getDownloadURL, ref } from "firebase/storage";


export default function ParkingDetails({ route, navigation }) {
  const [visible, setIsVisible] = useState(false);
  const [item, setItem] = useState({});
  const [imageURL, setImageURL] = useState("");
  const [imgLoading, setImgLoading] = useState(false)
  const { longitude, latitude } = item;
  const { name, pitID, image } = item;

  const parkAgain = () => navigation.navigate("AddNewParking", item);

  useEffect(() => {
    const { id } = route.params;
    parkingAPI.getParking(id).then((res) => setItem(res));
    return () => {};
  }, [route]);

  useEffect(() => {
    const getImageURL = async () => {
      try {
        if (image) {
          setImgLoading(true)
          const reference = ref(storage, image);
          const downloadImageURL = await getDownloadURL(reference);
          setImageURL(downloadImageURL);
          setImgLoading(false)
        }
      } catch (err) {
        console.log("download image ", err);
      }
    };
    getImageURL();
  }, [image]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{ paddingHorizontal: 24 }}>
          <SmallMap location={{ longitude, latitude }} />
          {name && <Text style={styles.name}>{name}</Text>}
          <ParkingDetailLines item={item} />
          {image && (
            <View style={styles.imageContainer}>
              <Text style={styles.imageTitle}>Image</Text>
              {imgLoading && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={COLORS.TINT[100]} />
                </View>
              )}
              {imageURL && !imgLoading && (
                <Pressable onPress={() => setIsVisible(true)}>
                  <Image source={{ uri: imageURL }} style={styles.image} />
                </Pressable>
              )}
              <ImageView
                images={[{ uri: imageURL }]}
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
        <PitButton text="Park Again" onPress={parkAgain} type="primary" />
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
  loadingContainer:{
    justifyContent:"center",
    alignContent:"center",
    width:150,
    height:150
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
