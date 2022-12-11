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
import { PitButton } from "../components";
import { parkingAPI, pitAPI } from "../api";
import ImageManager from "../components/basics/ImageManager";
import moment from "moment";
import TimePeriodPicker from "../components/basics/TimePeriodPicker";
import { Switch } from "react-native";
import { userStore } from "../stores";
import { observer } from "mobx-react-lite";

const AddNewParking = observer(({ navigation, route }) => {
  const [plate, setPlate] = useState(null);
  const [cost, setCost] = useState(null);
  const [slot, setSlot] = useState(null);
  const [notes, setNotes] = useState(null);
  const [pitID, setPitID] = useState(null);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [uri, setUri] = useState("");

  const imageHandler = (uri) => {
    console.log("imageHandler called", uri);
    setUri(uri);
  };

  const now = new Date();
  now.setHours(now.getHours() + 1);
  const [endTime, setEndTime] = useState(now);
  const [location, setLocation] = useState({});
  const [pitName, setPitName] = useState(null);
  const [startTime, setStartTime] = useState(new Date());

  const getLocation = () => {
    if (!route.params) {
      setLocation(userStore.userLocation);
    } else {
      const { params } = route;
      const { latitude, longitude } = route.params;
      setLocation({ latitude, longitude });
      (params.plate) && setPlate(params.plate);
      (params.cost) && setCost(params.cost);
      (params.notes) && setNotes(params.notes);
      (params.slot) && setSlot(params.slot);
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
    const duration = moment.duration(moment(endTime).diff(moment(startTime)));
    const durationInMinutes = duration.asMinutes();
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = Math.floor(durationInMinutes % 60);
    const formattedDuration = `${hours}hours ${minutes} minutes`;

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
          id: id,
        };
        await pitAPI.saveAsMyPit(myPit);
      }

      if (uri) {
        setUri(parkingAPI.uploadImage(uri));
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
        pitID: id,
        image: uri,
      });
      alert("Successfully Created Your Parking!");
      navigation.navigate("Home");
    }
  };

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
          <ImageManager imageHandler={imageHandler} />
        </View>

        <View style={{ marginVertical: 1, paddingVertical: 1 }}>
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
});

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

export default AddNewParking;
