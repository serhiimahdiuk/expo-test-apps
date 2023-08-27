import React, { useRef } from "react";
import { ActionType, useAnimationData } from "../context/AnimationProvider";
import { width } from "../../../utils/metrics";
import { View } from "react-native";

const SHIP_HEIGHT = 30;
const SHIP_WIDTH = 50;

export default () => {
  const {
    panPosition: { actionType, y },
    deltaTime,
    run,
  } = useAnimationData();

  const playerPosition = useRef({
    x: 100,
    y: width / 2 - SHIP_HEIGHT / 2,
  });

  if (actionType === ActionType.TOUCHES_DOWN) {
    playerPosition.current.y = y - SHIP_HEIGHT / 2;
  } else if (actionType === ActionType.TOUCHES_MOVE) {
    playerPosition.current.y = y - SHIP_HEIGHT / 2;
  }

  if (!run) return null;
  return (
    <View
      style={[
        {
          position: "absolute",
          height: SHIP_HEIGHT,
          width: SHIP_WIDTH,
          backgroundColor: "red",
          left: playerPosition.current.x,
          top: playerPosition.current.y,
        },
        {
          top: playerPosition.current.y,
          left: playerPosition.current.x,
        },
      ]}
    />
  );
};
