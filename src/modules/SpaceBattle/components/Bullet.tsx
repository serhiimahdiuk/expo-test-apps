import React, { ComponentProps } from "react";
import { Image, View } from "react-native";
import { PrefabComponentProps } from "../types";
import { useAnimationData } from "../context/AnimationProvider";
import { detectCollision } from "../utils";
import {
  BULLET_HEIGHT,
  BULLET_WIDTH,
  ENEMY_HEIGHT,
  ENEMY_WIDTH,
} from "../constants";
import { Images } from "../assets";
import { useAssets } from "expo-asset";
import { useGetAssets } from "../../../contexts/AssetsContext";

export default ({ x, y, id, destroy }: PrefabComponentProps) => {
  const data = useGetAssets()["laser"];
  const asset = {
    height: data.height || 0,
    width: data.width || 0,
  };
  const {
    sharedData: { enemies },
  } = useAnimationData();
  if (
    enemies &&
    enemies.some((el) =>
      detectCollision(
        { x: el.x, y: el.y, w: ENEMY_WIDTH, h: ENEMY_HEIGHT },
        { x: x, y: y, w: BULLET_WIDTH, h: BULLET_HEIGHT }
      )
    )
  ) {
    destroy(id);
  }

  return (
    <View
      style={{
        height: BULLET_HEIGHT,
        width: BULLET_WIDTH,
        position: "absolute",
        top: y,
        left: x,
        overflow: "hidden",
      }}
    >
      <Image
        source={Images.lasers}
        style={{
          width: asset.width,
          height: BULLET_HEIGHT,
          transform: [
            {
              translateX: (-asset.width / 4) * 1 - asset.width / 4 / 3,
            },
          ],
        }}
      />
    </View>
  );
};
