import React, { useRef } from "react";
import { useAnimationData } from "../context/AnimationProvider";
import { height, width } from "../../../utils/metrics";
import { Image, View } from "react-native";
import {
  SHIP_ASSET_HEIGHT,
  SHIP_ASSET_WIDTH,
  SHIP_HEIGHT,
  SHIP_WIDTH,
} from "../constants";
import { ActionType, Position } from "../types";
import RenderBullets from "../Prefabs/RenderBullets";
import { Images } from "../assets";

export default () => {
  const {
    panPosition: { actionType, translateX, translateY },
    shareParams,
  } = useAnimationData();

  const playerPosition = useRef<Position>({
    x: 100,
    y: width / 2 - SHIP_HEIGHT / 2,
  });

  const lastPostition = useRef<Position>();

  shareParams("ship", playerPosition.current);

  const nextX =
    (lastPostition.current?.x || playerPosition.current.x) + translateX;
  const nextY =
    (lastPostition.current?.y || playerPosition.current.y) + translateY;

  if (actionType === ActionType.TOUCHES_MOVE) {
    if (!lastPostition.current) {
      lastPostition.current = { ...playerPosition.current };
    }
    playerPosition.current.y = nextY;
    if (nextX < height / 2 - 50 && nextX > 50) playerPosition.current.x = nextX;
  } else if (actionType === ActionType.UNDETERMINED) {
    if (lastPostition.current) {
      lastPostition.current = undefined;
    }
  }

  return (
    <>
      <RenderBullets />
      <View
        style={{
          height: SHIP_HEIGHT,
          width: SHIP_WIDTH,
          position: "absolute",
          top: playerPosition.current.y,
          left: playerPosition.current.x,
          overflow: "hidden",
        }}
      >
        <Image
          source={Images.ships}
          style={{
            width: SHIP_ASSET_WIDTH,
            height: SHIP_ASSET_HEIGHT,
            transform: [
              { translateX: -SHIP_WIDTH * 4 },
              { translateY: -SHIP_HEIGHT * 1 },
            ],
          }}
        />
      </View>
    </>
  );
};
