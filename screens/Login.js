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
        <View>
          <Image source={require("./My_Location.png")} />
        </View>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={(newEmail) => setEmail(newEmail)}
          value={email}
          keyboardType="email-address"
        />
        <Text style={styles.label}>password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(newPass) => setPassword(newPass)}
          value={password}
          placeholder="Password"
        />
        <View style={styles.button}>
          <Button title="Log In" onPress={handleLogin} />
        </View>
        <View style={styles.button}>
          <Button
            title="New User? Create an account"
            onPress={() => navigation.replace("Signup")}
          />
        </View>
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
  button: {
    marginTop: 5,
  },
});
