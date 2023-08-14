import React, { Dispatch, SetStateAction, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { height } from "../../utils/metrics";
import RadioButtonGroup from "../../components/RadioButtonGroup";
import { O, X } from "./constants";
import { Mark } from "./types";
import Checkbox from "../../components/Checkbox";

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  setPlayerMark: (v: string) => void;
  playerMark: Mark;
  onClose: () => void;
  onAIModeChange: (v: boolean) => void;
  isAIAcive: boolean;
}

export default ({
  isModalVisible,
  setIsModalVisible,
  setPlayerMark,
  playerMark,
  onClose,
  onAIModeChange,
  isAIAcive,
}: Props) => {
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setIsModalVisible(false);
        onClose();
      }}
      onSwipeComplete={() => setIsModalVisible(false)}
      swipeDirection={["up", "left", "right", "down"]}
      style={styles.view}
    >
      <View
        style={{
          backgroundColor: "white",
          height: height / 3,
          paddingHorizontal: 20,
        }}
      >
        <View>
          <Text style={{ padding: 10, textAlign: "center" }}>Choose Mark</Text>
          <RadioButtonGroup
            value={playerMark}
            data={[
              { title: X, value: X },
              { title: O, value: O },
            ]}
            onChange={(v) => setPlayerMark(v)}
          />
          <Text style={{ padding: 10, textAlign: "center" }}>AI Mode</Text>
          <Checkbox
            title={"AI active"}
            checked={isAIAcive}
            onPress={() => onAIModeChange(!isAIAcive)}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: "flex-end",
    margin: 0,
  },
});
