import { Text, View, TextInput, TouchableOpacity } from "react-native";

export default class InterfaceBuilder {
  constructor(reactClass, components) {
    this.reactClass = reactClass;
    this.components = components;
  }

  getDefaultState() {
    let defaults = {};
    this.components.forEach((element) => {
      if (element.defaultState) {
        defaults[element.key] = element.defaultState;
      }
      if (element.children.length > 0) {
        defaults = this.setDefaultStateOfChild(defaults, element.children);
      }
    });
    return defaults;
  }

  setDefaultStateOfChild(defaults, components) {
    components.forEach((element) => {
      if (element.defaultState) {
        defaults[element.key] = element.defaultState;
      }
      if (element.children.length > 0) {
        defaults = this.setDefaultStateOfChild(defaults, element.children);
      }
    });
    return defaults;
  }

  injectReactClassTo(components) {
    return components.map((element) => {
      return {
        ...element,
        getState: () => this.reactClass.state[element.key],
        changeState: (inputText) => {
          const changeState = {};
          changeState[element.key] = inputText;
          if (element.alsoChangeStateValueFor) {
            element.alsoChangeStateValueFor.forEach((element) => {
              let prefix = element.prefix ? element.prefix : "";
              let suffix = element.suffix ? element.suffix : "";
              changeState[element.key] = prefix + inputText + suffix;
            });
          }
          this.reactClass.setState(changeState);
        },
      };
    });
  }

  buildInterface(components) {
    const buildWithComponents = components
      ? this.injectReactClassTo(components)
      : this.injectReactClassTo(this.components);
    return (
      <>
        {buildWithComponents
          .sort(function (a, b) {
            return a.renderOrder - b.renderOrder;
          })
          .map((element) => {
            switch (element.type) {
              case "View":
                return (
                  <View
                    key={element.key}
                    style={[
                      { flex: 1 },
                      element?.style !== undefined ? element.style : {},
                    ]}
                  >
                    {element.children.length > 0
                      ? this.buildInterface(element.children)
                      : null}
                  </View>
                );
                break;
              case "Text":
                return (
                  <Text
                    key={element.key}
                    style={element?.style !== undefined ? element.style : {}}
                  >
                    {element.getState()}
                  </Text>
                );
                break;
              case "TextInput":
                return (
                  <TextInput
                    key={element.key}
                    style={element?.style !== undefined ? element.style : {}}
                    defaultValue={element.getState()}
                    onChangeText={element.changeState}
                    placeholder={
                      element?.placeholder !== undefined
                        ? element.placeholder
                        : ""
                    }
                  />
                );
                break;
              case "TouchableOpacity":
                return (
                  <TouchableOpacity
                    key={element.key}
                    style={element?.style !== undefined ? element.style : {}}
                    onPress={
                      element.onPress == "alert" ? () => alert("Hello") : null
                    }
                  >
                    {element.children.length > 0
                      ? this.buildInterface(element.children)
                      : null}
                  </TouchableOpacity>
                );
                break;
            }
          })}
      </>
    );
  }
}
