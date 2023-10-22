import { screenWidth } from "../constants";
import Matter from "matter-js";
import Box from "../components/Box";
import { JSON_ENTITIES } from "../assets/types";
import { Entity } from "../types";
import { levelHeight, levelWidth, newLevelHeight } from "./constanst";

export const calculateNewPosition = (pos: { x: number; y: number }) => {
  return {
    x: (pos.x / levelWidth) * screenWidth,
    y: (pos.y / levelHeight) * newLevelHeight,
  };
};

export const convertJSONtoEntities = (
  json: JSON_ENTITIES[],
  key: string,
  options?: Matter.IChamferableBodyDefinition,
  color = "rgba(128,128,128,0.5)"
) => {
  const newLevel = json.map((entity) => {
    const newWall = { ...entity };
    newWall.x = (newWall.x / levelWidth) * screenWidth;
    newWall.y = (newWall.y / levelHeight) * newLevelHeight;
    newWall.width = (newWall.width / levelWidth) * screenWidth;
    newWall.height = (newWall.height / levelHeight) * newLevelHeight;
    return newWall;
  });

  const entities = newLevel.reduce((acc, element, idx) => {
    const newWall = Matter.Bodies.rectangle(
      element.x + element.width / 2,
      element.y + element.height / 2,
      element.width,
      element.height,
      options
    );
    const entityName = newLevel.length === 1 ? key : `${key}${idx}`;
    acc[entityName] = {
      body: newWall,
      size: [element.width, element.height],
      color: false ? color : "transparent",
      renderer: Box,
    };
    acc[entityName][key] = true;
    return acc;
  }, {} as { [key: string]: Entity });

  return entities;
};
