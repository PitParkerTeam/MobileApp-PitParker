import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { BottomContainer, PitButton } from "../components";
import { COLORS, TEXT_STYLES } from "../common";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

export default function ChangePassword({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const email = user.email;

  const [secureTextEntry1, setSecureTextEntry1] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);
  const [secureTextEntry3, setSecureTextEntry3] = useState(true);

  const [userProvidedPassword, setUserProvidedPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState("");

  const changePassword = () => {
    if (newPassword === validatePassword && newPassword !== "") {
      const credential = EmailAuthProvider.credential(
        email,
        userProvidedPassword
      );
      reauthenticateWithCredential(user, credential)
        .then(() => {
          // User re-authenticated.
          // console.log("success");
          updatePassword(user, newPassword)
            .then(() => {
              // Update successful.
              Alert.alert("Notice", "Successfully updated your New Password!");
              signOut(auth);
            })
            .catch((error) => {
              // console.log("Update password failed, ", error);
              Alert.alert("Update password failed, ", error);
            });
        })
        .catch((error) => {
          console.log("Re-authentication failed, ", error);
          Alert.alert(
            "Action Failed",
            "Please make sure the Current Password is correct."
          );
        });
    } else {
      Alert.alert(
        "Action Failed",
        "New Password is empty or does not match Confirm Password"
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
                value={userProvidedPassword}
                onChangeText={(newText) => setUserProvidedPassword(newText)}
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
                value={newPassword}
                onChangeText={(newText) => setNewPassword(newText)}
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

              <TextInput
                style={styles.input}
                secureTextEntry={secureTextEntry3}
                value={validatePassword}
                onChangeText={(newText) => setValidatePassword(newText)}
              ></TextInput>
            </View>
          </View>
        </View>
      </View>
      <BottomContainer style={styles.bottom}>
        <PitButton
          text="Change my password"
          type="primary"
          onPress={() => changePassword()}
        />
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

  bottom: {
    borderTopColor: COLORS.BASE[40],
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
    width: "100%",
    bottom: 80,
  },
});
