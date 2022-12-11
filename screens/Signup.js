import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, userAPI } from "../api";
import { COLORS, TEXT_STYLES } from "../common";
import { BottomContainer, PitButton } from "../components";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmpassword, setConfirmPassword] = useState(null);
  const handleSignup = async () => {
    // some check here
    if (password.length < 6) {
      Alert.alert("The password needs to be minimum 6 characters");
      return;
    }
    if (password !== confirmpassword) {
      Alert.alert("The password and confirmed password don't match");
      return;
    }
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((cred) => userAPI.addUser(cred.user));
    } catch (err) {
      console.log(err);
      Alert.alert(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.authContent}>
        <View style={styles.img}>
          <Image source={require("../assets/My_Location.png")} />
        </View>
        <View style={styles.name}>
          <View style={styles.title}>
            <Text style={styles.title}>PitParker</Text>
          </View>
          <View style={styles.intro}>
            <Text style={styles.intro}>Park in your own pit</Text>
          </View>
        </View>
        <View style={styles.label}>
          <Text style={styles.label}>Email</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={(newEmail) => setEmail(newEmail)}
          value={email}
          keyboardType="email-address"
        />
        <View style={styles.label}>
          <Text style={styles.label}>Password</Text>
        </View>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(newPass) => setPassword(newPass)}
          value={password}
        />
        <View style={styles.label}>
          <Text style={styles.label}>Confirm Password</Text>
        </View>
        {/* <Text style={styles.label}>Confirm password</Text> */}
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(newPass) => setConfirmPassword(newPass)}
          value={confirmpassword}
        />
        <BottomContainer style={styles.bottomContainer}>
          <PitButton text="Sign Up" type="primary" onPress={handleSignup} />
          <PitButton
            text="Log In"
            onPress={() => navigation.replace("Login")}
          />
        </BottomContainer>
        {/* <Button title="Register" onPress={handleSignup} />
        <Button
          title="Already Registered? Login"
          onPress={() => navigation.replace("Login")}
        /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASE[0],
  },
  name: {
    // marginTop: 5,
    marginBottom: 40,
  },
  img: {
    top: -20,
    alignItems: "center",
  },
  title: {
    ...TEXT_STYLES.heading.h1,
    alignItems: "center",
  },
  intro: {
    ...TEXT_STYLES.base[400],
    alignItems: "center",
  },
  authContent: {
    padding: 24,
    paddingTop: 70,
    flex: 1,
    // justifyContent: "center",
  },
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 4,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 4,
    fontSize: 16,
    borderColor: "black",
    borderWidth: 0,
    marginBottom: 20,
    height: 40,
    padding: 10,
    backgroundColor: COLORS.BASE[20],
    borderRadius: 4,
  },
  bottomContainer: {
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
    bottom: 50,
    width: "100%",
    justifyContent: "center",
    left: 24,
    right: 24,
  },
  label: {
    marginBottom: 2,
    ...TEXT_STYLES.heading.h5,
  },
});
