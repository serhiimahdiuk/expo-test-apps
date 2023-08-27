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
import { ActionType } from "../types";
import RenderBullets from "../Prefabs/RenderBullets";
import Images from "../assets";

export default () => {
  const {
    panPosition: { actionType, y, x },
    shareParams,
  } = useAnimationData();

  const playerPosition = useRef({
    x: 100,
    y: width / 2 - SHIP_HEIGHT / 2,
  });

  shareParams("ship", playerPosition.current);

  const nextX = x - SHIP_WIDTH / 2;
  const nextY = y - SHIP_HEIGHT / 2;

  if (actionType === ActionType.TOUCHES_DOWN) {
    playerPosition.current.y = nextY;
    if (nextX < height / 2 - 50 && nextX > 50)
      playerPosition.current.x = x - SHIP_WIDTH / 2;
  } else if (actionType === ActionType.TOUCHES_MOVE) {
    playerPosition.current.y = nextY;
    if (nextX < height / 2 - 50 && nextX > 50) playerPosition.current.x = nextX;
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
