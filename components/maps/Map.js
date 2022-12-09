import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";
import { MAP_STYLE } from "../../common";
import { useNavigation } from "@react-navigation/core";

export default function Map({ pits, userLocation }) {
  const navigation = useNavigation();
  const mapPressed = (event) => {};
  const PitMarker = ({pit}) => {
    const {longitude, latitude, place_id} = pit
    const handlePress = () => {
      navigation.navigate("PitDetails", { id: place_id });
    }
    return <Marker coordinate={{longitude, latitude}} onPress={handlePress} />;
  };

  return (
    <MapView
      style={styles.map}
      onPress={mapPressed}
      showsUserLocation
      region={{
        ...userLocation,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      followsUserLocation={true}
      provider={PROVIDER_GOOGLE}
      customMapStyle={MAP_STYLE}
      // tintColor={COLORS.TINT[100]}
    >
      {pits.map((pit) => (
        <PitMarker pit={pit} key={pit.place_id} />
      ))}
    </MapView>
    
  ) 
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
