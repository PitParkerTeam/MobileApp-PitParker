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
import { COLORS, TEXT_STYLES } from "../common";
import { PitButton } from "../components";
import { parkingAPI, pitAPI } from "../api";
import ImageManager from "../components/basics/ImageManager";
import moment from "moment";
import TimePeriodPicker from "../components/basics/TimePeriodPicker";
import { Switch } from "react-native";
import { userStore } from "../stores";
import { observer } from "mobx-react-lite";
import NotificationManager from "../components/basics/NotificationManager";

const AddNewParking = observer(({ navigation, route }) => {
  const [plate, setPlate] = useState(null);
  const [cost, setCost] = useState(null);
  const [slot, setSlot] = useState(null);
  const [notes, setNotes] = useState(null);
  const [pitID, setPitID] = useState(null);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [uri, setUri] = useState("");

  const imageHandler = (uri) => {
    setUri(uri);
  };

  const now = new Date();
  const anHourAfterNow = new Date();
  anHourAfterNow.setHours(now.getHours() + 1);
  const [endTime, setEndTime] = useState(anHourAfterNow);
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
      params.plate && setPlate(params.plate);
      params.cost && setCost(params.cost);
      params.notes && setNotes(params.notes);
      params.slot && setSlot(params.slot);
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
    const formattedDuration = `${hours} hours ${minutes} minutes`;

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
      let image = "";
      if (uri) {
        image = await parkingAPI.uploadImage(uri);
      }


      const timeDifference = moment.duration(moment(endTime).diff(moment(now)));
      const timeDifferenceInSeconds = timeDifference.asSeconds();

      if(timeDifferenceInSeconds > 900) <NotificationManager timeInSeconds={timeDifferenceInSeconds}/>;

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
        image,
      });
      alert("Successfully Created Your Parking!");
      navigation.navigate("Home");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <SmallMap location={route.params || userStore.userLocation} />
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
          style={{ minHeight: 180 }}
          inputStyle={{ minHeight: 120 }}
          value={notes}
          onChangeText={setNotes}
          inputOptions={{
            numberOfLines: 10,
            multiline: true,
          }}
        />

        <View style={styles.savePit}>
          <Text style={TEXT_STYLES.title[500]}>
            Save As My Pit
          </Text>
          <Switch
            value={isSwitchOn}
            onValueChange={(value) => setIsSwitchOn(value)}
            style={styles.switch}
          />
        </View>

        {isSwitchOn && (
          <View style={styles.pitName}>
            <PitInput
              label="Pit Name"
              value={pitName}
              onChangeText={setPitName}
            />
          </View>
        )}
        <View style={styles.imgManager}>
          <ImageManager imageHandler={imageHandler} />
        </View>
        <View style={{marginTop:150}} />
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
  savePit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pitName: {
    marginTop: 12,
  },
  imgManager: {
    marginTop: 12,
  },
});

export default AddNewParking;
