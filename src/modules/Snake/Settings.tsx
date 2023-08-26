import React, { Dispatch, SetStateAction, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { height } from "../../utils/metrics";
import RadioButtonGroup from "../../components/RadioButtonGroup";
import Checkbox from "../../components/Checkbox";
import { Slider } from "@react-native-assets/slider";

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  speed: React.MutableRefObject<number>;
}

export default ({
  isModalVisible,
  setIsModalVisible,
  speed,
  onClose,
}: Props) => {
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setIsModalVisible(false);
        onClose();
      }}
      onSwipeComplete={() => setIsModalVisible(false)}
      style={styles.view}
    >
      <View
        style={{
          backgroundColor: "white",
          height: height / 3,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ padding: 10, textAlign: "center" }}>Speed</Text>
        <Slider
          value={speed.current}
          minimumValue={100} // Minimum value
          maximumValue={500}
          step={100}
          thumbTintColor="#9bcdff"
          thumbSize={25}
          trackStyle={{ backgroundColor: "#c0c0c0" }}
          CustomMark={({ value }) => (
            <View
              style={{ height: 12, width: 2, backgroundColor: "#c0c0c0" }}
            />
          )}
          onValueChange={(v) => (speed.current = v)}
        />
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
