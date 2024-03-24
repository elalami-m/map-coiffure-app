import { getNotificationPermission } from "./getNotificationPermission";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { isDevice } from "expo-device";
import Constants from "expo-constants";

/**
 * Function to generate a push notification token.
 * @returns {Promise<string | null>} A Promise resolving to the generated token or null if unsuccessful.
 */
const generateNotificationsToken = async (): Promise<string | null> => {
  let token;
  try {
    // Check if the app is running on a physical device
    if (isDevice) {
      // Get the current notification permission status
      const existingStatus = await getNotificationPermission();
      // If permission is not granted, log an error and return null
      if (!existingStatus) {
        console.log("Failed to get push token for push notification!");
        return null;
      }
      // If running on Android, set notification channel configuration
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          sound: "notification.wav",
          lightColor: "#FFFFFF",
        });
      }
      // Get the Expo push token
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas.projectId,
        })
      ).data;
      return token;
    } else {
      // If not running on a physical device, log an error and return null
      console.log("Must use a physical device for Push Notifications");
      return null;
    }
  } catch (error) {
    // Handle any errors that occur during the token generation process
    console.log("Error:", error);
    return null;
  }
};

export default generateNotificationsToken;
