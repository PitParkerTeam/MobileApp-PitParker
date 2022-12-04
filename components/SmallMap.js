import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View, Text, Dimensions, Button } from "react-native";
import { COLORS, MAP_STYLE } from "../common";

export default function SmallMap({ location, style, disabled }) {
  const coords = {
    latitude: location?.latitude || 37.78825,
    longitude: location?.longitude || -122.4324,
  };
  return (
    <MapView
      style={[styles.map, style]}
      region={{ ...coords, latitudeDelta: 0.02, longitudeDelta: 0.02 }}
      provider={PROVIDER_GOOGLE}
      customMapStyle={MAP_STYLE}
      scrollEnabled={!disabled}
      pitchEnabled={!disabled}
      rotateEnabled={!disabled}
      zoomEnabled={!disabled}
    >
      <Marker coordinate={coords} />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: Dimensions.get("window").height * 0.2,
    borderRadius: 8,
  },
});
