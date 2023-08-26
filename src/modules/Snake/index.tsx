import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../../components/Button";
import { width } from "../../utils/metrics";
import { Direction } from "./types";
import Controls from "./Controls";
import Settings from "./Settings";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const X_SIZE = 20;
const Y_SIZE = 15;
const SIZE = +(width / X_SIZE).toFixed(0);
const SPEED = 400;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  playground: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  cell: {
    width: SIZE - 1,
    height: SIZE - 1,
    borderWidth: 1,
    borderColor: "#c0c0c0",
  },
});

export default () => {
  const interval = useRef<NodeJS.Timer>();
  const emptyPlayground = new Array(X_SIZE * Y_SIZE)
    .fill(0)
    .map((_, idx) => idx) as (string | number)[];
  const defaultSnake = [
    [5, 0],
    [4, 0],
    [3, 0],
    [2, 0],
    [1, 0],
  ];
  const [run, setRun] = useState(false);
  let meal = -1;
  const lastDirection = useRef<Direction>("right");
  const [playground, setPlayground] = useState([...emptyPlayground]);
  const snake = useRef(defaultSnake);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const speed = useRef<number>(SPEED);

  const reset = () => {
    setRun(false);
    setPlayground(emptyPlayground);
    snake.current = defaultSnake;
    lastDirection.current = "right";
  };

  const convertPointToIndex = (point: number[]) => {
    return point[1] * X_SIZE + point[0];
  };

  const calculateNextPoint = (value: number, size: number, reverse = false) => {
    let notZeroValue = value === 0 ? size : value;
    return (reverse ? notZeroValue - 1 : notZeroValue + 1) % size;
  };

  const moveSnake = (direction: "left" | "right" | "up" | "down") => {
    const nextSnake = snake.current.map((el, idx, arr) => {
      if (idx === 0) {
        if (direction === "right") {
          return [calculateNextPoint(el[0], X_SIZE), el[1]];
        } else if (direction === "left") {
          return [calculateNextPoint(el[0], X_SIZE, true), el[1]];
        } else if (direction === "down") {
          return [el[0], calculateNextPoint(el[1], Y_SIZE)];
        } else if (direction === "up") {
          return [el[0], calculateNextPoint(el[1], Y_SIZE, true)];
        } else {
          return el;
        }
      } else {
        return arr[idx - 1];
      }
    });

    const nextSnakeIndex = convertPointToIndex(nextSnake[0]);
    for (let i = 3; i < snake.current.length; i++) {
      const snakeIndex = convertPointToIndex(snake.current[i]);
      if (snakeIndex === nextSnakeIndex) return false;
    }
    if (checkIfSnakeEat(nextSnake[0])) {
      snake.current = [nextSnake[0], ...snake.current];
      meal = -1;
    } else {
      snake.current = nextSnake;
    }
    return true;
  };

  const checkIfSnakeEat = (point: number[]) => {
    return convertPointToIndex(point) === meal;
  };

  const calculateSpeed = () => {
    return speed.current - +(snake.current.length / 3).toFixed(0) * 10;
  };

  const step = () => {
    const isNextStep = moveSnake(lastDirection.current);
    calculateNewPlayground();
    if (isNextStep) {
      const fixedSpeed = calculateSpeed();
      interval.current = setTimeout(step, fixedSpeed < 50 ? 50 : fixedSpeed);
    }
  };

  const runGame = () => {
    setPlayground(emptyPlayground);
    snake.current = defaultSnake;
    lastDirection.current = "right";
    step();
  };

  const calculateNewPlayground = () => {
    const nextPlayground = [...emptyPlayground];
    for (let i = 0; i < snake.current.length; i++) {
      const point = snake.current[i];

      nextPlayground[convertPointToIndex(point)] = "S";
    }

    if (meal < 0) {
      const emptyCells = nextPlayground.filter(
        (i) => typeof i === "number"
      ) as number[];
      const randomEmptyIndex = Math.floor(Math.random() * emptyCells.length);
      meal = emptyCells[randomEmptyIndex];
    }
    nextPlayground[meal] = "M";
    setPlayground(nextPlayground);
  };

  useEffect(() => {
    if (run) runGame();
    return () => {
      interval.current && clearTimeout(interval.current);
    };
  }, [run]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: width - 20,
        }}
      >
        <Button
          text={run ? "Reset" : "Start"}
          onPress={() => {
            run ? reset() : setRun(true);
          }}
          containerStyle={{ width: "auto", paddingHorizontal: 40 }}
        />
        <Button
          text={"Settings"}
          icon={<MaterialCommunityIcons name="cog" size={30} />}
          onPress={() => {
            setIsModalVisible(true);
            reset();
          }}
          fullWidth={false}
          containerStyle={{
            paddingHorizontal: 10,
            marginLeft: 20,
          }}
        />
      </View>
      <View style={styles.playground}>
        {playground.map((i, id) => {
          return (
            <View
              key={"id" + id}
              style={[
                styles.cell,
                {
                  backgroundColor:
                    i === "S" ? "red" : i === "M" ? "green" : undefined,
                },
              ]}
            />
          );
        })}
      </View>
      <Controls lastDirection={lastDirection} />
      <Settings
        isModalVisible={isModalVisible}
        setIsModalVisible={(v) => {
          setIsModalVisible(v);
        }}
        speed={speed}
        onClose={() => null}
      />
    </View>
  );
};
