import React from "react";
import { View } from "react-native";
import Cell from "./Cell";
import { Playground } from "./types";
import Loader from "../../components/Loader";
import { SIZE } from "./constants";

export default ({
  playground,
  onStep,
  winCombination,
  loading,
}: {
  playground: Playground;
  onStep: (idx: number) => void;
  winCombination: number[];
  loading?: boolean;
}) => {
  const rows = new Array(3).fill(0);
  return (
    <View style={{ alignItems: "center" }}>
      {rows.map((_, rowIndex) => {
        return (
          <View key={rowIndex} style={{ flexDirection: "row" }}>
            {playground.map((el, elIndex) =>
              Math.floor(elIndex / 3) === rowIndex ? (
                <Cell
                  key={elIndex}
                  isWinCell={winCombination.includes(elIndex + 1)}
                  item={el}
                  onCellPress={() => onStep(elIndex)}
                />
              ) : null
            )}
          </View>
        );
      })}
      {loading && (
        <Loader
          fullScreen
          containerStyle={{
            position: "absolute",
            height: "100%",
            width: (SIZE + 1) * 3,
          }}
        />
      )}
    </View>
  );
};
