import { View, Text, Button } from "react-native";
import React from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-setup";
export default function ProfileSettings() {
  return (
    <View>
      <Text>
        <Button title="Logout" onPress={() => signOut(auth)} />
      </Text>
    </View>
  );
}
