import React, { Component } from "react";
import { View } from "react-native";
import { Entity } from "../types";

export default (props: Omit<Entity, "renderer">) => {
  const width = props.size[0];
  const height = props.size[1];
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  return (
    <View
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        backgroundColor: props.color || "pink",
      }}
    />
  );
};
