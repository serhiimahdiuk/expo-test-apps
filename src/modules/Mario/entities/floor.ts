import level from "../assets/level.json";
import { convertJSONtoEntities } from "./utils";

export default convertJSONtoEntities(
  level.entities.Floor,
  "floor",
  {
    isStatic: true,
    restitution: 0,
  },
  "rgba(144, 238, 144, 0.5)"
);
