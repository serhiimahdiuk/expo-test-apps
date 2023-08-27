import React from "react";
import { View } from "react-native";
import { height, width } from "../../utils/metrics";
import Player from "./components/Player";
import Enemy from "./components/Enemy";
import { useAnimationData } from "./context/AnimationProvider";
import RenderEnemies from "./Prefabs/RenderEnemies";

export default () => {
  const { run } = useAnimationData();
  if (!run) return null;
  return (
    <View style={{ height: width, width: height }}>
      <RenderEnemies />
      <Player />
    </View>
  );
};
