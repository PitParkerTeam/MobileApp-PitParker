import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { StyleSheet, View, Text, Dimensions, Button } from "react-native";
import { COLORS, MAP_STYLE } from "../common";

export default function SmallMap({ location, isFlat }) {
  const coords = {
    latitude: location?.latitude || 37.78825,
    longitude: location?.longitude || -122.4324,
  };
  return (
    <MapView
      style={[styles.map, isFlat ? styles.mapFlat : ""]}
      region={{ ...coords, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
      provider={PROVIDER_GOOGLE}
      customMapStyle={MAP_STYLE}
    >
      <Marker coordinate={coords} />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "25%",
    borderRadius: 8,
  },
  mapFlat: {
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
  }
});
