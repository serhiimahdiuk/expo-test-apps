import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAppNavigation } from "../../navigation/hooks";
import Button from "../../components/Button";
import { StyleSheet, View } from "react-native";
import { useAnimationData } from "./context/AnimationProvider";

const Header = () => {
  const navigation = useAppNavigation();
  const { togglePlayPause, run } = useAnimationData();
  return (
    <View
      style={{
        paddingHorizontal: "5%",
        height: "15%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <MaterialCommunityIcons
        name={"close-circle-outline"}
        size={30}
        onPress={() => {
          navigation.goBack();
        }}
      />
      {run && (
        <MaterialCommunityIcons
          name={"pause"}
          size={30}
          onPress={() => {
            togglePlayPause();
          }}
        />
      )}
    </View>
  );
};

export default () => {
  const { togglePlayPause, run } = useAnimationData();
  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <Header />
      {!run && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Button
            text="Start"
            onPress={() => {
              togglePlayPause();
            }}
          />
        </View>
      )}
    </View>
  );
};
