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
import { auth } from "../api";
import { signInWithEmailAndPassword } from "firebase/auth";
import { COLORS, TEXT_STYLES } from "../common";
import { BottomContainer, PitButton } from "../components";

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      Alert.alert(err.message);
      console.log(err.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.authContent}>
        <View style={styles.img}>
          <Image source={require("./My_Location.png")} />
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
        <BottomContainer style={styles.bottomContainer}>
          <PitButton text="Log In" type="primary" onPress={handleLogin} />
          <PitButton
            text="Sign Up"
            onPress={() => navigation.replace("Signup")}
          />
        </BottomContainer>
        {/* <View style={styles.button}>
          <Button title="Log In" onPress={handleLogin} />
        </View>
        <View style={styles.button}>
          <Button
            title="New User? Create an account"
            onPress={() => navigation.replace("Signup")}
          />
        </View> */}
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
    marginTop: 20,
    marginBottom: 40,
  },
  img: {
    // justifyContent: "center",
    alignItems: "center",
    // alignContent: "center",
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
    padding: 16,
    flex: 1,
    // justifyContent: "center",
  },
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 2,
    ...TEXT_STYLES.heading.h5,
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
  button: {
    marginTop: 5,
  },
  bottomContainer: {
    marginTop: 20,
    paddingVertical: 12,
    alignItems: "center",
    flexDirection: "column",
  },
});
