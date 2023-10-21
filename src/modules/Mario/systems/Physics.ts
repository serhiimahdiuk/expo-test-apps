import Matter from "matter-js";
import { Entities } from "../types";
import { world } from "../entities/engine";

export default (entities: Entities, { time }: { time: { delta: number } }) => {
  let engine = entities["physics"].engine;
  Matter.Engine.update(engine, time.delta);
  return entities;
};
