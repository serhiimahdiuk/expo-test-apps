import Matter from "matter-js";
import { Entities } from "../types";

const MAX_SPEED = 5;

export default (entities: Entities) => {
  const directions = entities.directions;
  if (Math.abs(entities.player.xAxis) < 0.3) {
    entities.player.xAxis = 0;
  }
  if (entities.player.xAxis <= MAX_SPEED) {
    if (directions.left && entities.player.xAxis > -MAX_SPEED) {
      entities.player.xAxis -= 1;
    } else if (directions.right && entities.player.xAxis < MAX_SPEED) {
      entities.player.xAxis += 1;
    }
  }
  if (entities.player.xAxis > 0) {
    entities.player.xAxis -= 0.2;
  } else if (entities.player.xAxis < 0) {
    entities.player.xAxis += 0.2;
  }
  if (entities.player.isWallCollied) {
    if (entities.player.xAxis > 0) {
      entities.player.xAxis = -1.2;
    } else {
      entities.player.xAxis = 1.2;
    }
  }

  if (entities.player.xAxis !== 0) {
    Matter.Body.translate(entities.player.body, {
      x: entities.player.xAxis,
      y: 0,
    });
  }

  if (
    directions.actionOne &&
    entities.player.isOnGround &&
    entities.player.body.velocity.y === 0
  ) {
    entities.player.xAxis = 0;
    Matter.Body.setVelocity(entities.player.body, { x: 0, y: -7 });
  }

  return entities;
};
