import { screenWidth } from "../constants";
import Matter from "matter-js";
import Box from "../components/Box";
import { JSON_ENTITIES } from "../assets/types";
import { Entity } from "../types";
import { newLevelHeight } from "./constanst";

export const convertJSONtoEntities = (
  json: JSON_ENTITIES[],
  key: string,
  options?: Matter.IChamferableBodyDefinition,
  color = "rgba(128,128,128,0.5)"
) => {
  const newLevel = json.map((entity) => {
    const newWall = { ...entity };
    newWall.x = (newWall.x / 320) * screenWidth;
    newWall.y = (newWall.y / 208) * newLevelHeight;
    newWall.width = (newWall.width / 320) * screenWidth;
    newWall.height = (newWall.height / 208) * newLevelHeight;
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
    acc[`${key}${idx}`] = {
      body: newWall,
      size: [element.width, element.height],
      color: color,
      renderer: Box,
    };
    acc[`${key}${idx}`][key] = true;
    return acc;
  }, {} as { [key: string]: Entity });

  return entities;
};
