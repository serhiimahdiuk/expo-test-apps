import React, { useRef } from "react";
import { useAnimationData } from "../context/AnimationProvider";
import { width } from "../../../utils/metrics";
import { View } from "react-native";
import Gun from "./Bullet";
import { SHIP_HEIGHT, SHIP_WIDTH } from "../constants";
import { ActionType } from "../types";
import RenderBullets from "../Prefabs/RenderBullets";

export default () => {
  const {
    panPosition: { actionType, y },
    shareParams,
  } = useAnimationData();

  const playerPosition = useRef({
    x: 100,
    y: width / 2 - SHIP_HEIGHT / 2,
  });

  shareParams("ship", playerPosition.current);

  if (actionType === ActionType.TOUCHES_DOWN) {
    playerPosition.current.y = y - SHIP_HEIGHT / 2;
  } else if (actionType === ActionType.TOUCHES_MOVE) {
    playerPosition.current.y = y - SHIP_HEIGHT / 2;
  }

  return (
    <>
      <RenderBullets />
      <View
        style={[
          {
            position: "absolute",
            height: SHIP_HEIGHT,
            width: SHIP_WIDTH,
            backgroundColor: "red",
          },
          {
            top: playerPosition.current.y,
            left: playerPosition.current.x,
          },
        ]}
      />
    </>
  );
};
