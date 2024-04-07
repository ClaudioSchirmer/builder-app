import { StyleSheet } from "react-native";
import {
  accentColor,
  backgroundColor,
  primaryColor,
  secondaryColor,
} from "../../styles";

const styles = StyleSheet.create({
  svContainer: {
    flex: 1,
    padding: 10,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  buttonOk: {
    backgroundColor: accentColor,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderRadius: 10,
    borderColor: primaryColor,
    borderWidth: 1,
  },
  buttonTextOk: {
    color: primaryColor,
    fontWeight: "bold",
  },
  buttonCancel: {
    backgroundColor: backgroundColor,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderRadius: 10,
    borderColor: primaryColor,
    borderWidth: 1,
  },
  buttonTextCancel: {
    color: secondaryColor,
    fontWeight: "bold",
  },
});

export default styles;
