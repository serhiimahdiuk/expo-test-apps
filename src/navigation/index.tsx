import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EmptyModule from "../modules/EmptyModule";
import HomeScreen from "../screens/HomeScreen";

const ModulesStack = createStackNavigator();

export const ModulesStackNavigator = () => {
  return (
    <ModulesStack.Navigator>
      <ModulesStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Games" }}
      />
      {/* <ModulesStack.Screen
        name="EmptyModule"
        component={EmptyModule}
        options={{ headerShown: false }}
      /> */}
    </ModulesStack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <ModulesStackNavigator />
    </NavigationContainer>
  );
}
