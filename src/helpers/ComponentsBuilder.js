import uuid from "react-uuid";

export default class ComponentsBuilder {
  constructor() {
    this.components = [];
  }

  addComponent(type, properties) {
    const component = this.prepareComponent(type, properties);
    this.components.push(component);
    return component.key;
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
    const component = this.prepareComponent(type, properties);
    parent.children.push(component);
    return component.key;
  }

  prepareComponent(type, properties) {
    const key = uuid().replace(/-/gi, "a");
    return {
      ...properties,
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

  getComponentsFrom(components, identation = 0) {
    let componentsArray = [];
    components
      .sort(function (a, b) {
        return a.renderOrder - b.renderOrder;
      })
      .forEach((element) => {
        componentsArray.push({ component: element, identation });
        if (element.children.length > 0) {
          let children = this.getComponentsFrom(
            element.children,
            identation + 1
          );
          componentsArray = componentsArray.concat(children);
        }
      });
    return componentsArray;
  }
}
