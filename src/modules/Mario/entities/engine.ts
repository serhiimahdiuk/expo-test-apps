import Matter from "matter-js";

export const engine = Matter.Engine.create({ enableSleeping: false });
export const world = engine.world;
