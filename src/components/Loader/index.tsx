import React from "react";
import { ActivityIndicator, View, ViewStyle } from "react-native";
import { height, width } from "../../utils/metrics";

export default ({
  fullScreen = false,
  containerStyle,
}: {
  fullScreen?: boolean;
  containerStyle?: ViewStyle;
}) => {
  if (fullScreen)
    return (
      <View
        style={[
          {
            width: width,
            alignItems: "center",
            justifyContent: "center",
            height: height,
            backgroundColor: "rgba(0,0,0,0.3)",
            position: "absolute",
          },
          containerStyle,
        ]}
      >
        <ActivityIndicator size={"large"} color={"white"} />
      </View>
    );
  return (
    <View
      style={[
        {
          width: width,
          alignItems: "center",
          justifyContent: "center",
          height: 50,
        },
        containerStyle,
      ]}
    >
      <ActivityIndicator size={"large"} />
    </View>
  );
};
