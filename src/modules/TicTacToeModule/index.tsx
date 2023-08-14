import React, { useEffect, useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button";
import { width } from "../../utils/metrics";
import { O, SIZE, X } from "./constants";
import PlaygroundGrid from "./PlaygroundGrid";
import { SafeAreaView } from "react-native-safe-area-context";
import { Mark, Playground } from "./types";
import { checIfWinnerFound } from "./utils";
import { minimax } from "./AI";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Settings from "./Settings";
import { sleep } from "../../utils";

const styles = StyleSheet.create({
  container: { alignItems: "center", flex: 1 },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: (SIZE + 1) * 3,
  },
});

export default () => {
  const [playground, setPlayground] = useState<Playground>(
    new Array(9).fill(0).map((_, idx) => idx)
  );
  const [winner, setWinner] = useState<string | undefined>(undefined);
  const [winCombination, setWinCombination] = useState<number[]>([]);
  const [showSettings, setShowSettings] = useState(true);
  const [playerMark, setPlayerMark] = useState<Mark>(X);
  const [withAI, setWithAI] = useState(false);
  const [loading, setLoading] = useState(false);

  const AImark = useMemo(() => (playerMark === X ? O : X), [playerMark]);

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
    if (playerMark === O && withAI) {
      AI(new Array(9).fill(0).map((_, idx) => idx));
    }
  };

  const AI = async (nextPlayground: Playground) => {
    setLoading(true);
    await sleep(500);
    const best = minimax([...nextPlayground], AImark);
    if (best.index !== undefined && typeof best.index === "number") {
      nextPlayground[best.index] = AImark;
      setHistory((last) => [
        ...last,
        {
          player: AImark,
          playground: nextPlayground,
          position: [
            Math.floor(Number(best.index) / 3),
            (Number(best.index) % 3) + 1,
          ],
        },
      ]);
      setLoading(false);
      setPlayground(nextPlayground);
    }
  };

  const playerStep = (nextPlayground: Playground, index: number) => {
    if (typeof nextPlayground[index] === "number") {
      nextPlayground[index] = playerMark;
      setHistory((last) => [
        ...last,
        {
          player: playerMark,
          playground: nextPlayground,
          position: [Math.floor(index / 3), (index % 3) + 1],
        },
      ]);
      setPlayground(nextPlayground);
      !withAI && setPlayerMark(playerMark === X ? O : X);
      return nextPlayground;
    }
    return false;
  };

  const onStep = (index: number) => {
    if (!isGameOver) {
      const playgroundCopy = [...playground];
      const nextPlayground = playerStep(playgroundCopy, index);
      Array.isArray(nextPlayground) && withAI && AI([...nextPlayground]);
    }
  };

  const checkWiner = () => {
    const PlayerWinnerw = checIfWinnerFound(
      playground,
      playerMark,
      setWinCombination
    );
    const AIwinner = checIfWinnerFound(playground, AImark, setWinCombination);
    if (AIwinner || PlayerWinnerw) setWinner(AIwinner ? AImark : playerMark);
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
      return `Next player: ${history.length % 2 === 0 ? X : O}`;
    } else {
      return winner ? `Winner: ${winner}` : `Тo winner`;
    }
  };

  const chooseStepFromHistory = (item: (typeof history)[0], index: number) => {
    const nextHistory = history.slice(0, index + 1);
    setPlayground(item.playground);
    setHistory(nextHistory);
    setWinner(undefined);
    setWinCombination([]);
    if ((nextHistory.length % 2 === 0 ? X : O) === AImark) {
      AI([...item.playground]);
    }
  };

  const chooseMark = (value: string) => {
    if (value === X || value === O) setPlayerMark(value);
  };

  const onSettingsClose = () => {
    resetState();
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View
        style={{
          backgroundColor: withAI ? "#CBFFA9" : "#FF9B9B",
          width: width,
        }}
      >
        <Text style={{ textAlign: "center", padding: 5 }}>
          {withAI ? `AI activated` : "AI deactivated"}
        </Text>
      </View>
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
        loading={loading}
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
        playerMark={playerMark}
        setIsModalVisible={setShowSettings}
        onClose={onSettingsClose}
        setPlayerMark={chooseMark}
        onAIModeChange={setWithAI}
        isAIAcive={withAI}
      />
    </SafeAreaView>
  );
};
