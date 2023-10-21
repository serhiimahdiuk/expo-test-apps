import React, { useRef } from "react";
import { StyleSheet, StatusBar, Pressable, Text } from "react-native";
import { GameEngine } from "react-native-game-engine";
import useLandscape from "../../hooks/useLandscape";
import Physics from "./systems/Physics";
import entities from "./entities";
import { Body } from "matter-js";
import { screenWidth } from "./constants";
import Controls from "./components/Controls";
import Collisions from "./systems/Collisions";
import { Entities } from "./types";
import Movement from "./systems/Movement";
import Camera from "./systems/Camera";
import CameraRenderer from "./renderer/CameraRenderer";

export default () => {
  const directions = useRef(entities.directions);

  const move = (directionObj: typeof directions) => (entities: Entities) => {
    entities.directions = directionObj.current;
    return entities;
  };

  useLandscape();
  return (
    <GameEngine
      style={styles.container}
      systems={[Physics, move(directions), Collisions, Movement, Camera]}
      entities={entities}
      renderer={CameraRenderer}
    >
      <StatusBar hidden={true} />
      <Pressable
        onPress={() =>
          Body.setPosition(entities.player.body, {
            x: screenWidth / 2,
            y: 0,
          })
        }
        style={{ padding: 100 }}
      >
        <Text>reset position</Text>
      </Pressable>
      <Controls directions={directions} />
    </GameEngine>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
