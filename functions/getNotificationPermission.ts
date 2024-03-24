import * as Notifications from "expo-notifications";
import { openSettings } from "expo-linking";
import { Alert } from "react-native";

/**
 * Function to check and request notification permission.
 * @returns {Promise<boolean>} A Promise resolving to true if permission is granted, false otherwise.
 */
export const getNotificationPermission = async (): Promise<boolean> => {
  // Check the current notification permission status
  const { status: getPermissionStatus } =
    await Notifications.getPermissionsAsync();

  // If permission is not granted, request permission
  if (getPermissionStatus !== "granted") {
    // Request notification permissions, specifying options for iOS
    const { status: requestPermissionStatus } =
      await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowAnnouncements: true,
        },
      });

    // If permission is still not granted after request, prompt user to go to settings
    if (requestPermissionStatus !== "granted") {
      Alert.alert(
        "Notification Permission",
        "Please go to settings to give us the notifications permission",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Go to settings",
            onPress: async () => await openSettings(),
          },
        ]
      );
      return false;
    }

    // Return true if permission is granted after request
    return true;
  }

  // Return true if permission is already granted
  return true;
};
