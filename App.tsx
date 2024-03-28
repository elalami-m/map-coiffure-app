import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Chatwoot from "./components/Chatwoot";
import { useEffect, useState } from "react";
<<<<<<< HEAD
=======
import generateNotificationsToken from "./functions/generateNotificationsToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getNotificationPermission } from "./functions/getNotificationPermission";
>>>>>>> ee1b909890bbc7fc5f81188d878ad29e2caaf415
import { firebase } from "@react-native-firebase/messaging";

export default function App() {

  // useEffect(() => {
  //   (async () => {
  //     const oldToken = await AsyncStorage.getItem("pushNotificationToken");
  //     const newToken = await generateNotificationsToken();

  //     if (newToken && oldToken !== newToken) {
  //       console.log(newToken);

  //       setNotificationsToken(newToken);
  //       AsyncStorage.setItem("pushNotificationToken", newToken);
  //     } else {
  //       if (oldToken) {
  //         console.log(oldToken);
  //         setNotificationsToken(oldToken);
  //       }
  //     }
  //   })();
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     const oldToken = await AsyncStorage.getItem("pushNotificationToken");
  //     const newToken = await generateNotificationsToken();

  //     if (newToken && oldToken !== newToken) {
  //       console.log(newToken);

  //       setNotificationsToken(newToken);
  //       AsyncStorage.setItem("pushNotificationToken", newToken);
  //     } else {
  //       if (oldToken) {
  //         console.log(oldToken);
  //         setNotificationsToken(oldToken);
  //       }
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    
    (async () => {
      try {
        if (await firebase.messaging().requestPermission()) {
          const token = await firebase.messaging().getToken();
<<<<<<< HEAD
          await fetch(`https://milo.ma/fcm_script/saveToken.php`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ fcm_token: token }),
          });
=======
          console.log(token);
>>>>>>> ee1b909890bbc7fc5f81188d878ad29e2caaf415
        }
      } catch (error) {
        console.log(error);
      }
    })();

  }, []);

  // fetch(
  //   "https://fcm.googleapis.com/v1/projects/coiffure-app-30090/messages:send",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization:
  //         "Bearer ya29.a0Ad52N3834MgVkdsxPqJYUps7h9B8zKDhQrr-rmqOWTGAmUdANLkrdpurlM5x4eAj54cPFjWrumJ3iWfrBqXlnZSa-fUXe3H1Q-i3hWPsNDnrRGA3Lhg1WCBZHHOZCuRdQIncdyr9NC3__l3HzDDFoMCoNyu7mE6mm26daCgYKAY8SARESFQHGX2MilgH7oVfQJY_v6_TAJiU9PA0171",
  //     },
  //     body: JSON.stringify({
  //       message: {
  //         token:
  //           "ea9rjSV6T9Ox4HLyna_S2O:APA91bFYdD2GYIMrcNGOUKM_R6ldpZAKoDDoN7WiDfIFAGOtZJ7aWSQ6-03AZK_Ud6OEtCGUPAZv1WF7Rk-lzeAZLvyZkNN0tys6b5NWdMBeSUVPy_BPpI2AtBXHbi5QAhyzVGYHknOb",
  //         notification: {
  //           body: "This is an FCM notification message!",
  //           title: "FCM Message",
  //         },
  //       },
  //     }),
  //   }
  // )
  //   .then((response) => {
  //     // console.log(response);

  //     if (!response.ok) {
  //       // throw new Error("Failed to send FCM message");
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log("FCM message sent successfully:", data);
  //   })
  //   .catch((error) => {
  //     console.error("Error sending FCM message:", error);
  //   });


  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <BottomSheetModalProvider>
          <Chatwoot />
        </BottomSheetModalProvider>

        <StatusBar style="auto" />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
