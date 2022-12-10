import {
  SafeAreaView,
  Text,
  Button,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import React from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../api";
import { BottomContainer, PitButton, SmallMap } from "../../components";
import { COLORS, TEXT_STYLES } from "../../common";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function ProfileSettings() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Account</Text>
      <View style={{paddingHorizontal: 24}}>
        <Pressable>
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
      </View>
      <BottomContainer>
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
    marginBottom: 50,
    
  },
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.BASE[20],
  },
  account: {
    marginTop: 40,
    flexDirection: "row",
    marginBottom: 20,
    // justifyContent: "space-between",
  },
  tabText: {
    fontSize: 20,
    marginRight: 80,
  },
  icon: {
    marginHorizontal: 28,
  },
});
