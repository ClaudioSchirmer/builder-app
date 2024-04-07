import { View, Text, TouchableOpacity } from "react-native";
import AddComponentModal from "../../components/AddComponentModal";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
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
      {component.type !== "TouchableOpacity" && component.type !== "View" && (
        <View
          style={[
            {
              marginLeft: identation * 15,
            },
            styles.viewSimpleItem,
          ]}
        >
          <Fontisto name="sitemap" size={15} color="black" />
          <Text> {component.type} </Text>
        </View>
      )}
      {component.type === "View" && (
        <View style={styles.viewView}>
          <Text> {component.type} </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleModalToggle();
            }}
          >
            <Ionicons name="add-circle-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}
      {component.type === "TouchableOpacity" && (
        <View
          style={[
            {
              marginLeft: identation * 15,
            },
            styles.viewTouchable,
          ]}
        >
          <Text> {component.type} </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleModalToggle();
            }}
          >
            <Ionicons name="add-circle-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
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
