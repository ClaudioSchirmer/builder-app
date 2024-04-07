import { StyleSheet } from "react-native";
import { primaryColor } from "../../styles";

const styles = StyleSheet.create({
  button: {
    width: 30,
    height: 30,
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
  viewView: {
    flex: 1,
    margin: 5,
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  viewSimpleItem: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
  },
  viewTouchable: {
    flex: 1,
    margin: 5,
    flex: 1,
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default styles;
