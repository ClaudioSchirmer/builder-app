import {
  TouchableOpacity,
  Text,
  Switch,
  View,
  Modal,
  TextInput,
} from "react-native";
import styles from "./style";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function AddComponentModal({
  modalVisible,
  closeModal,
  parentComponent,
  addComponent,
  addChildComponent,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [styleBackgroundColor, setStyleBackgroundColor] = useState("");
  const [stylePadding, setStylePadding] = useState("");
  const [defaultState, setDefaultState] = useState("");
  const [centralize, setCentralize] = useState(true);
  const [placeholder, setPlaceholder] = useState("");
  const [addTextToShowStateChanging, setAddTextToShowStateChanging] =
    useState(true);
  const [styleColor, setStyleColor] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [margin, setMargin] = useState("");
  const [renderOrder, setRenderOrder] = useState(0);

  let options = [];

  if (parentComponent) {
    if (parentComponent.type === "TouchableOpacity") {
      options = [{ label: "Text", value: "Text" }];
    } else {
      options = [
        { label: "Text", value: "Text" },
        { label: "TextInput", value: "TextInput" },
        { label: "TouchableOpacity", value: "TouchableOpacity" },
      ];
    }
  } else {
    options = [
      { label: "View", value: "View" },
      { label: "Text", value: "Text" },
      { label: "TextInput", value: "TextInput" },
      { label: "TouchableOpacity", value: "TouchableOpacity" },
    ];
  }

  const [items, setItems] = useState(options);

  const handleModalToggle = () => {
    setModalVisible(!modalVisible);
  };

  const resetProperties = () => {
    setValue(null);
    setStyleBackgroundColor("");
    setStylePadding("");
    setDefaultState("");
    setCentralize(true);
    setPlaceholder("");
    setAddTextToShowStateChanging(true);
    setStyleColor("");
    setFontSize("");
    setMargin("");
    setRenderOrder(renderOrder + 5);
  };

  function isHex(h) {
    var a = parseInt(h, 16);
    return a.toString(16) === h;
  }

  const onAddComponent = () => {
    if (styleBackgroundColor && !isHex(styleBackgroundColor)) {
      setStyleBackgroundColor("#ffffff");
    }
    if (styleColor && !isHex(styleColor)) {
      console.log(styleColor);
      setStyleColor("#000000");
    }
    switch (value) {
      case "View":
        addComponent(value, {
          style: {
            backgroundColor: styleBackgroundColor,
            padding: stylePadding ? parseInt(stylePadding) : 0,
            justifyContent: centralize ? "center" : "flex-start",
            alignItems: centralize ? "center" : "stretch",
          },
        });
        break;
      case "Text":
        let TProperties = {
          defaultState: defaultState
            ? defaultState
            : " Default Text has no value ",
          style: {
            color: styleColor ? styleColor : "#000000",
            fontSize: fontSize ? parseInt(fontSize) : 12,
            margin: margin ? parseInt(margin) : 0,
          },
        };
        if (parentComponent?.key) {
          addChildComponent(parentComponent.key, value, TProperties);
        } else {
          addComponent(value, TProperties);
        }
        break;
      case "TextInput":
        let textKey = null;
        if (addTextToShowStateChanging) {
          let TtoShowStateProperties = {
            renderOrder: renderOrder + 1,
            defaultState: "Typed: ",
            style: {
              fontSize: 12,
              color: "#ff0000",
              marginLeft: margin ? parseInt(margin) : 0,
              marginRight: margin ? parseInt(margin) : 0,
              marginTop: margin ? parseInt(margin) * -1 : 0,
              marginBottom: margin ? parseInt(margin) : 0,
            },
          };
          if (parentComponent?.key) {
            textKey = addChildComponent(
              parentComponent.key,
              "Text",
              TtoShowStateProperties
            );
          } else {
            textKey = addComponent("Text", TtoShowStateProperties);
          }
        }
        let TIProperties = {
          renderOrder: renderOrder,
          placeholder: placeholder ? placeholder : "",
          alsoChangeStateValueFor: addTextToShowStateChanging
            ? [{ key: textKey, prefix: "Typed: ", suffix: " !" }]
            : [],
          style: {
            height: 40,
            borderWidth: 1,
            borderRadius: 5,
            padding: 5,
            width: "auto",
            margin: margin ? parseInt(margin) : 0,
          },
        };
        if (parentComponent?.key) {
          addChildComponent(parentComponent.key, value, TIProperties);
        } else {
          addComponent(value, TIProperties);
        }
        break;
      case "TouchableOpacity":
        let TOProperties = {
          style: {
            backgroundColor: styleBackgroundColor,
            padding: stylePadding ? parseInt(stylePadding) : 0,
            margin: margin ? parseInt(margin) : 0,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            width: "auto",
          },
          onPress: () => {
            alert("Button pressed!");
          },
        };
        if (parentComponent?.key) {
          addChildComponent(parentComponent.key, value, TOProperties);
        } else {
          addComponent(value, TOProperties);
        }
        break;
      default:
        break;
    }
    closeModal();
    resetProperties();
  };

  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
          {value === "View" ? (
            <View>
              <TextInput
                style={styles.textInput}
                placeholder="Color in Hexadecimal"
                onChangeText={(text) => setStyleBackgroundColor(text)}
              >
                {styleBackgroundColor}
              </TextInput>
              <TextInput
                style={styles.textInput}
                placeholder="Padding"
                onChangeText={(text) => setStylePadding(text)}
              >
                {stylePadding}
              </TextInput>
              <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Center all items:</Text>
                <Switch value={centralize} onValueChange={setCentralize} />
              </View>
            </View>
          ) : value === "Text" ? (
            <View>
              <TextInput
                style={styles.textInput}
                placeholder="Default Text"
                onChangeText={(text) => setDefaultState(text)}
              >
                {defaultState}
              </TextInput>
              <TextInput
                style={styles.textInput}
                placeholder="Font Size"
                onChangeText={(text) => setFontSize(text)}
              >
                {fontSize}
              </TextInput>
              <TextInput
                style={styles.textInput}
                placeholder="Margin"
                onChangeText={(text) => setMargin(text)}
              >
                {margin}
              </TextInput>
              <TextInput
                style={styles.textInput}
                placeholder="Color in Hexadecimal"
                onChangeText={(text) => setStyleColor(text)}
              >
                {styleColor}
              </TextInput>
            </View>
          ) : value === "TextInput" ? (
            <View>
              <TextInput
                style={styles.textInput}
                placeholder="Placeholder"
                onChangeText={(text) => setPlaceholder(text)}
              >
                {placeholder}
              </TextInput>
              <TextInput
                style={styles.textInput}
                placeholder="Margin"
                onChangeText={(text) => setMargin(text)}
              >
                {margin}
              </TextInput>
              <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Show text changing:</Text>
                <Switch
                  value={addTextToShowStateChanging}
                  onValueChange={setAddTextToShowStateChanging}
                />
              </View>
            </View>
          ) : value === "TouchableOpacity" ? (
            <View>
              <TextInput
                style={styles.textInput}
                placeholder="Color in Hexadecimal"
                onChangeText={(text) => setStyleBackgroundColor(text)}
              >
                {styleBackgroundColor}
              </TextInput>
              <TextInput
                style={styles.textInput}
                placeholder="Padding"
                onChangeText={(text) => setStylePadding(text)}
              >
                {stylePadding}
              </TextInput>
              <TextInput
                style={styles.textInput}
                placeholder="Margin"
                onChangeText={(text) => setMargin(text)}
              >
                {margin}
              </TextInput>
            </View>
          ) : null}
          <View style={styles.leftRightContainer}>
            <TouchableOpacity
              style={styles.modalButtonOk}
              onPress={onAddComponent}
            >
              <Text style={styles.modalButtonTextOK}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonCancel}
              onPress={closeModal}
            >
              <Text style={styles.modalButtonTextCancel}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
