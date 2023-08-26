import React from "react";
import { ScrollView, View } from "react-native";
import Button from "../../components/Button";
import { useAppNavigation } from "../../navigation/hooks";
import { ModulesStackParamList } from "../../navigation";

const GAMES: (keyof ModulesStackParamList)[] = ["TicTacToe", "Snake"];

export default () => {
  const navigation = useAppNavigation();
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      {GAMES.map((i) => (
        <Button text={i} key={i} onPress={() => navigation.navigate(i)} />
      ))}
    </ScrollView>
  );
};
