import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import EmptyModule from "../modules/EmptyModule";
import HomeScreen from "../screens/HomeScreen";
import TicTacToeModule from "../modules/TicTacToeModule";
import Snake from "../modules/Snake";

export type ModulesStackParamList = {
  HomeScreen: undefined;
  TicTacToe: undefined;
  Snake: undefined;
};

const ModulesStack = createStackNavigator<ModulesStackParamList>();

export const ModulesStackNavigator = () => {
  return (
    <ModulesStack.Navigator>
      <ModulesStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Games" }}
      />
      <ModulesStack.Screen name="TicTacToe" component={TicTacToeModule} />
      <ModulesStack.Screen
        name="Snake"
        component={Snake}
        options={{ gestureEnabled: false }}
      />
      {/* <ModulesStack.Screen
        name="EmptyModule"
        component={EmptyModule}
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
