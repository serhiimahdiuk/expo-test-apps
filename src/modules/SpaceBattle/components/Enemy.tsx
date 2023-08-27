import React, { useRef } from "react";
import { View } from "react-native";
import { useAnimationData } from "../context/AnimationProvider";
import { ENEMY_HEIGHT, ENEMY_WIDTH } from "../constants";
import { Position, Prefab } from "../types";
import { randomValueByRange } from "../utils";
import { height, width } from "../../../utils/metrics";

export default ({ id, x, y }: Prefab) => {
  return (
    <View
      key={"enemy" + id}
      style={{
        height: ENEMY_HEIGHT,
        width: ENEMY_WIDTH,
        backgroundColor: "green",
        position: "absolute",
        top: y,
        left: x,
      }}
    />
  );
};
