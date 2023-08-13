import { O, X } from "./constants";
import { Mark, Playground } from "./types";
import { checIfWinnerFound, getEmplyCellIndexes } from "./utils";

interface TestPlayInfo {
  index?: number | Mark;
  score: number;
}

const humanMark = X;
const aiMark = O;

export function minimax(currBdSt: Playground, currMark: Mark) {
  const availCellsIndexes = getEmplyCellIndexes(currBdSt);

  if (checIfWinnerFound(currBdSt, humanMark)) {
    return { score: -1 };
  } else if (checIfWinnerFound(currBdSt, aiMark)) {
    return { score: 1 };
  } else if (availCellsIndexes.length === 0) {
    return { score: 0 };
  }

  const allTestPlayInfos = [];

  for (let i = 0; i < availCellsIndexes.length; i++) {
    const currentTestPlayInfo: TestPlayInfo = { index: 0, score: 0 };

    currentTestPlayInfo.index = currBdSt[availCellsIndexes[i]];

    currBdSt[availCellsIndexes[i]] = currMark;

    if (currMark === aiMark) {
      const result = minimax(currBdSt, humanMark);

      currentTestPlayInfo.score = result.score;
    } else {
      const result = minimax(currBdSt, aiMark);

      currentTestPlayInfo.score = result.score;
    }

    currBdSt[availCellsIndexes[i]] = currentTestPlayInfo.index;

    allTestPlayInfos.push(currentTestPlayInfo);
  }

  let bestTestPlay = -1;

  if (currMark === aiMark) {
    let bestScore = -Infinity;
    for (let i = 0; i < allTestPlayInfos.length; i++) {
      if (allTestPlayInfos[i].score > bestScore) {
        bestScore = allTestPlayInfos[i].score;
        bestTestPlay = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < allTestPlayInfos.length; i++) {
      if (allTestPlayInfos[i].score < bestScore) {
        bestScore = allTestPlayInfos[i].score;
        bestTestPlay = i;
      }
    }
  }

  return allTestPlayInfos[bestTestPlay];
}
