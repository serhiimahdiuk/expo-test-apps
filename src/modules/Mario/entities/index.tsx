import Matter from "matter-js";
import { screenHeight, screenWidth } from "../constants";
import { engine, world } from "./engine";
import { Image, ImageBackground } from "react-native";
import walls from "./walls";
import floor from "./floor";
import celling from "./cellings";
import player from "./player";
import { levelHeight, levelWidth, newLevelHeight } from "./constanst";
import Player from "../components/Player";
import level from "../assets/level.json";
import Images from "../assets";

const entities = {
  physics: { engine: engine, world: world },
  ...walls,
  ...floor,
  ...celling,
  player: {
    ...player.player,
    renderer: Player,
    isOnGround: false,
    isWallCollied: false,
    xAxis: 0,
    directions: {
      left: false,
      right: false,
      up: false,
      down: false,
      actionA: false,
      actionB: false,
      actionX: false,
      actionY: false,
    },
  },
  background: {
    renderer: () => (
      <>
        <Image
          source={Images.bg}
          style={{
            position: "absolute",
            left: -10000 / 2,
            top: -10000 / 2,
            width: 10000,
            height: 10000,
            zIndex: -2,
          }}
        />
        <Image
          source={Images.composite}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: (level.width / levelWidth) * screenWidth,
            height: (level.height / levelHeight) * newLevelHeight,
            zIndex: -1,
          }}
        />
      </>
    ),
  },
  camera: { offsetY: 0, offsetX: 0 },
};

Matter.World.add(world, [
  // player,
  ...Object.values(player).map((el) => el.body),
  ...Object.values(walls).map((el) => el.body),
  ...Object.values(floor).map((el) => el.body),
  ...Object.values(celling).map((el) => el.body),
]);

export default entities;
