import MapView, { Circle, Marker } from "react-native-maps";
import { StyleSheet, View, Text, Dimensions, Button } from "react-native";

export default function SmallMap({ location }) {

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsCompass
      >
        <Marker
          coordinate={{
            latitude: location ? location.latitude : 37.78825,
            longitude: location ? location.longitude : -122.4324,
          }}
          title={"user"}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  map: {
    width: 0.9 * Dimensions.get("window").width,
    height: 0.15 * Dimensions.get("window").height,
  },
});
