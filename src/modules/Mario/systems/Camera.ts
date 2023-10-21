import { GameEngineUpdateEventOptionType } from "react-native-game-engine";
import { Entities } from "../types";

export default (
  entities: Entities,
  { screen }: GameEngineUpdateEventOptionType
) => {
  let player = entities.player;
  let camera = entities.camera;
  const center = player.body.position.x - screen.width / 2;
  const diff = Math.round(center - camera.offsetX);
  camera.offsetX += diff * 0.05;

  const centerV = player.body.position.y - screen.height / 2 - 20;
  const diffV = centerV - camera.offsetY;
  if (Math.abs(diffV) > 10) camera.offsetY += diffV * 0.05;

  return entities;
};
