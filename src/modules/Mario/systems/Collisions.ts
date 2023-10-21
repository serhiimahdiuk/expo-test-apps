import { Query } from "matter-js";
import { Entities, Entity } from "../types";

export default (entities: Entities) => {
  const floorCollision = Query.collides(
    entities.player.body,
    (Object.values(entities) as unknown as Entity[])
      .filter((e) => e.floor)
      .map((e) => e.body)
  );
  const wallCollision = Query.collides(
    entities.player.body,
    (Object.values(entities) as unknown as Entity[])
      .filter((e) => e.wall)
      .map((e) => e.body)
  );

  if (floorCollision.length > 0) {
    entities.player.isOnGround = true;
  } else {
    entities.player.isOnGround = false;
  }

  if (wallCollision.length > 0) {
    entities.player.isWallCollied = true;
  } else {
    entities.player.isWallCollied = false;
  }
  return entities;
};
