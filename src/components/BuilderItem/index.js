import { View, Text, TouchableOpacity } from "react-native";
import AddComponentModal from "../../components/AddComponentModal";
import { useState } from "react";
import styles from "./style";

export default function BuilderItem({
  component,
  identation,
  addComponent,
  addChildComponent,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalToggle = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.leftRightContainer}>
      <Text>{"-".repeat(identation * 3) + "-> " + component.type}</Text>
      {(component.type === "View" || component.type === "TouchableOpacity") && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleModalToggle();
          }}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      )}
      <AddComponentModal
        parentComponent={component}
        modalVisible={modalVisible}
        closeModal={handleModalToggle}
        addComponent={addComponent}
        addChildComponent={addChildComponent}
      />
    </View>
  );
}
