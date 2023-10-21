import React, { useEffect, useRef } from "react";
import { Image, ImageSourcePropType, View } from "react-native";
import { Entity } from "../types";

interface Props {
  spriteSize: number;
  frames: number;
  spriteSheet: ImageSourcePropType;
  direction: "left" | "right";
  offset?: number;
  loop?: boolean;
  fps?: number;
  startFrame?: number;
  action: string;
}

export default (props: Props & Entity) => {
  const {
    spriteSize,
    frames,
    spriteSheet,
    direction,
    offset = 0,
    showRigidbody = false,
    loop = true,
    fps = frames,
    startFrame = 0,
    action,
  } = props;
  const rigidbodyWidth = props.size[0];
  const rigidbodyHeight = props.size[1];
  const rigidbodyX = props.body.position.x - rigidbodyWidth / 2;
  const rigidbodyY = props.body.position.y - rigidbodyHeight / 2;
  const frame = useRef(startFrame);
  const lastAction = useRef(action);

  const startOffset = startFrame * spriteSize;
  const playableFrames = frames - startFrame;

  if (lastAction.current !== action) {
    lastAction.current = action;
    frame.current = startFrame;
  }

  const generalFrames = useRef(0);
  generalFrames.current += 1;

  const spriteXoffset =
    (spriteSize - rigidbodyWidth) / 2 - offset + startOffset;
  const spriteYoffset = rigidbodyHeight - spriteSize;

  const newFps = Math.floor(60 / fps);

  if (generalFrames.current % 60 === 0) {
    generalFrames.current = 0;
  }

  if (generalFrames.current % newFps === 0) {
    if (frame.current === playableFrames - 1 && !loop) {
    } else {
      frame.current = (frame.current + 1) % playableFrames;
    }
  }

  return (
    <View
      style={{
        position: "absolute",
        left: rigidbodyX,
        top: rigidbodyY,
        width: rigidbodyWidth,
        height: rigidbodyHeight,
        backgroundColor: showRigidbody ? props.color : "transparent",
        overflow: "hidden",
        transform: [{ scaleX: direction === "left" ? -1 : 1 }],
      }}
    >
      <Image
        style={{
          left: -frame.current * spriteSize - spriteXoffset,
          width: frames * spriteSize,
          height: spriteSize,
          top: spriteYoffset,
        }}
        source={spriteSheet}
      />
    </View>
  );
};
