import level from "../assets/level.json";
import { convertJSONtoEntities } from "./utils";

export default convertJSONtoEntities(level.entities.Walls, "wall", {
  isStatic: true,
  restitution: 0,
});
