import React from "react";
import { View } from "react-native";
import { height, width } from "../../utils/metrics";
import Player from "./components/Player";
import { useAnimationData, useConsole } from "./context/AnimationProvider";
import RenderEnemies from "./Prefabs/RenderEnemies";
import Background from "./components/Background";

export default () => {
  const { run } = useAnimationData();
  return (
    <View style={{ height: width, width: height }}>
      <Background />
      {run && (
        <>
          <RenderEnemies />
          <Player />
        </>
      )}
    </View>
  );
};
