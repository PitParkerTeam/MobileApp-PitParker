import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { SmallMap, PitInput } from "../components";
import { COLORS } from "../common";
import TakePhoto from "../components/TakePhoto";
import PitButton from "../components/PitButton";
import { createParking } from "../backend/firestore/parking_store";
import * as Location from "expo-location";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import { ComingSoon_400Regular } from "@expo-google-fonts/dev";



export default function AddNewParking({ navigation, route }) {
  const [plate, setPlate] = useState("");
  const [cost, setCost] = useState(null);
  const [slot, setSlot] = useState(null);
  const [note, setNote] = useState(null);
  // const [parkTime, setParkTime] = useState(new Date());
  const [duration, setDuration] = useState(0);


  

  // const imageHandler = (uri) => {
  //   console.log("imageHandler called", uri);
  //   setUri(uri);
  // };
  const [location, setLocation] = useState(null);

  const locateUser = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
      enableHighAccuracy: true,
    });
    const { latitude, longitude } = location.coords;
    setLocation({ latitude, longitude });
  };

  const getLocation = () => {
    if (!route.params) {
      locateUser();
    } else {
      setLocation({
        latitude: route.params.latitude,
        longitude: route.params.longitude,
      });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const saveParking = () => {
    const { latitude, longitude } = location;
    var time = moment()
      .utcOffset('-08:00')
      .format('YYYY-MM-DD hh:mm:ss');

    createParking({ latitude, longitude, time, duration, plate, cost, slot, note });
  };

  return (
    <View style={styles.container}>
      <SmallMap location={location} />
      <PitInput
        label="Duration"
        inputOptions={{ text: duration, onChangeText: setDuration }}
      />
      <PitInput
        label="Plate"
        inputOptions={{ text: plate, onChangeText: setPlate }}
      />
      <PitInput
        label="Cost"
        inputOptions={{
          text: cost,
          onChangeText: setCost,
          keyboardType: "decimal-pad",
        }}
      />
      <PitInput
        label="Slot"
        inputOptions={{ text: slot, onChangeText: setSlot }}
      />
      <PitInput
        label="Notes"
        inputStyle={{ minHeight: 80 }}
        inputOptions={{
          text: note,
          onChangeText: setNote,
          numberOfLines: 6,
          multiline: true,
        }}
      />


      


      {/* <TakePhoto imageHandler={imageHandler} /> */}
      <PitButton
        style={styles.button}
        onPress={saveParking}
        text={"Add New Parking"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.BASE[0],
    padding: 24,
  },
  button: {
    alignItems: "center",
    marginTop: 140,
  },
});
