import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SmallMap, PitInput, BottomContainer } from "../components";
import { COLORS } from "../common";
import TakePhoto from "../components/TakePhoto";
import { PitButton } from "../components";
import { parkingAPI, pitAPI } from "../api";
import * as Location from "expo-location";
// import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import { addHours } from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";
import TimePeriodPicker from "../components/basics/TimePeriodPicker";
import { Switch } from "react-native";

export default function AddNewParking({ navigation, route }) {
  const [plate, setPlate] = useState(null);
  const [cost, setCost] = useState(null);
  const [slot, setSlot] = useState(null);
  const [notes, setNotes] = useState(null);
  // const [parkTime, setParkTime] = useState(new Date());
  const [pitID, setPitID] = useState(null);

  // const imageHandler = (uri) => {
  //   console.log("imageHandler called", uri);
  //   setUri(uri);
  // };
  const [location, setLocation] = useState({});
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [pitName, setPitName] = useState(null);
  const [startTime, setStartTime] = useState(new Date());
  const now = new Date();
  now.setHours(now.getHours() + 1);
  const [endTime, setEndTime] = useState(now);

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
      const { params } = route;
      const { latitude, longitude } = route.params;
      setLocation({ latitude, longitude });
      setPlate(params.plate);
      setCost(params.cost);
      setNotes(params.notes);
      setPitID(params.pitID);
    }
  };

  useEffect(() => {
    getLocation();
  }, [route]);

  const handlePit = async () => {
    const { latitude, longitude } = location;
    const res = await pitAPI.createNewPit({
      latitude,
      longitude,
      name: pitName,
    });

    setPitID(res);
    return res;
  };



  const saveParking = async () => {
    const { latitude, longitude } = location;
    var time = moment().format("YYYY-MM-DD hh:mm:ss");

    const duration = moment.duration(moment(endTime).diff(moment(startTime)));
    const durationInMinutes = duration.asMinutes();
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = Math.floor(durationInMinutes % 60);
    const formattedDuration = `${hours}hours ${minutes}minutes`;

    if (startTime >= endTime) {
      Alert.alert("Action Failed", "Start Time must be earlier than End Time");
    } else if (isSwitchOn && !pitName) {
      Alert.alert("Action Failed", "Your Pit must have a name");
    } else {
      let id = pitID;
      if (!id) {
        id = await handlePit();
      }
      if (isSwitchOn) {
        const myPit = {
          latitude: location.latitude,
          longitude: location.longitude,
          name: pitName,
          pitID: id,
        };
        await pitAPI.saveAsMyPit(myPit);
      }
      await parkingAPI.createNewParking({
        latitude,
        longitude,
        startTime,
        endTime,
        duration: formattedDuration,
        plate,
        cost,
        slot,
        notes,
        pitID,
      });
      alert("Successfully Created Your Parking!");
      navigation.navigate("Home");
    }
  };

  // var startTime = new Date();
  // var endTime = new Date();
  // endTime.setHours(endTime.getHours() + 1);

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <SmallMap location={location} />
        <TimePeriodPicker
          initialStartTime={startTime}
          initialEndTime={endTime}
          onStartTimeChange={(time) => setStartTime(time)}
          onEndTimeChange={(time) => setEndTime(time)}
        />
        <PitInput label="Plate" value={plate} onChangeText={setPlate} />
        <PitInput
          label="Cost"
          value={cost}
          onChangeText={setCost}
          inputOptions={{ keyboardType: "decimal-pad" }}
        />
        <PitInput label="Slot" value={slot} onChangeText={setSlot} />
        <PitInput
          label="Notes"
          inputStyle={{ minHeight: 120 }}
          value={notes}
          onChangeText={setNotes}
          inputOptions={{
            numberOfLines: 10,
            multiline: true,
          }}
        />
        <View style={{ marginVertical: 50, paddingVertical: 50 }}>
          <Text style={{ fontSize: "20", fontWeight: "bold" }}>
            Save As My Pit
          </Text>
          <View>
            <Switch
              value={isSwitchOn}
              onValueChange={(value) => setIsSwitchOn(value)}
              style={styles.switch}
            />
            {/* Show the input field only when the switch is turned on */}
            {isSwitchOn && (
              <PitInput
                label="Pit Name"
                value={pitName}
                onChangeText={setPitName}
              />
            )}
          </View>
        </View>
      </ScrollView>
      {/* <TakePhoto imageHandler={imageHandler} /> */}
      <BottomContainer>
        <PitButton
          style={styles.button}
          onPress={saveParking}
          text="Confirm Add"
          type="primary"
        />
      </BottomContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.BASE[0],
  },
  scrollView: {
    marginVertical: 4,
    paddingHorizontal: 24,
  },
  switch: {
    paddingVertical: 5,
    marginVertical: 5,
  },
});
