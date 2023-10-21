import React, { useRef } from "react";
import SpriteSheet from "./SpriteSheet";
import { Entity } from "../types";
import Images from "../assets";

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
      offset: 20,
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

  return (
    <SpriteSheet
      {...currentMove.current}
      spriteSize={130}
      direction={lastDirection.current}
      {...props}
    />
  );
};
