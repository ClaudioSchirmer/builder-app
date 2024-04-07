import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./style";
import { secondaryColor } from "../../styles";

export default function Header() {
  return (
    <View style={styles.container}>
      <FontAwesome5 name="hat-wizard" size={20} color={secondaryColor} />
      <Text style={styles.title}>React-Native builder App</Text>
      <Text style={styles.developer}>by Claudio Schirmer</Text>
    </View>
  );
}
