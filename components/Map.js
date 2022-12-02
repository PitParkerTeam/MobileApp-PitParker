import React, { useEffect, useState } from "react";
import MapView, { Circle, Marker, Polygon } from "react-native-maps";
import { StyleSheet, View, Text, Dimensions, Button } from "react-native";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Map() {
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
    setUserLocation(location.coords);
  }


  useEffect(() => {
    locateUser();
  }, []);

  const mapPressed = (event) => {
    // setCurrentLocation({
    //   latitude: event.nativeEvent.coordinate.latitude,
    //   longitude: event.nativeEvent.coordinate.longitude,
    // });
  };

  const { longitude, latitude } = userLocation;
  const latitudeDelta = 0.01;
  const longitudeDelta = 0.01;
  const region = { longitude, latitude, latitudeDelta, longitudeDelta };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onPress={mapPressed}
        showsUserLocation
        region={region}
        followsUserLocation={true}
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

