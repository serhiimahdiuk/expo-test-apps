import React, { useRef } from "react";
import { View } from "react-native";
import { useAnimationData } from "../context/AnimationProvider";
import { ENEMY_HEIGHT, ENEMY_WIDTH } from "../constants";
import { Position } from "../types";
import { randomValueByRange } from "../utils";
import { height, width } from "../../../utils/metrics";

const BORDERS = 50;

export default () => {
  const { deltaTime, frameCount } = useAnimationData();
  const enemies = useRef<Position[]>([]);

  if (enemies.current.length < 10 && frameCount % 120 === 0) {
    enemies.current.push({
      x: height + 5,
      y: randomValueByRange(
        0 + ENEMY_HEIGHT + BORDERS,
        width - ENEMY_HEIGHT - BORDERS
      ),
    });
  }

  enemies.current = enemies.current
    .map((i) => ({
      x: i.x - 2 * deltaTime,
      y: i.y,
    }))
    .filter((i) => i.x >= 0 + 20);

  return (
    <>
      {enemies.current.map((i) => (
        <View
          style={{
            height: ENEMY_HEIGHT,
            width: ENEMY_WIDTH,
            backgroundColor: "green",
            position: "absolute",
            top: i.y,
            left: i.x,
          }}
        />
      ))}
    </>
  );
};
