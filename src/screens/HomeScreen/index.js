import styles from "./style";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Preview from "../Preview";
import Builder from "../Builder";
import Code from "../Code";
import { useState } from "react";

export default function HomeScreen({ componentsBuilder }) {
  const [components, setComponents] = useState(
    componentsBuilder.getAllComponents()
  );
  const [componentsFlatArray, setComponentsFlatArray] = useState(
    componentsBuilder.getAllComponentsAsFlatArray()
  );
  const Tab = createBottomTabNavigator();

  const addComponent = (type, properties) => {
    let key = componentsBuilder.addComponent(type, properties);
    setComponents(componentsBuilder.getAllComponents());
    setComponentsFlatArray(componentsBuilder.getAllComponentsAsFlatArray());
    return key;
  };

  const addChildComponent = (parentKey, type, properties) => {
    let key = componentsBuilder.addChildComponent(parentKey, type, properties);
    setComponents(componentsBuilder.getAllComponents());
    setComponentsFlatArray(componentsBuilder.getAllComponentsAsFlatArray());
    return key;
  };

  const resetComponents = () => {
    componentsBuilder.resetComponents();
    setComponents(componentsBuilder.getAllComponents());
    setComponentsFlatArray(componentsBuilder.getAllComponentsAsFlatArray());
  };

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={styles.tabNavigator}>
        <Tab.Screen
          name="Builder"
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Ionicons name="build-outline" size={size} color={color} />
              );
            },
          }}
        >
          {(props) => (
            <Builder
              {...props}
              componentsFlatArray={componentsFlatArray}
              addComponent={addComponent}
              addChildComponent={addChildComponent}
              resetComponents={resetComponents}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Preview"
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({ focused, color, size }) => {
              return <MaterialIcons name="preview" size={size} color={color} />;
            },
          }}
        >
          {(props) => <Preview {...props} components={components} />}
        </Tab.Screen>
        <Tab.Screen
          name="Code"
          component={Code}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Ionicons name="code-download" size={size} color={color} />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
