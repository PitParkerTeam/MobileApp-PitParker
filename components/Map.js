import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Text, Dimensions, Button } from "react-native";
import * as Location from "expo-location";

import { COLORS } from "../common";

export default function Map() {
  const latitudeDelta = 0.01;
  const longitudeDelta = 0.01;
  const [delta, setDelta] = useState({latitudeDelta, longitudeDelta})
  const [userLocation, setUserLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

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

  useEffect(()=> {
    locateUser();
  },[])
 

  const mapPressed = (event) => {
    // setUserLocation({
    //   latitude: event.nativeEvent.coordinate.latitude,
    //   longitude: event.nativeEvent.coordinate.longitude,
    // });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onPress={mapPressed}
        showsUserLocation
        region={{...userLocation, ...delta}}
        followsUserLocation={true}
        // tintColor={COLORS.TINT[100]}
      ></MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
