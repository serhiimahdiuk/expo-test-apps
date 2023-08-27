import React, { ComponentProps } from "react";
import { View } from "react-native";
import { PrefabComponentProps } from "../types";
import { useAnimationData } from "../context/AnimationProvider";
import { detectCollision } from "../utils";
import {
  BULLET_HEIGHT,
  BULLET_WIDTH,
  ENEMY_HEIGHT,
  ENEMY_WIDTH,
} from "../constants";

export default ({ x, y, id, destroy }: PrefabComponentProps) => {
  const {
    sharedData: { enemies },
  } = useAnimationData();

  if (
    enemies &&
    enemies.some((el) =>
      detectCollision(
        { x: el.x, y: el.y, w: ENEMY_WIDTH, h: ENEMY_HEIGHT },
        { x: x, y: y, w: BULLET_WIDTH, h: BULLET_HEIGHT }
      )
    )
  ) {
    destroy(id);
  }

  return (
    <View
      style={[
        {
          height: BULLET_HEIGHT,
          width: BULLET_WIDTH,
          backgroundColor: "black",
          position: "absolute",
          top: y,
          left: x,
        },
      ]}
    />
  );
};
