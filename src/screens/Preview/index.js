import React from "react";
import InterfaceBuilder from "../../helpers/InterfaceBuilder";

export default class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.iBuilder = new InterfaceBuilder(this, this.props.components);
    this.state = this.iBuilder.getDefaultState();
  }
  render() {
    return this.iBuilder.buildInterface();
  }
}
