import React, { useRef } from "react";
import SpriteSheet from "./SpriteSheet";
import { Entity } from "../types";
import Images from "../assets";
import {
  levelAspectRatio,
  levelHeight,
  levelWidth,
} from "../entities/constanst";

export default (props: Entity) => {
  const { directions } = props;
  const lastDirection = React.useRef<"left" | "right">("left");
  if (directions.left) {
    lastDirection.current = "left";
  } else if (directions.right) {
    lastDirection.current = "right";
  }
  const jumping = useRef(false);

  const movesMapping = {
    idle: {
      spriteSheet: Images.player_idle,
      frames: 6,
      action: "idle",
    },
    run: {
      spriteSheet: Images.player_run,
      frames: 8,
      fps: 24,
      action: "run",
    },
    jump: {
      spriteSheet: Images.player_jump,
      frames: 12,
      fps: 20,
      startFrame: 3,
      loop: false,
      action: "jump",
    },
    walk: {
      spriteSheet: Images.player_walk,
      frames: 8,
      fps: 16,
      action: "walk",
    },
  };

  const currentMove = useRef(movesMapping.idle);

  if (directions.actionX && jumping.current !== true) {
    jumping.current = true;
  }
  if (props.isOnGround && jumping.current !== false) {
    jumping.current = false;
  }

  if ((directions.left || directions.right) && props.isOnGround) {
    currentMove.current = directions.actionY
      ? movesMapping.walk
      : movesMapping.run;
  } else if (!props.isOnGround && jumping.current) {
    currentMove.current = movesMapping.jump;
  } else {
    currentMove.current = movesMapping.idle;
  }

  const newLevelHeight = levelWidth / levelAspectRatio;
  const spriteSize = (90 / levelHeight) * newLevelHeight * 1.3;

  return (
    <SpriteSheet
      {...currentMove.current}
      spriteSize={spriteSize}
      showRigidbody={false}
      direction={lastDirection.current}
      {...props}
    />
  );
};
