import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import * as Location from "expo-location";
import { COLORS, MAP_STYLE } from "../../common";
import { PitButton } from "../basics";
export default function Map() {
  const latitudeDelta = 0.01;
  const longitudeDelta = 0.01;
  const [delta, setDelta] = useState({ latitudeDelta, longitudeDelta });
  const [userLocation, setUserLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [showAll, setShowAll] = useState(true);

  const locateUser = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
      enableHighAccuracy: true,
    });
    const { longitude, latitude } = location.coords;
    setUserLocation({ longitude, latitude, latitudeDelta, longitudeDelta });
  };

  useEffect(() => {
    locateUser();
  }, []);

  const mapPressed = (event) => {
    // setUserLocation({
    //   latitude: event.nativeEvent.coordinate.latitude,
    //   longitude: event.nativeEvent.coordinate.longitude,
    // });
  };

  const TabSet = () => (
    <View style={styles.buttons}>
      <PitButton
        style={[styles.button, styles.leftButton]}
        onPress={() => setShowAll(true)}
        text="Nearby Pits"
        type={showAll ? "primary" : "normal"}
      />
      <PitButton
        style={[styles.button, styles.rightButton]}
        onPress={() => setShowAll(false)}
        text="My Pits"
        type={!showAll ? "primary" : "normal"}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <TabSet/>
      <MapView
        style={styles.map}
        onPress={mapPressed}
        showsUserLocation
        region={{ ...userLocation, ...delta }}
        followsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        customMapStyle={MAP_STYLE}
        // tintColor={COLORS.TINT[100]}
      ></MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buttons: {
    position: "absolute",
    zIndex: 2000,
    top: 60,
    flexDirection: "row",
    backgroundColor: COLORS.BASE[0],
    borderRadius:8
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
    width:150
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
