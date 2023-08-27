import React from "react";
import { StyleSheet, View } from "react-native";
import useLandscape from "../../hooks/useLandscape";
import Playground from "./Playground";
import HUD from "./HUD";
import AnimationProvider from "./context/AnimationProvider";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default () => {
  useLandscape();
  return (
    <View style={styles.container}>
      <AnimationProvider>
        <Playground />
        <HUD />
      </AnimationProvider>
    </View>
  );
};
