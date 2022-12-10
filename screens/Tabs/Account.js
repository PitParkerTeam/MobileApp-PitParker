import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../api";
import { BottomContainer, PitButton } from "../../components";
import { COLORS, TEXT_STYLES } from "../../common";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function ProfileSettings({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Account</Text>
      <View style={{ paddingHorizontal: 24 }}>
        <Pressable onPress={() => navigation.navigate("ManageAccount")}>
          <View style={styles.tabs}>
            <View style={styles.account}>
              <Ionicons
                name="settings-outline"
                size={24}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.tabText}>Manage Account</Text>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Notifications")}>
          <View style={styles.tabs}>
            <View style={styles.notification}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.tabText}>Notifications</Text>
              <Entypo name="chevron-right" size={24} color="black" style={{marginLeft: 38}} />
            </View>
          </View>
        </Pressable>
      </View>
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
  tabs: {
    borderColor: COLORS.BASE[40],
    borderWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    marginBottom:25,
  },
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.BASE[20],
  },
  account: {
    marginTop: 40,
    flexDirection: "row",
    marginBottom: 20,
  },
  notification: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tabText: {
    fontSize: 20,
    marginRight: 80,
  },
  icon: {
    marginHorizontal: 28,
  },
  bottom: {
    marginTop: 330,
    borderTopColor: COLORS.BASE[40],
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    flexDirection: "column",
  }
});
