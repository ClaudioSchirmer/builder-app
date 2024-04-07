import { StyleSheet } from "react-native";
import { primaryColor, backgroundColor, secondaryColor } from "../../styles";

const styles = StyleSheet.create({
  tabNavigator: {
    flex: 1,
    headerStyle: {
      backgroundColor: backgroundColor,
      shadowColor: "#000000",
    },
    headerTintColor: primaryColor,
    headerTitleAlign: "center",
    headerTitleStyle: {
      fontWeight: "bold",
    },
    tabBarActiveTintColor: secondaryColor,
    tabBarStyle: {
      backgroundColor: backgroundColor,
      paddingBottom: 5,
    },
  },
});

export default styles;
