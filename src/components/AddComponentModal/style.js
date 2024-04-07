import { StyleSheet } from "react-native";
import {
  accentColor,
  backgroundColor,
  primaryColor,
  secondaryColor,
} from "../../styles";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    margin: 20,
  },
  modalButtonOk: {
    backgroundColor: accentColor,
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    borderColor: primaryColor,
    borderWidth: 1,
  },
  modalButtonCancel: {
    backgroundColor: backgroundColor,
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    borderColor: primaryColor,
    borderWidth: 1,
  },
  modalButtonTextOK: {
    color: primaryColor,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  modalButtonTextCancel: {
    color: secondaryColor,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  leftRightContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  textInput: {
    height: 40,
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    borderColor: primaryColor,
    padding: 5,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
  switchText: {
    fontSize: 18,
  },
});

export default styles;
