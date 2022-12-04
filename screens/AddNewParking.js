import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SmallMap, PitInput } from "../components";
import { COLORS } from "../common";
import TakePhoto from "../components/TakePhoto";
import PitButton from "../components/PitButton";
import { createParking } from "../firebase/firestore";


export default function AddNewParking({navigation, route}) {
  const [plate, setPlate] = useState("");
  const [cost, setCost] = useState(null);
  const [slot, setSlot] = useState(null);
  const [note, setNote] = useState(null);

  // const imageHandler = (uri) => {
  //   console.log("imageHandler called", uri);
  //   setUri(uri);
  // };
  const [location, setLocation] = useState(null);

  // useEffect = (() => {
  //   if(!route.params.location) {

  //   } else {
  //     setLocation({latitude: route.params.latitude, longitude: route.params.longitude})
  //   }

  // }, [])


  const saveParking = () => {
    createParking({ plate, cost, slot, note });
  }

  return (
    <View style={styles.container}>
      <SmallMap />
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
        inputStyle={{minHeight: 80}}
        inputOptions={{ text: note, onChangeText: setNote, numberOfLines:6, multiline: true }}
      />
      {/* <TakePhoto imageHandler={imageHandler} /> */}
      <PitButton style={styles.button} onPress={saveParking} text={"Add New Parking"}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.BASE[0],
    padding:24
  },
  button: {
    alignItems: 'center',
    marginTop: 120,
  }
});
