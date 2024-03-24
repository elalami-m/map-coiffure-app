import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Chatwoot from "./components/Chatwoot";
import { useEffect, useState } from "react";
import generateNotificationsToken from "./functions/generateNotificationsToken";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [notificationsToken, setNotificationsToken] = useState<string>();

  useEffect(() => {
    (async () => {
      const oldToken = await AsyncStorage.getItem("pushNotificationToken");
      const newToken = await generateNotificationsToken();

      if (newToken && oldToken !== newToken) {
        console.log(newToken);

        setNotificationsToken(newToken);
        AsyncStorage.setItem("pushNotificationToken", newToken);
      } else {
        if (oldToken) {
          console.log(oldToken);
          setNotificationsToken(oldToken);
        }
      }
    })();
  }, []);

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
