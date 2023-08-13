import React from "react";
import { ScrollView, View } from "react-native";
import Button from "../../components/Button";

export default () => {
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Button text="Tic-tac-toe" onPress={() => console.log("here")} />
    </ScrollView>
  );
};
