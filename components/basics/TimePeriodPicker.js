import React, { useState } from 'react';
import { View, Text } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';

export default function TimePeriodPicker({ initialStartTime, initialEndTime })  {
  // Declare a state variable to store the selected time period
  const [timePeriod, setTimePeriod] = useState({
    startTime: initialStartTime,
    endTime: initialEndTime,
  });

  return (
    <View>
      <Text>Select time period:</Text>

      {/* Use DatePicker to allow the user to select the start date */}
      <DatePicker
        mode="date"
        value={timePeriod.startTime}
        onChange={(event, startTime) => {
          if (startTime) {
            setTimePeriod((prevTimePeriod) => ({
              ...prevTimePeriod,
              startTime,
            }));
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
          }
        }}
      />

      {/* Use DatePicker to allow the user to select the end date */}
      <DatePicker
        mode="date"
        value={timePeriod.endTime}
        onChange={(event, endTime) => {
          if (endTime) {
            setTimePeriod((prevTimePeriod) => ({
              ...prevTimePeriod,
              endTime,
            }));
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
          }
        }}
      />

      {/* Display the selected time period */}
      <Text>
        Selected time period: {timePeriod.startTime.toString()} - {timePeriod.endTime.toString()}
      </Text>
    </View>
  );
};
