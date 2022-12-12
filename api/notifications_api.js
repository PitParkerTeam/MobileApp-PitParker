import * as Notifications from "expo-notifications";


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

const notificationsAPI = {
  async parkingReminder(date, minutes = 15) {
    const trigger = new Date(date);
    trigger.setMinutes(date.getMinutes() - minutes);
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        return;
      }
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "You have a notification",
          body: `Your parking will end in ${minutes} minutes`,
        },
        trigger,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
export default notificationsAPI