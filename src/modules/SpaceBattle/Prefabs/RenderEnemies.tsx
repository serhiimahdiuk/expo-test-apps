import React from "react";
import Renderer from "../components/Renderer";
import Enemy from "../components/Enemy";
import { height, width } from "../../../utils/metrics";
import { randomValueByRange } from "../utils";
import { ENEMY_HEIGHT } from "../constants";
import { useAnimationData } from "../context/AnimationProvider";

const BORDERS = 50;

export default () => {
  const { deltaTime } = useAnimationData();
  return (
    <Renderer
      Component={Enemy}
      count={10}
      timeout={2}
      name={"enemies"}
      startPoint={() => ({
        x: height + 20,
        y: randomValueByRange(
          0 + ENEMY_HEIGHT + BORDERS,
          width - ENEMY_HEIGHT - BORDERS
        ),
      })}
      mapRule={(i) => ({
        ...i,
        x: i.x - 2 * deltaTime,
        y: i.y,
      })}
      filterRule={(i) => i.x >= 0 + 20}
    />
  );
};
