import { SafeAreaView, Text, Button } from "react-native";
import React from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../api";
import { BottomContainer, PitButton, SmallMap } from "../../components";

export default function ProfileSettings() {
  return (
    <SafeAreaView>
      <BottomContainer>
        <PitButton 
          text="Sign Out"
          onPress={() => signOut(auth)}
        />
      </BottomContainer>
      {/* <Text>
        <Button title="Logout" onPress={() => signOut(auth)} />
      </Text> */}
    </SafeAreaView>
  );
}
