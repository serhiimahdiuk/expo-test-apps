import entities from "./entities";

export type Entity = {
  body: Matter.Body;
  size: [number, number];
  color: string;
  renderer: React.ComponentType<any>;
} & {
  [key: string]: any;
};

export type Physics = {
  engine: Matter.Engine;
  world: Matter.World;
};

export type Entities = typeof entities;

export type Directions = {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
};
