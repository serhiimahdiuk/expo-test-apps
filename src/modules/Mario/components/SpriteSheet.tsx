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
  onEndAnimation?: () => void;
  onStartAnimation?: () => void;
}

export default (props: Props & Entity) => {
  const {
    spriteSize,
    frames,
    spriteSheet,
    direction,
    showRigidbody = false,
    loop = true,
    fps = frames,
    startFrame = 0,
    action,
    onEndAnimation,
    onStartAnimation,
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

  const spriteXoffset = (spriteSize - rigidbodyWidth) / 2;
  const spriteYoffset = rigidbodyHeight - spriteSize;

  const newFps = Math.floor(60 / fps);

  if (generalFrames.current % 60 === 0) {
    generalFrames.current = 0;
  }

  if (generalFrames.current % newFps === 0) {
    if (frame.current === 0) {
      onStartAnimation && onStartAnimation();
    }
    if (frame.current === playableFrames - 1 && !loop) {
      onEndAnimation && onEndAnimation();
    } else {
      frame.current = (frame.current + 1) % playableFrames;
    }
  }

  return (
    <>
      {showRigidbody && (
        <View
          style={{
            position: "absolute",
            left: rigidbodyX,
            top: rigidbodyY,
            width: rigidbodyWidth,
            height: rigidbodyHeight,
            backgroundColor: "rgba(255, 0, 0, 0.5)",
          }}
        />
      )}

      <View
        style={{
          position: "absolute",
          left: rigidbodyX - spriteXoffset,
          top: rigidbodyY + spriteYoffset,
          width: spriteSize,
          height: spriteSize,
          // backgroundColor: "rgba(0, 255, 0, 0.3)",
          overflow: "hidden",
          transform: [{ scaleX: direction === "left" ? -1 : 1 }],
        }}
      >
        <Image
          style={{
            left: -frame.current * spriteSize,
            width: frames * spriteSize,
            height: spriteSize,
          }}
          source={spriteSheet}
        />
      </View>
    </>
  );
};
