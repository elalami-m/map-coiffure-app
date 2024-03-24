import * as Notifications from "expo-notifications";

/**
 * Interface representing the shape of a push notification.
 * @interface
 */
export interface IPushNotification {
  /** The recipient's Expo push token. */
  to: string;
  /** The sound to play when the notification is received. (default is "default") */
  sound?: string;
  /** The title of the notification. */
  title: string;
  /** The body of the notification. */
  body: string;
  /** Additional data to be sent with the notification. (optional) */
  data?: object;
}

/**
 * Function to send a push notification using Expo's push notification service.
 * @param {IPushNotification} notification - The push notification object.
 * @returns {Promise<void>} - A Promise indicating the success or failure of the notification sending process.
 */
const sendPushNotifications = async ({
  to,
  sound = "default",
  title,
  body,
  data,
}: IPushNotification): Promise<void> => {
  // Create the message object to be sent as a push notification
  const message = {
    to,
    sound,
    title,
    body,
    data,
  };

  try {
    // Set notification handler for Expo notifications
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    // Send the push notification via Expo's API
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    // Handle any errors that occur during the notification sending process
    console.log((<Error>error).message);
  }
};

export default sendPushNotifications;
