import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View, Text, Dimensions, Button } from "react-native";
import { COLORS, MAP_STYLE } from "../../common";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function SmallMap({ location, style, disabled, delta }) {
  const coords = {
    latitude: location?.latitude || 37.78825,
    longitude: location?.longitude || -122.4324,
  };
  const region = {
    ...coords,
    latitudeDelta: delta || 0.002,
    longitudeDelta: delta || 0.002,
  };
  return (
    <MapView
      style={[styles.map, style]}
      region={region}
      provider={PROVIDER_GOOGLE}
      customMapStyle={MAP_STYLE}
      scrollEnabled={!disabled}
      pitchEnabled={!disabled}
      rotateEnabled={!disabled}
      zoomEnabled={!disabled}
    >
      <Marker
        coordinate={coords}
      >
        <Icon name="map-marker" size={45} style={{color:COLORS.TINT[120]}} />
      </Marker>
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
