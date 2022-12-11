import { View, Button } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";

export default function NotificationManager( {timeInSeconds} ) {
//   const name = "Neda";
  const verifyPermission = async () => {
    const permissionStatus = await Notifications.getPermissionsAsync();
    if (permissionStatus.granted) {
      return true;
    }
    const requestedPermission = await Notifications.requestPermissionsAsync({
      ios: {
        allowBadge: true,
      },
    });
    return requestedPermission.granted;
  };

  const scheduleNotificationHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        return;
      }
      await Notifications.scheduleNotificationAsync({
        content: {
        //   title: "You have a notification",
        //   body: `This is my first local notificaftion ${name}`,
        //   color: "red",
        //   data: { url: "https://www.google.ca" },
          title: "You have a notification",
          body: `Your parking will end in 15 minutes`,
          color: "red",
          data: { url: "https://www.google.ca" },
        },
        trigger: {
          seconds: timeInSeconds,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };


  scheduleNotificationHandler();

  return;
}
