import Matter from "matter-js";
import { Entities } from "../types";
import { GameEngineUpdateEventOptionType } from "react-native-game-engine";

const RUN_SPEED = 5;
const WALK_SPEED = 2;

export default (
  entities: Entities,
  { time }: GameEngineUpdateEventOptionType
) => {
  const directions = entities.player.directions;
  const speed =
    directions.actionY && entities.player.isOnGround ? WALK_SPEED : RUN_SPEED;
  if (Math.abs(entities.player.xAxis) < 0.1) {
    entities.player.xAxis = 0;
  }
  if (entities.player.xAxis <= speed) {
    if (directions.left && entities.player.xAxis > -speed) {
      entities.player.xAxis -= 0.8;
    } else if (directions.right && entities.player.xAxis < speed) {
      entities.player.xAxis += 0.8;
    }
  }
  if (entities.player.xAxis > 0) {
    entities.player.xAxis -= 0.3;
  } else if (entities.player.xAxis < 0) {
    entities.player.xAxis += 0.3;
  }

  if (entities.player.isWallCollied) {
    if (entities.player.xAxis > 0) {
      entities.player.xAxis = -1.0;
    } else {
      entities.player.xAxis = 1.0;
    }
  }

  if (entities.player.xAxis !== 0) {
    Matter.Body.translate(entities.player.body, {
      x: entities.player.xAxis,
      y: 0,
    });
  }

  if (
    directions.actionX &&
    entities.player.isOnGround &&
    entities.player.body.velocity.y === 0
  ) {
    entities.player.xAxis = 0;
    Matter.Body.setVelocity(entities.player.body, {
      x: entities.player.body.velocity.x,
      y: -13,
    });
  }

  return entities;
};
