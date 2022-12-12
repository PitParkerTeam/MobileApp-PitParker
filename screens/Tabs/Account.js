import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../api";
import { BottomContainer, PitButton } from "../../components";
import { COLORS, TEXT_STYLES } from "../../common";
import { getAuth, reauthenticateWithCredential } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function ProfileSettings({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const email = user.email;

  const [secureTextEntry1, setSecureTextEntry1] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);
  const [secureTextEntry3, setSecureTextEntry3] = useState(true);

  // TODO(you): prompt the user to re-provide their sign-in credentials
  // const credential = promptForCredentials();

  // reauthenticateWithCredential(user, credential)
  //   .then(() => {
  //     // User re-authenticated.
  //     console.log("successful")
  //   })
  //   .catch((error) => {
  //     // An error ocurred
  //     // ...
  //     console.log(error)
  //   });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Account</Text>
      <View style={styles.contentContainer}>
        <View style={{ paddingHorizontal: 24 }}>
          <View style={styles.tabContainer}>
            <Text style={styles.title}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              editable={false}
            ></TextInput>
          </View>
          <View>
            <View style={styles.tabContainer}>
              <View flexDirection="row">
                <Text style={styles.title}>Current Password </Text>
                <TouchableOpacity
                  onPress={() => setSecureTextEntry1(!secureTextEntry1)}
                >
                  <Ionicons name="ios-eye" size={24} />
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.input}
                secureTextEntry={secureTextEntry1}
              ></TextInput>
            </View>
          </View>
          <View>
            <View style={styles.tabContainer}>
              <View flexDirection="row">
                <Text style={styles.title}>New Password </Text>
                <TouchableOpacity
                  onPress={() => setSecureTextEntry2(!secureTextEntry2)}
                >
                  <Ionicons name="ios-eye" size={24} />
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.input}
                secureTextEntry={secureTextEntry2}
              ></TextInput>
            </View>
            <View style={styles.tabContainer}>
              <View flexDirection="row">
              <Text style={styles.title}>Confirm Password </Text>
              <TouchableOpacity
                  onPress={() => setSecureTextEntry3(!secureTextEntry3)}
                >
                  <Ionicons name="ios-eye" size={24} />
                </TouchableOpacity>
              </View>
              
              <TextInput style={styles.input} secureTextEntry={secureTextEntry3}></TextInput>
            </View>
            <View style={styles.buttonContainer}>
              <PitButton
                text="Change my password"
                type="primary"
                style={styles.pitButton}
                textStyle={styles.saveButton}
              />
            </View>
          </View>
        </View>
      </View>
      <BottomContainer style={styles.bottom}>
        <PitButton text="Sign Out" onPress={() => signOut(auth)} />
        <PitButton text="Reauth" onPress={() => reauthenticateWithCredential} />
      </BottomContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASE[0],
  },
  header: {
    ...TEXT_STYLES.heading.h2,
    marginLeft: "4%",
    marginBottom: "3%",
  },
  input: {
    height: 40,
    padding: 10,
    backgroundColor: COLORS.BASE[20],
    borderRadius: 4,
  },
  tabContainer: {
    paddingBottom: 30,
  },
  title: {
    ...TEXT_STYLES.title[500],
    paddingBottom: 2,
  },

  tabs: {
    borderColor: COLORS.BASE[40],
    borderWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    height: 70,
    lineHeight: 70,
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    marginTop: 20,
  },
  saveButton: {
    fontSize: 11,
  },
  pitButton: {
    width: 150,
    height: 40,
  },
  buttonContainer: {
    marginLeft: -10,
    marginTop: -20,
  },
  bottom: {
    borderTopColor: COLORS.BASE[40],
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
    width: "100%",
    bottom: 30,
  },
});
