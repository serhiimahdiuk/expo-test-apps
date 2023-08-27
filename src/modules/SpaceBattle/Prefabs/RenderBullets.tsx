import React from "react";
import Renderer from "../components/Renderer";
import { height } from "../../../utils/metrics";
import { SHIP_HEIGHT, SHIP_WIDTH } from "../constants";
import { useAnimationData } from "../context/AnimationProvider";
import Bullet from "../components/Bullet";

export default () => {
  const { deltaTime, sharedData } = useAnimationData();
  return (
    <Renderer
      Component={Bullet}
      count={10}
      timeout={1}
      name={"bullets"}
      startPoint={() => ({
        x: (sharedData.ship?.x || 0) + SHIP_WIDTH + 10,
        y: (sharedData.ship?.y || 0) + SHIP_HEIGHT / 2,
      })}
      mapRule={(i) => ({
        ...i,
        x: i.x + 2 * deltaTime,
        y: i.y,
      })}
      filterRule={(i) => i.x <= height + 20}
    />
  );
};
