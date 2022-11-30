import React, { useEffect, useState } from "react";
import MapView, { Circle, Marker, Polygon } from "react-native-maps";
import { StyleSheet, View, Text, Dimensions, Button } from "react-native";
import * as Location from "expo-location";
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Map() {
  const [userLocation, setUserLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  // const [currentLocation, setCurrentLocation] = useState(null);

  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();

  // const [mapRef, setMapRef] = useState(React.createRef());
  const mapRef = React.createRef();
  
  const verifyPermission = async () => {
    if (permissionResponse.granted) {
      return true;
    }
    const requestPermissionResponse = await requestPermission();
    return requestPermissionResponse.granted;
  };

  const goToMyLocation = async () => {
    // mapRef.current.animateCamera({center: {"latitude":userLocation.latitude, "longitude": userLocation.longitude, "latitudeDelta": 0.0922, "longitudeDelta": 0.0421}});
    mapRef.current.animateToRegion({ // Takes a region object as parameter
      longitude: userLocation.longitude,
      latitude: userLocation.latitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
  },1000);
}

  const locateUserHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        return;
      }
      const userCurrentPosition = await Location.getCurrentPositionAsync();
      console.log(userCurrentPosition);
      // alert(userCurrentPosition);
      setUserLocation({
        latitude: userCurrentPosition.coords.latitude,
        longitude: userCurrentPosition.coords.longitude,
      });
    } catch (err) {
      console.log("locate user ", err);
    }
  };



  //   console.log(route.params.initialLocation);
  const mapPressed = (event) => {
    // console.log(event.nativeEvent.coordinte.latitude);
    locateUserHandler();
    // setCurrentLocation({
    //   latitude: event.nativeEvent.coordinate.latitude,
    //   longitude: event.nativeEvent.coordinate.longitude,
    // });
    goToMyLocation();
    console.log(userLocation);
  };

  // useEffect(() => {
  //   locateUserHandler();
  //   console.log(1)
  // }, []);
  // locateUserHandler();
  useEffect(() => {
    (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
            enableHighAccuracy: true,
            timeInterval: 5
        });
        setUserLocation(location);
        //goToMyLocation();
    })();
}, []);

  return (
    <View style={styles.container} >

      

      <MapView
        style={styles.map}
        onPress={mapPressed}
        ref = {mapRef}
        showsCompass
        showsUserLocation
        // initialRegion={{
        //   // latitude: userLocation ? userLocation.latitude : 37.78825,
        //   // longitude: userLocation ? userLocation.longitude : -122.4324,
        //   latitude: userLocation.latitude,
        //   longitude: userLocation.longitude,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
      >
        {/* {currentLocation && <Marker coordinate={currentLocation} />} */}
        {/* {userLocation && <Marker coordinate={userLocation} />} */}
        <Marker
            coordinate={{latitude: userLocation.latitude,
            longitude: userLocation.longitude}}
            title={"user"}
         >
           <View>
            <Icon name="car" size={30} color="#900" />
           </View>
         </Marker>
        <Circle
          center = {{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude
          }}
          radius = {20}
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: "center",
//     justifyContents: "center"
//   }
// })
