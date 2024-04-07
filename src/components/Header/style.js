import { StyleSheet } from "react-native";
import { primaryColor, secondaryColor, accentColor } from "../../styles";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: primaryColor,
    borderBottomWidth: 1,
    padding: 5,
  },
  title: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: primaryColor,
  },
  developer: {
    marginLeft: "auto",
    color: secondaryColor,
  },
});

export default styles;
