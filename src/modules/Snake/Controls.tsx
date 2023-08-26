import React from "react";
import Button from "../../components/Button";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, View } from "react-native";
import { Direction } from "./types";
import { width } from "../../utils/metrics";

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    width: 80,
    height: 80,
    alignItems: "center",
    borderRadius: 20,
  },
});

interface Props {
  lastDirection: React.MutableRefObject<Direction>;
}

export default ({ lastDirection }: Props) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Button
        icon={<MaterialCommunityIcons name={"chevron-up"} size={30} />}
        containerStyle={styles.button}
        text="Up"
        onPress={() =>
          lastDirection.current !== "down"
            ? (lastDirection.current = "up")
            : undefined
        }
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: width - 100,
        }}
      >
        <Button
          icon={<MaterialCommunityIcons name={"chevron-left"} size={30} />}
          containerStyle={styles.button}
          text="Left"
          onPress={() =>
            lastDirection.current !== "right"
              ? (lastDirection.current = "left")
              : undefined
          }
        />
        <Button
          icon={<MaterialCommunityIcons name={"chevron-right"} size={30} />}
          containerStyle={styles.button}
          text="Right"
          onPress={() =>
            lastDirection.current !== "left"
              ? (lastDirection.current = "right")
              : undefined
          }
        />
      </View>
      <Button
        icon={<MaterialCommunityIcons name={"chevron-down"} size={30} />}
        containerStyle={styles.button}
        text="Down"
        onPress={() =>
          lastDirection.current !== "up"
            ? (lastDirection.current = "down")
            : undefined
        }
      />
    </View>
  );
};
