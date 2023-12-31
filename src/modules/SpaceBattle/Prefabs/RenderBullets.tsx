import React from "react";
import Renderer from "../components/Renderer";
import { height } from "../../../utils/metrics";
import { BULLET_HEIGHT, SHIP_HEIGHT, SHIP_WIDTH } from "../constants";
import { useAnimationData } from "../context/AnimationProvider";
import Bullet from "../components/Bullet";

export default () => {
  const { deltaTime, sharedData } = useAnimationData();
  return (
    <Renderer
      Component={Bullet}
      count={15}
      timeout={1}
      name={"bullets"}
      startPoint={() =>
        sharedData.ship && {
          x: sharedData.ship.x + SHIP_WIDTH,
          y: sharedData.ship.y + (SHIP_HEIGHT - BULLET_HEIGHT) / 2,
        }
      }
      mapRule={(i) => ({
        ...i,
        x: i.x + 2 * deltaTime,
        y: i.y,
      })}
      filterRule={(i) => i.x <= height + 20}
    />
  );
};
