import Matter from "matter-js";
import { screenHeight, screenWidth } from "../constants";
import { engine, world } from "./engine";
import Box from "../components/Box";
import { Image } from "react-native";
import walls from "./walls";
import floor from "./floor";
import { newLevelHeight } from "./constanst";

const boxSize = 20;

export const player = Matter.Bodies.rectangle(
  screenWidth / 2,
  screenHeight / 2,
  boxSize,
  boxSize,
  { mass: 7, restitution: 0, friction: 0, inertia: Infinity }
);

const entities = {
  physics: { engine: engine, world: world },
  ...walls,
  ...floor,
  player: {
    body: player,
    size: [boxSize, boxSize],
    color: "red",
    renderer: Box,
    isOnGround: false,
    isWallCollied: false,
    xAxis: 0,
  },
  directions: {
    left: false,
    right: false,
    up: false,
    down: false,
    actionOne: false,
    actionTwo: false,
  },
  background: {
    renderer: () => (
      <Image
        source={require("../assets/_composite.png")}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: screenWidth,
          height: newLevelHeight,
          zIndex: -1,
        }}
      />
    ),
  },
  camera: { offsetY: 0, offsetX: 0 },
};

Matter.World.add(world, [
  player,
  ...Object.values(walls).map((wall) => wall.body),
  ...Object.values(floor).map((wall) => wall.body),
]);

export default entities;
