import React from "react";
import { View } from "react-native";
import {
  BULLET_HEIGHT,
  BULLET_WIDTH,
  ENEMY_HEIGHT,
  ENEMY_WIDTH,
} from "../constants";
import { PrefabComponentProps } from "../types";
import { useAnimationData } from "../context/AnimationProvider";
import { detectCollision } from "../utils";

export default ({ x, y, id, destroy }: PrefabComponentProps) => {
  const {
    sharedData: { bullets },
  } = useAnimationData();
  if (
    bullets &&
    bullets.some((el) =>
      detectCollision(
        { x: el.x, y: el.y, w: BULLET_WIDTH, h: BULLET_HEIGHT },
        { x: x, y: y, w: ENEMY_WIDTH, h: ENEMY_HEIGHT }
      )
    )
  ) {
    destroy(id);
  }
  return (
    <View
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
