import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { height } from "../../utils/metrics";

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

export default ({ isModalVisible, setIsModalVisible }: Props) => {
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)}
      onSwipeComplete={() => setIsModalVisible(false)}
      swipeDirection={["up", "left", "right", "down"]}
      style={styles.view}
    >
      <View style={{ backgroundColor: "white", height: height / 3 }}>
        <Text>I am the modal content!</Text>
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
