import { TouchableOpacity, Text, ScrollView, View } from "react-native";
import BuilderItem from "../../components/BuilderItem";
import styles from "./style";
import { useState } from "react";
import AddComponentModal from "../../components/AddComponentModal";

export default function Builder({
  componentsFlatArray,
  addComponent,
  addChildComponent,
  resetComponents,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalToggle = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.viewContainer}>
      <ScrollView
        style={styles.svContainer}
        ref={(scroll) => {
          //this.scroll = scroll;
        }}
        onContentSizeChange={() => {
          //this.scroll.scrollToEnd({ animated: true }); // Not necessary in this case using tabs
        }}
      >
        {componentsFlatArray.map((item, index) => (
          <BuilderItem
            key={index}
            component={item.component}
            identation={item.identation}
            addComponent={addComponent}
            addChildComponent={addChildComponent}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.buttonOk}
        onPress={() => {
          handleModalToggle();
        }}
      >
        <Text style={styles.buttonTextOk}>Add Component</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonCancel}
        onPress={() => {
          resetComponents();
        }}
      >
        <Text style={styles.buttonTextCancel}>Reset</Text>
      </TouchableOpacity>
      <AddComponentModal
        modalVisible={modalVisible}
        closeModal={handleModalToggle}
        addComponent={addComponent}
        addChildComponent={addChildComponent}
      />
    </View>
  );
}
