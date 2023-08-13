import { WIN_COMBINATIONS } from "./constants";
import { Mark, Playground } from "./types";

export const checIfWinnerFound = (
  playground: Playground,
  player: Mark,
  callback?: (combination: number[]) => void
) => {
  for (let combination of WIN_COMBINATIONS) {
    if (
      playground[combination[0] - 1] === player &&
      playground[combination[1] - 1] === player &&
      playground[combination[2] - 1] === player
    ) {
      if (typeof callback === "function") callback(combination);
      return true;
    }
  }
  return false;
};

export const getEmplyCellIndexes = (playground: Playground) => {
  return playground.filter((i) => i != "X" && i != "O") as number[];
};
