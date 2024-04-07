import React from "react";
import InterfaceBuilder from "../../helpers/InterfaceBuilder";
import { Text, View } from "react-native";
import styles from "./style";

export default class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.iBuilder = new InterfaceBuilder(this, this.props.components);
    this.state = this.iBuilder.getDefaultState();
  }
  render() {
    return (
      <>
        {this.iBuilder.hasCodeToBeGenerated() ? (
          this.iBuilder.buildInterface()
        ) : (
          <View style={styles.container}>
            <Text style={styles.textError}>No code available for preview!</Text>
          </View>
        )}
      </>
    );
  }
}
