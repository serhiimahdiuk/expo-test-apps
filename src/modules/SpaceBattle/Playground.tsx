import React from "react";
import { View } from "react-native";
import { height, width } from "../../utils/metrics";
import Player from "./components/Player";

export default () => {
  return (
    <View style={{ height: width, width: height }}>
      <Player />
    </View>
  );
};
