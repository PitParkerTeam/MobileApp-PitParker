import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { MAP_STYLE } from "../../common";

export default function Map({ pits, userLocation, loading = false }) {
  const mapPressed = (event) => {};
  const PitMarker = ({pit}) => {
    const {longitude, latitude} = pit
    return <Marker coordinate={{longitude, latitude}} />;
  };

  return !loading ? (
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
    
  ) : <ActivityIndicator size="large" />;
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
