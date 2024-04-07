import uuid from "react-uuid";

export default class ComponentsBuilder {
  constructor() {
    this.components = [];
  }

  addComponent(type, properties) {
    const component = this.prepareComponent(type, properties);
    this.components.push(component);
    return component;
  }

  getParent(parentKey, components = this.components) {
    let parentResult = null;
    components.forEach((element) => {
      if (element.key === parentKey) {
        parentResult = element;
      }
      if (!parentResult) {
        if (element.children.length > 0) {
          let parent = this.getParent(parentKey, element.children);
          if (parent) {
            parentResult = parent;
          }
        }
      }
    });
    return parentResult;
  }

  addChildComponent(parentKey, type, properties) {
    const parent = this.getParent(parentKey);
    if (!parent) {
      return;
    }
    const component = this.prepareComponent(type, properties, parentKey);
    parent.children.push(component);
    return component;
  }

  prepareComponent(type, properties, parentKey = null) {
    const key = properties?.key ? properties.key : uuid().replace(/-/gi, "a");
    return {
      ...properties,
      parentKey,
      key: key,
      type: type,
      children: [],
    };
  }

  getAllComponents() {
    return this.components;
  }

  getAllComponentsAsFlatArray() {
    return this.getComponentsFrom(this.components);
  }

  resetComponents() {
    this.components = [];
  }

  getComponentsFrom(components, parentKey = null, identation = 0) {
    let componentsArray = [];
    components
      .sort(function (a, b) {
        return a.renderOrder - b.renderOrder;
      })
      .forEach((element) => {
        componentsArray.push({ component: element, parentKey, identation });
        if (element.children.length > 0) {
          let children = this.getComponentsFrom(
            element.children,
            element.key,
            identation + 1
          );
          componentsArray = componentsArray.concat(children);
        }
      });
    return componentsArray;
  }
}
