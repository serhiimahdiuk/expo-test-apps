import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { width } from "../../utils/metrics";

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: width - 40,
    marginVertical: 20,
    borderRadius: 5,
    justifyContent: "center",
    backgroundColor: "#9bcdff",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});

interface Props {
  text: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export default ({ text, onPress, containerStyle, textStyle }: Props) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => {
        return (
          <View
            style={[
              styles.container,
              pressed && { opacity: 0.7 },
              containerStyle,
            ]}
          >
            <Text
              style={[styles.text, textStyle]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {text}
            </Text>
          </View>
        );
      }}
    </Pressable>
  );
};
