// import React, { useState } from 'react';
// import { View, Text } from 'react-native';
// import DatePicker from '@react-native-community/datetimepicker';

// export default function TimePeriodPicker({ initialStartTime, initialEndTime })  {
//   // Declare a state variable to store the selected time period
//   const [timePeriod, setTimePeriod] = useState({
//     startTime: initialStartTime,
//     endTime: initialEndTime,
//   });

//   return (
//     <View>
//       <Text>Select time period:</Text>

//       {/* Use DatePicker to allow the user to select the start date */}
//       <DatePicker
//         mode="date"
//         value={timePeriod.startTime}
//         onChange={(event, startTime) => {
//           if (startTime) {
//             setTimePeriod((prevTimePeriod) => ({
//               ...prevTimePeriod,
//               startTime,
//             }));
//           }
//         }}
//       />

//       {/* Use DatePicker to allow the user to select the start time */}
//       <DatePicker
//         mode="time"
//         value={timePeriod.startTime}
//         onChange={(event, startTime) => {
//           if (startTime) {
//             setTimePeriod((prevTimePeriod) => ({
//               ...prevTimePeriod,
//               startTime,
//             }));
//           }
//         }}
//       />

//       {/* Use DatePicker to allow the user to select the end date */}
//       <DatePicker
//         mode="date"
//         value={timePeriod.endTime}
//         onChange={(event, endTime) => {
//           if (endTime) {
//             setTimePeriod((prevTimePeriod) => ({
//               ...prevTimePeriod,
//               endTime,
//             }));
//           }
//         }}
//       />

//       {/* Use DatePicker to allow the user to select the end time */}
//       <DatePicker
//         mode="time"
//         value={timePeriod.endTime}
//         onChange={(event, endTime) => {
//           if (endTime) {
//             setTimePeriod((prevTimePeriod) => ({
//               ...prevTimePeriod,
//               endTime,
//             }));
//           }
//         }}
//       />

//       {/* Display the selected time period */}
//       <Text>
//         Selected time period: {timePeriod.startTime.toString()} - {timePeriod.endTime.toString()}
//       </Text>
//     </View>
//   );
// };

import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DatePicker from "@react-native-community/datetimepicker";

export default function TimePeriodPicker({ initialStartTime, initialEndTime }) {
  // Declare a state variable to store the selected time period
  const [timePeriod, setTimePeriod] = useState({
    startTime: initialStartTime,
    endTime: initialEndTime,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select parking period:</Text>

      {/* Use DatePicker to allow the user to select the start date */}
      <View style={{ flexDirection: "row" }}>
        <Text>Start Time: </Text>
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
      </View>

      {/* Use DatePicker to allow the user to select the end date */}
      <View style={{ flexDirection: "row" }}>
        <Text>End Time: </Text>
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
      </View>

      {/* Display the selected time period */}
      {/* <Text style={styles.selectedPeriod}>
        Selected time period: {timePeriod.startTime.toString()} - {timePeriod.endTime.toString()}
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
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
});
