import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { StyleSheet, Dimensions, Text } from "react-native";
import { MAP_STYLE, COLORS, TEXT_STYLES } from "../../common";
import { useNavigation } from "@react-navigation/core";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Map({ pits, userLocation, iconColor, handleMapPress }) {
  const navigation = useNavigation();
  const PitMarker = ({ pit }) => {
    const { longitude, latitude, id, name } = pit;
    const handlePress = () => {
      navigation.navigate("PitDetails", { id });
    };
    return (
      <Marker
        coordinate={{ longitude, latitude }}
      >
        <Icon name="map-marker" size={45} style={[styles.icon, {color: iconColor}]} />
        <Callout onPress={handlePress} style={styles.callout}>
          <Text style={styles.markerName}>{name}</Text>
        </Callout>
      </Marker>
    );
  };

  return (
    <MapView
      style={styles.map}
      onPress={handleMapPress}
      showsUserLocation
      region={{
        ...userLocation,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      followsUserLocation={true}
      provider={PROVIDER_GOOGLE}
      customMapStyle={MAP_STYLE}
      // tintColor={COLORS.TINT[100]}
    >
      {pits.map((pit) => (
        <PitMarker pit={pit} key={pit.id} />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  markerName: {
    color: COLORS.BASE[80],
    flex: 1,
    ...TEXT_STYLES.body[400],
  },
  callout:{
    width:120,
  },
  icon: {
    marginBottom: 4,
    borderRadius:1,
  },
});
