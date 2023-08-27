import React, { useRef } from "react";
import { View, ViewStyle } from "react-native";
import { useAnimationData } from "../context/AnimationProvider";
import { SHIP_HEIGHT, SHIP_WIDTH } from "../constants";
import { Position } from "../types";
import { height } from "../../../utils/metrics";

interface Props {
  containerStyle?: ViewStyle;
  shipPosition: Position;
}

export default ({ shipPosition }: Props) => {
  const { deltaTime, frameCount, shareParams } = useAnimationData();
  const bullets = useRef<Position[]>([]);

  shareParams("bullets", bullets.current);

  if (bullets.current.length < 10 && frameCount % 60 === 0) {
    bullets.current.push({
      x: shipPosition.x + SHIP_WIDTH + 10,
      y: shipPosition.y + SHIP_HEIGHT / 2,
    });
  }

  bullets.current = bullets.current
    .map((i) => ({
      x: i.x + 2 * deltaTime,
      y: i.y,
    }))
    .filter((i) => i.x <= height + 20);

  return (
    <>
      {bullets.current.map((i, id) => (
        <View
          key={`${id}Bullet`}
          style={[
            {
              height: 2,
              width: 5,
              backgroundColor: "black",
              position: "absolute",
              top: i.y,
              left: i.x,
            },
          ]}
        />
      ))}
    </>
  );
};
