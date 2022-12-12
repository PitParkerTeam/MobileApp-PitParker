import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Pressable,
  TextInput,
} from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../api";
import { BottomContainer, PitButton } from "../../components";
import { COLORS, TEXT_STYLES } from "../../common";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ProfileSettings({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Account</Text>
      <View style={styles.contentContainer}>
        <View style={{ paddingHorizontal: 24 }}>
          <View style={styles.tabContainer}>
            <Text style={styles.title}>Email</Text>
            <TextInput style={styles.input} value={"abc@aaa.com"}></TextInput>
          </View>
          <View>
            <View style={styles.tabContainer}>
              <Text style={styles.title}>Current Password</Text>
              <TextInput
                style={styles.input}
                placeholder={"abc@aaa.com"}
              ></TextInput>
            </View>
          </View>
          <View>
            <View style={styles.tabContainer}>
              <Text style={styles.title}>New Password</Text>
              <TextInput
                style={styles.input}
                placeholder={"abc@aaa.com"}
              ></TextInput>
            </View>
            <View style={styles.tabContainer}>
              <Text style={styles.title}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder={"abc@aaa.com"}
              ></TextInput>
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
      {/* <View style={{ paddingHorizontal: 24 }}>
        <Pressable onPress={() => navigation.navigate("ManageAccount")}>
          <View style={styles.tabs}>
            <Icon
              name="cog-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.tabText}>Manage Account</Text>
            <Icon name="chevron-right" size={24} color={COLORS.BASE[100]} />
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Notifications")}>
          <View style={styles.tabs}>
            <Icon
              name="bell-badge-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.tabText}>Notifications</Text>
            <Icon
              name="chevron-right"
              size={24}
              color="black"
            />
          </View>
        </Pressable> */}
      {/* </View> */}
      <BottomContainer style={styles.bottom}>
        <PitButton text="Sign Out" onPress={() => signOut(auth)} />
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
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.BASE[20],
  },
  contentContainer: {
    marginTop: 20,
  },
  tabText: {
    fontSize: 20,
    width: 290,
  },
  icon: {
    marginHorizontal: 12,
    width: 40,
  },
  saveButton: {
    fontSize: 11,
  },
  pitButton: {
    width: 150,
    height: 40,
  },
  buttonContainer: {
    // paddingLeft: -100,
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
