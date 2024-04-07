import { StyleSheet } from "react-native";
import { accentColor, primaryColor } from "../../styles";

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textError: {
    fontSize: 20,
    color: "red",
    fontWeight: "bold",
  },
});

export default styles;
