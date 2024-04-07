export default class CodeBuilder {
  constructor(components, componentsFlatArray) {
    this.components = components;
    this.componentsFlatArray = componentsFlatArray;
    this.prefixValue = "v_";
    this.prefixSetValue = "setV_";
  }

  hasCodeToBeGenerated() {
    return this.componentsFlatArray.length > 0;
  }

  getCode() {
    if (this.componentsFlatArray.length === 0) {
      return "No code to be generated.";
    }
    let code = "";
    let imports = "";
    let count = 0;
    let spaces = "    ";
    let importArray = [];
    this.componentsFlatArray.forEach((item) => {
      if (importArray.includes(item.component.type) === false) {
        importArray.push(item.component.type);
        if (count > 0) {
          imports += ", ";
        }
        imports += item.component.type;
        if (item.component.type === "TouchableOpacity") {
          imports += ", Alert";
        }
        count++;
      }
    });
    code += `import { ${imports} } from "react-native";\n`;
    if (importArray.includes("Text") || importArray.includes("TextInput")) {
      code += `import { useState } from "react";\n`;
    }
    code += "\nexport default function Preview({ exampleParameter }) {";
    code += this.getUseStateAsCode();
    code += this.getFunctionsAsCode();
    code += spaces.repeat(1) + "return (<>\n";
    code += this.getInterfaceAsCode();
    code += spaces.repeat(1) + "</>)\n";
    return code + "}\n";
  }

  getUseStateAsCode() {
    let code = "\n";
    let count = 0;
    let spaces = "    ";
    this.componentsFlatArray.forEach((item) => {
      count++;
      let key = item.component.key.substring(0, 6);
      if (item.component.type === "TextInput") {
        code += spaces.repeat(1);
        code += `const [${this.prefixValue + key}, ${
          this.prefixSetValue + key
        }] = useState("");\n`;
      }
      if (item.component.type === "Text") {
        code += spaces.repeat(1);
        code += `const [${this.prefixValue + key}, ${
          this.prefixSetValue + key
        }] = useState("${
          item.component.defaultState ? item.component.defaultState : ""
        }");\n`;
      }
    });
    return count > 0 ? `${code}` : "";
  }

  getFunctionsAsCode() {
    let code = "\n";
    let count = 0;
    let spaces = "    ";
    this.componentsFlatArray.forEach((item) => {
      count++;
      let key = item.component.key.substring(0, 6);
      if (item.component.type === "TextInput") {
        code += spaces.repeat(1);
        code += `const handle${key} = (text) => {\n`;
        code += spaces.repeat(2) + `${this.prefixSetValue + key}(text);\n`;
        if (item.component.alsoChangeStateValueFor) {
          item.component.alsoChangeStateValueFor.forEach((element) => {
            let elementKey = element.key.substring(0, 6);
            let prefix = element.prefix ? element.prefix : "";
            let suffix = element.suffix ? element.suffix : "";
            code +=
              spaces.repeat(2) +
              `${
                this.prefixSetValue + elementKey
              }("${prefix}" + text + "${suffix}");\n`;
          });
        }
        code += spaces.repeat(1) + `}\n`;
      }
      if (item.component.type === "TouchableOpacity") {
        code += spaces.repeat(1);
        code += `const handle${key} = () => {\n`;
        code +=
          spaces.repeat(2) +
          `Alert.alert("TouchableOpacity", "It has been pressed!");\n`;
        code += spaces.repeat(1) + `}\n`;
      }
    });
    return count > 0 ? `${code}\n` : "";
  }

  getInterfaceAsCode(components, identation = 2) {
    let code = "";
    let spaces = "    ";
    const buildWithComponents = components ? components : this.components;
    buildWithComponents
      .sort(function (a, b) {
        return a.renderOrder - b.renderOrder;
      })
      .map((element) => {
        switch (element.type) {
          case "View":
            code +=
              spaces.repeat(identation) +
              "<View\n" +
              spaces.repeat(identation + 1) +
              `style={[\n` +
              spaces.repeat(identation + 2) +
              `{ flex: 1 },\n`;
            if (element.style) {
              code +=
                spaces.repeat(identation + 2) +
                `${JSON.stringify(element.style).replace(
                  /"([^"]+)":/g,
                  "$1:"
                )}\n`;
            }
            code +=
              spaces.repeat(identation + 1) +
              `]}\n` +
              spaces.repeat(identation + 1) +
              `>\n`;
            if (element.children.length > 0) {
              code += `${this.getInterfaceAsCode(
                element.children,
                identation + 1
              )}`;
            }
            code += spaces.repeat(identation) + `</View>\n`;
            break;
          case "Text":
            code += spaces.repeat(identation) + "<Text\n";
            if (element.style) {
              code +=
                spaces.repeat(identation + 1) +
                "style={" +
                `${JSON.stringify(element.style).replace(
                  /"([^"]+)":/g,
                  "$1:"
                )}` +
                "}\n";
            }
            code += spaces.repeat(identation);
            code += `>\n`;
            code += spaces.repeat(identation + 1);
            code += `{${this.prefixValue + element.key.substring(0, 6)}}\n`;
            code += spaces.repeat(identation) + "</Text>\n";
            break;
          case "TextInput":
            code += spaces.repeat(identation) + "<TextInput\n";
            if (element.style) {
              code +=
                spaces.repeat(identation + 1) +
                "style={" +
                `${JSON.stringify(element.style).replace(
                  /"([^"]+)":/g,
                  "$1:"
                )}` +
                "}\n";
            }
            code += spaces.repeat(identation + 1);
            code += `defaultValue = {${
              this.prefixValue + element.key.substring(0, 6)
            }}\n`;
            code += spaces.repeat(identation + 1);
            code += `onChangeText = {handle${element.key.substring(0, 6)}}\n`;
            code += spaces.repeat(identation + 1);
            code += `placeholder = "${
              element?.placeholder !== undefined ? element.placeholder : ""
            }"\n`;
            code += spaces.repeat(identation) + "/>\n";
            break;
          case "TouchableOpacity":
            code += spaces.repeat(identation) + "<TouchableOpacity\n";
            if (element.style) {
              code +=
                spaces.repeat(identation + 1) +
                "style={" +
                `${JSON.stringify(element.style).replace(
                  /"([^"]+)":/g,
                  "$1:"
                )}` +
                "}\n";
            }
            code += spaces.repeat(identation + 1);
            code += `onPress = {handle${element.key.substring(0, 6)}}\n`;
            code += spaces.repeat(identation) + ">\n";
            if (element.children.length > 0) {
              code += `${this.getInterfaceAsCode(
                element.children,
                identation + 1
              )}`;
            }
            code += spaces.repeat(identation) + "</TouchableOpacity>\n";
            break;
        }
      });
    return code;
  }
}
