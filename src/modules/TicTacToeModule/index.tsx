import React, { useEffect, useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button";
import { width } from "../../utils/metrics";
import { O, WIN_COMBINATIONS, X } from "./constants";
import PlaygroundGrid from "./PlaygroundGrid";
import { SafeAreaView } from "react-native-safe-area-context";
import { Playground } from "./types";

const styles = StyleSheet.create({
  container: { alignItems: "center", flex: 1 },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: width,
    paddingHorizontal: 40,
  },
});

export default () => {
  const [playground, setPlayground] = useState<Playground>(
    new Array(9).fill(undefined)
  );
  const [player, setPlayer] = useState<typeof X | typeof O>(X);
  const [winner, setWinner] = useState<string | undefined>(undefined);
  const [winCombination, setWinCombination] = useState<number[]>([]);

  const [history, setHistory] = useState<
    {
      playground: typeof playground;
      player: typeof player;
      position: [row: number, col: number];
    }[]
  >([]);

  const scroll = useRef<FlatList<(typeof history)[0]>>(null);

  const isPlaygroundFilled = !useMemo(
    () => playground.some((i) => i === undefined),
    [playground]
  );
  const isGameOver = winner || isPlaygroundFilled;

  const resetState = () => {
    setPlayground(new Array(9).fill(undefined));
    setWinner(undefined);
    setPlayer(X);
    setHistory([]);
  };

  const onStep = (index: number) => {
    if (!isGameOver) {
      const nextPlayground = [...playground];
      if (nextPlayground[index] === undefined) {
        nextPlayground[index] = player;
        setPlayground(nextPlayground);
        setHistory((last) => [
          ...last,
          {
            player: player,
            playground: nextPlayground,
            position: [Math.floor(index / 3), (index % 3) + 1],
          },
        ]);
      }
      changePlayer();
    }
  };

  const changePlayer = () => {
    setPlayer((prev) => (prev === X ? O : X));
  };

  const checkWiner = () => {
    for (let combination of WIN_COMBINATIONS) {
      if (
        playground[combination[0] - 1] !== undefined &&
        playground[combination[0] - 1] === playground[combination[1] - 1] &&
        playground[combination[1] - 1] === playground[combination[2] - 1]
      ) {
        setWinner(playground[combination[0] - 1]);
        setWinCombination(combination);
      }
    }
  };

  const onRestartGamePress = () => {
    resetState();
  };

  useEffect(() => {
    checkWiner();
  }, [playground]);

  useEffect(() => {
    return () => {
      resetState();
    };
  }, []);

  const renderText = () => {
    if (!isGameOver) {
      return `Next player: ${player}`;
    } else {
      return winner ? `Winner: ${winner}` : `Have no winners`;
    }
  };

  const chooseStepFromHistory = (item: (typeof history)[0], index: number) => {
    setPlayground(item.playground);
    setPlayer(item.player);
    setHistory((prev) => prev.slice(0, index + 1));
    setWinner(undefined);
    setWinCombination([]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.menuRow}>
        <Text style={{ paddingVertical: 10 }}>{renderText()}</Text>
        <Button
          text={"Restart Game"}
          onPress={onRestartGamePress}
          fullWidth={false}
          containerStyle={{
            paddingHorizontal: 10,
          }}
        />
      </View>
      <PlaygroundGrid
        playground={playground}
        onStep={onStep}
        winCombination={winCombination}
      />
      <Text style={{ padding: 10, fontSize: 20 }}>History</Text>
      <FlatList
        onContentSizeChange={() =>
          scroll.current?.scrollToEnd({ animated: true })
        }
        showsVerticalScrollIndicator={false}
        ref={scroll}
        data={history}
        keyExtractor={(i) => `${i.position[0]} ${i.position[1]}`}
        renderItem={({ item, index }) => (
          <Button
            key={index}
            text={`Step ${index + 1}: Player ${item.player} - position ${
              item.position[0]
            } ${item.position[1]}`}
            containerStyle={{
              marginVertical: 5,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              chooseStepFromHistory(item, index);
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};
