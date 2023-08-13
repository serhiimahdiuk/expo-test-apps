import React from "react";
import { Pressable, Text, View } from "react-native";
import { SIZE, X } from "./constants";

export default ({
  item,
  onCellPress,
  isWinCell,
}: {
  item: string;
  onCellPress: () => void;
  isWinCell?: boolean;
}) => {
  const color = item === X ? "blue" : "red";
  return (
    <Pressable onPress={onCellPress}>
      <View
        style={{
          width: SIZE,
          height: SIZE,
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 64, color: isWinCell ? "green" : color }}>
          {item}
        </Text>
      </View>
    </Pressable>
  );
};
