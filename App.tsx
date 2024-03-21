import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MapComponent from "./components/MapComponent";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <MapComponent />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>

      <StatusBar style="auto" />
    </View>
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
