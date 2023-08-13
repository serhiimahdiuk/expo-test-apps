import React, { useEffect, useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button";
import { width } from "../../utils/metrics";
import { O, WIN_COMBINATIONS, X } from "./constants";
import PlaygroundGrid from "./PlaygroundGrid";
import { SafeAreaView } from "react-native-safe-area-context";
import { Mark, Playground } from "./types";
import { checIfWinnerFound } from "./utils";
import { minimax } from "./AI";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Settings from "./Settings";

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
    new Array(9).fill(0).map((_, idx) => idx)
  );
  const [winner, setWinner] = useState<string | undefined>(undefined);
  const [winCombination, setWinCombination] = useState<number[]>([]);
  const [withAI, setWithAI] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const [history, setHistory] = useState<
    {
      playground: typeof playground;
      player: Mark;
      position: [row: number, col: number];
    }[]
  >([]);

  const scroll = useRef<FlatList<(typeof history)[0]>>(null);

  const isPlaygroundFilled = !useMemo(
    () => playground.some((i) => typeof i === "number"),
    [playground]
  );
  const isGameOver = winner || isPlaygroundFilled;

  const resetState = () => {
    setPlayground(new Array(9).fill(0).map((_, idx) => idx));
    setWinner(undefined);
    setHistory([]);
    setWinCombination([]);
  };

  const AI = (nextPlayground: Playground) => {
    const best = minimax([...nextPlayground], O);
    if (best.index !== undefined && typeof best.index === "number") {
      nextPlayground[best.index] = O;
      setHistory((last) => [
        ...last,
        {
          player: O,
          playground: nextPlayground,
          position: [
            Math.floor(Number(best.index) / 3),
            (Number(best.index) % 3) + 1,
          ],
        },
      ]);
    }
  };

  const onStep = (index: number) => {
    if (!isGameOver) {
      const nextPlayground = [...playground];
      if (typeof nextPlayground[index] === "number") {
        nextPlayground[index] = X;
        setHistory((last) => [
          ...last,
          {
            player: X,
            playground: nextPlayground,
            position: [Math.floor(index / 3), (index % 3) + 1],
          },
        ]);
      }
      AI(nextPlayground);
      setPlayground(nextPlayground);
    }
  };

  const checkWiner = () => {
    const Xwinner = checIfWinnerFound(playground, X, setWinCombination);
    const Owinner = checIfWinnerFound(playground, O, setWinCombination);
    if (Xwinner || Owinner) setWinner(Owinner ? O : X);
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
      return `Next player: ${X}`;
    } else {
      return winner ? `Winner: ${winner}` : `Have no winners`;
    }
  };

  const chooseStepFromHistory = (item: (typeof history)[0], index: number) => {
    setPlayground(item.playground);
    setHistory((prev) => prev.slice(0, index + 1));
    setWinner(undefined);
    setWinCombination([]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.menuRow}>
        <Text style={{ paddingVertical: 10 }}>{renderText()}</Text>
        <View style={{ flexDirection: "row" }}>
          <Button
            text={"Restart Game"}
            icon={<MaterialCommunityIcons name="restart" size={30} />}
            onPress={onRestartGamePress}
            fullWidth={false}
            containerStyle={{
              paddingHorizontal: 10,
              marginRight: 10,
            }}
          />
          <Button
            text={"Settings"}
            icon={<MaterialCommunityIcons name="cog" size={30} />}
            onPress={() => setShowSettings(true)}
            fullWidth={false}
            containerStyle={{
              paddingHorizontal: 10,
            }}
          />
        </View>
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
      <Settings
        isModalVisible={showSettings}
        setIsModalVisible={setShowSettings}
      />
    </SafeAreaView>
  );
};
