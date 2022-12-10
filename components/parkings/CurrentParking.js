import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { TEXT_STYLES, COLORS, formatTime } from "../../common";
import { SmallMap } from "../maps";
import { useNavigation } from "@react-navigation/core";

export default function CurrentParking({ parking, showMap }) {
  const { name, startTime, endTime, longitude, latitude, id } = parking;
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeftInSeconds =
        Math.max(0, endTime.toDate() - Date.now()) / 1000;
      setTimeLeft({
        hours: Math.floor(timeLeftInSeconds / 3600),
        minutes: Math.floor((timeLeftInSeconds % 3600) / 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("ParkingDetails", {id})
  }

  return (
    <View style={styles.container}>
      {showMap && <SmallMap location={{ longitude, latitude }} />}
      <Pressable style={{ padding: 18 }} onPress={handlePress}>
        <Text style={styles.title}>Parking {name && `@ ${name}`}</Text>
        <View style={styles.mainText}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.alignCenter}>
              <View style={styles.countdownBG}>
                <Text style={styles.countdownText}>{timeLeft.hours}</Text>
              </View>
              <Text style={styles.smallText}>HOURS</Text>
            </View>
            <Text style={styles.countdownText}> : </Text>
            <View style={styles.alignCenter}>
              <View style={styles.countdownBG}>
                <Text style={styles.countdownText}>{timeLeft.minutes}</Text>
              </View>
              <Text style={styles.smallText}>MINUTES</Text>
            </View>
          </View>
          <View>
            <Text style={styles.parkAt}>
              Parked at {"\n"}
              {formatTime(new Date(startTime.seconds* 1000))}
            </Text>
            <Text style={styles.click}>{"Click to View Details >>"}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  alignCenter: { alignItems: "center" },
  container: {
    borderRadius: 8,
    backgroundColor: COLORS.BASE[0],
    width: "100%",
    borderColor: COLORS.BASE[40],
    borderWidth: 1,
    marginVertical: 6,
  },
  mainText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightText: {
    textAlign: "right",
  },
  parkAt: {
    textAlign: "right",
    ...TEXT_STYLES.base[600],
    marginBottom: 18,
  },
  click: {
    textAlign: "right",
    ...TEXT_STYLES.base[400],
    color: COLORS.TINT[100],
  },
  title: {
    ...TEXT_STYLES.heading.h4,
    marginBottom: 16,
  },
  smallText: {
    ...TEXT_STYLES.body[600],
    color:COLORS.TINT[100]
  },
  countdownText: {
    ...TEXT_STYLES.heading.h4,
    color: COLORS.TINT[100],
    height: 50,
    textAlign: "center",
    lineHeight: 45,
  },
  countdownBG: {
    backgroundColor: COLORS.TINT[20],
    width: 50,
    height: 50,
    borderRadius: 8,
    marginBottom: 8,
  },
});
