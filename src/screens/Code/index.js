import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import CodeBuilder from "../../helpers/CodeBuilder";
import styles from "./style";
import * as Clipboard from "expo-clipboard";

export default function Code({ components, componentsFlatArray }) {
  const cBuilder = new CodeBuilder(components, componentsFlatArray);

  const copyHandler = async () => {
    Clipboard.setStringAsync(cBuilder.getCode());
  };

  return (
    <>
      {cBuilder.hasCodeToBeGenerated() ? (
        <>
          <ScrollView>
            <Text>{cBuilder.getCode()} </Text>
          </ScrollView>
          <TouchableOpacity
            style={styles.buttonOk}
            onPress={() => {
              copyHandler();
            }}
          >
            <Text style={styles.buttonTextOk}>Copy</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.container}>
          <Text style={styles.textError}>
            No code available to be generated!
          </Text>
        </View>
      )}
    </>
  );
}
