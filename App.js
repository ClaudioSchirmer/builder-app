import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View, Text, Platform } from "react-native";
import Constants from "expo-constants";
import Header from "./src/components/Header";
import HomeScreen from "./src/screens/HomeScreen";
import { backgroundColor } from "./src/styles";
import ComponentsBuilder from "./src/helpers/ComponentsBuilder";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const cBuilder = new ComponentsBuilder();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: backgroundColor,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="default" />
      <Header />
      <HomeScreen componentsBuilder={cBuilder} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
