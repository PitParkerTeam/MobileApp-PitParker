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
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.authContent}>
        <Image source={require("./My_Location.png")} />
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={(newEmail) => setEmail(newEmail)}
          value={email}
          keyboardType="email-address"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(newPass) => setPassword(newPass)}
          value={password}
          placeholder="Password"
        />
        <Text style={styles.label}>Confirm password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(newPass) => setConfirmPassword(newPass)}
          value={confirmpassword}
          placeholder="Password"
        />
        <Button title="Register" onPress={handleSignup} />
        <Button
          title="Already Registered? Login"
          onPress={() => navigation.replace("Login")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASE[0],
  },
  authContent: {
    padding: 16,
    flex: 1,
    justifyContent: "center",
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
    borderWidth: 2,
  },
});
