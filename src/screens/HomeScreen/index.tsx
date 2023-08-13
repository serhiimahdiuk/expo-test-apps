import React from "react";
import { ScrollView, View } from "react-native";
import Button from "../../components/Button";
import { useAppNavigation } from "../../navigation/hooks";

export default () => {
  const navigation = useAppNavigation();
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Button
        text="Tic-tac-toe"
        onPress={() => navigation.navigate("TicTacToe")}
      />
    </ScrollView>
  );
};
