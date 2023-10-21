import level from "../assets/level.json";
import { convertJSONtoEntities } from "./utils";

export default convertJSONtoEntities(
  level.entities.Player,
  "player",
  { mass: 6, restitution: 0, friction: 0, inertia: Infinity },
  "rgba(144, 238, 144, 0.5)"
);
