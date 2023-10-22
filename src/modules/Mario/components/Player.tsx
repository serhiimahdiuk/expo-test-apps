import React, { useRef } from "react";
import SpriteSheet from "./SpriteSheet";
import { Entity } from "../types";
import Images from "../assets";
import {
  levelAspectRatio,
  levelHeight,
  levelWidth,
} from "../entities/constanst";
import Matter from "matter-js";

export default (props: Entity) => {
  const { directions } = props;
  const lastDirection = React.useRef<"left" | "right">("left");
  if (directions.left) {
    lastDirection.current = "left";
  } else if (directions.right) {
    lastDirection.current = "right";
  }
  const jumping = useRef(false);
  const attack1 = useRef(false);
  const attack2 = useRef(false);
  const attack3 = useRef(false);

  const prevActionAPress = useRef(false);

  if (directions.actionA && !prevActionAPress.current) {
    if (attack1.current && !attack2.current && !attack3.current) {
      attack2.current = true;
    }
    if (attack2.current && !attack1.current && !attack3.current) {
      attack3.current = true;
    }
    prevActionAPress.current = true;
    if (!attack2.current && !attack3.current && !attack1.current) {
      attack1.current = true;
    }
  }
  if (!directions.actionA && prevActionAPress.current) {
    prevActionAPress.current = false;
  }

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
    attack1: {
      spriteSheet: Images.player_attack1,
      frames: 6,
      fps: 10,
      loop: false,
      action: "attack1",
      onStartAnimation: () => {
        attack1.current = true;
      },
      onEndAnimation: () => {
        attack1.current = false;
      },
    },
    attack2: {
      spriteSheet: Images.player_attack2,
      frames: 4,
      fps: 8,
      loop: false,
      action: "attack2",
      onStartAnimation: () => {
        attack2.current = true;
      },
      onEndAnimation: () => {
        attack2.current = false;
      },
    },
    attack3: {
      spriteSheet: Images.player_attack3,
      frames: 3,
      fps: 8,
      loop: false,
      action: "attack3",
      onStartAnimation: () => {
        attack3.current = true;
      },
      onEndAnimation: () => {
        attack3.current = false;
      },
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
  } else if (props.isOnGround && attack1.current) {
    currentMove.current = movesMapping.attack1;
  } else if (props.isOnGround && attack2.current && !attack1.current) {
    currentMove.current = movesMapping.attack2;
  } else if (props.isOnGround && attack3.current && !attack2.current) {
    // matter js translate char fast forvard when attack3
    Matter.Body.translate(props.body, {
      x: 10 * (lastDirection.current === "left" ? -1 : 1),
      y: 0,
    });

    currentMove.current = movesMapping.attack3;
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
