import { StyleSheet } from "react-native";
import {
  accentColor,
  backgroundColor,
  primaryColor,
  secondaryColor,
} from "../../styles";

const styles = StyleSheet.create({
  button: {
    backgroundColor: accentColor,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginRight: 10,
    borderRadius: 5,
    width: 30,
    marginLeft: "auto",
  },
  buttonText: {
    color: primaryColor,
    fontWeight: "bold",
  },
  leftRightContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default styles;
