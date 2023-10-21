import React, { MutableRefObject } from "react";
import { Pressable, Text, View, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { screenWidth } from "../constants";
import entities from "../entities";

const SIZE = 60;

interface Props {
  directions: MutableRefObject<typeof entities.directions>;
}

const Button = ({
  onTouchEnd,
  onTouchStart,
  children,
  style,
}: React.PropsWithChildren<{
  onTouchStart: () => void;
  onTouchEnd: () => void;
  style?: ViewStyle;
}>) => {
  return (
    <View style={style}>
      <Pressable
        style={{ alignSelf: "center", ...style }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {children}
      </Pressable>
    </View>
  );
};

export default ({ directions }: Props) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        padding: 40,
        flexDirection: "row",
        width: screenWidth,
        justifyContent: "space-between",
      }}
    >
      <View>
        <Button
          onTouchStart={() => {
            directions.current.up = true;
          }}
          onTouchEnd={() => {
            directions.current.up = false;
          }}
        >
          <MaterialCommunityIcons
            name="arrow-up-bold-box"
            size={SIZE}
            color="black"
          />
        </Button>
        <View style={{ flexDirection: "row" }}>
          <Button
            onTouchStart={() => {
              directions.current.left = true;
            }}
            onTouchEnd={() => {
              directions.current.left = false;
            }}
          >
            <MaterialCommunityIcons
              name="arrow-left-bold-box"
              size={SIZE}
              color="black"
            />
          </Button>

          <View style={{ width: SIZE }} />

          <Button
            onTouchStart={() => {
              directions.current.right = true;
            }}
            onTouchEnd={() => {
              directions.current.right = false;
            }}
          >
            <MaterialCommunityIcons
              name="arrow-right-bold-box"
              size={SIZE}
              color="black"
            />
          </Button>
        </View>
        <Button
          onTouchStart={() => {
            directions.current.down = true;
          }}
          onTouchEnd={() => {
            directions.current.down = false;
          }}
        >
          <MaterialCommunityIcons
            name="arrow-down-bold-box"
            size={SIZE}
            color="black"
          />
        </Button>
      </View>
      <View style={{ justifyContent: "space-between" }}>
        <Button
          style={{
            alignSelf: "center",
            height: SIZE,
            width: SIZE,
            justifyContent: "center",
            borderWidth: 4,
            borderRadius: 10,
            alignItems: "center",
          }}
          onTouchStart={() => {
            directions.current.actionOne = true;
          }}
          onTouchEnd={() => {
            directions.current.actionOne = false;
          }}
        >
          <Text style={{ fontSize: 40 }}>A</Text>
        </Button>

        <Button
          style={{
            alignSelf: "center",
            height: SIZE,
            width: SIZE,
            justifyContent: "center",
            borderWidth: 4,
            borderRadius: 10,
            alignItems: "center",
          }}
          onTouchStart={() => {
            directions.current.actionTwo = true;
          }}
          onTouchEnd={() => {
            directions.current.actionTwo = false;
          }}
        >
          <Text style={{ fontSize: 40 }}>B</Text>
        </Button>
      </View>
    </View>
  );
};
