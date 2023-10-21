import level from "../assets/level.json";
import { convertJSONtoEntities } from "./utils";

export default convertJSONtoEntities(
  level.entities.Celling,
  "celling",
  {
    isStatic: true,
    restitution: 0,
  },
  "rgba(173,216,230,0.5)"
);
