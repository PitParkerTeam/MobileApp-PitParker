import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DatePicker from "@react-native-community/datetimepicker";
import { COLORS, TEXT_STYLES } from "../../common";

export default function TimePeriodPicker({ initialStartTime, initialEndTime, onStartTimeChange, onEndTimeChange }) {
  // Declare a state variable to store the selected time period
  const [timePeriod, setTimePeriod] = useState({
    startTime: initialStartTime,
    endTime: initialEndTime,
  });

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.subTitle}>Start Time </Text>
        {/* Use DatePicker to allow the user to select the start date */}
        <View style={styles.datePicker}>
          <DatePicker
            mode="date"
            value={timePeriod.startTime}
            onChange={(event, startTime) => {
              if (startTime) {
                setTimePeriod((prevTimePeriod) => ({
                  ...prevTimePeriod,
                  startTime,
                }));
                onStartTimeChange(startTime);
              }
            }}
          />

          {/* Use DatePicker to allow the user to select the start time */}
          <DatePicker
            mode="time"
            value={timePeriod.startTime}
            onChange={(event, startTime) => {
              if (startTime) {
                setTimePeriod((prevTimePeriod) => ({
                  ...prevTimePeriod,
                  startTime,
                }));
                onStartTimeChange(startTime);
              }
            }}
          />
        </View>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.subTitle}>End Time </Text>
        {/* Use DatePicker to allow the user to select the end date */}
        <View style={styles.datePicker}>
          <DatePicker
            mode="date"
            value={timePeriod.endTime}
            onChange={(event, endTime) => {
              if (endTime) {
                setTimePeriod((prevTimePeriod) => ({
                  ...prevTimePeriod,
                  endTime,
                }));
                onEndTimeChange(endTime);
              }
            }}
          />

          {/* Use DatePicker to allow the user to select the end time */}
          <DatePicker
            mode="time"
            value={timePeriod.endTime}
            onChange={(event, endTime) => {
              if (endTime) {
                setTimePeriod((prevTimePeriod) => ({
                  ...prevTimePeriod,
                  endTime,
                }));
                onEndTimeChange(endTime);
              }
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical:12,
  },
  container: {
    paddingVertical: 5,
  },

  separator: {
    marginVertical: 20,
    height: 1,
    backgroundColor: "#333",
  },
  selectedPeriod: {
    fontSize: 16,
    marginTop: 20,
  },
  subTitle: {
    ...TEXT_STYLES.title[500],
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    width:"57%",
    justifyContent:"space-between",
  },

});


