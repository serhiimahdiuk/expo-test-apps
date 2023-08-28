import React, { useRef } from "react";
import { Image, View } from "react-native";
import { height, width } from "../../utils/metrics";
import Player from "./components/Player";
import { useAnimationData, useConsole } from "./context/AnimationProvider";
import RenderEnemies from "./Prefabs/RenderEnemies";
import Images from "./assets";

export default () => {
  const { run, frameCount } = useAnimationData();
  return (
    <View style={{ height: width, width: height }}>
      <View
        style={{
          flexDirection: "row",
          transform: [{ translateX: -frameCount % 512 }],
        }}
      >
        <Image source={Images.bg3} />
        <Image source={Images.bg3} />
        <Image source={Images.bg3} />
      </View>
      {run && (
        <>
          <RenderEnemies />
          <Player />
        </>
      )}
    </View>
  );
};
