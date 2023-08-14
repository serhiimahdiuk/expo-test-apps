import React from "react";
import { Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface Props {
  checked: boolean;
  title: string;
  onPress: () => void;
}

export default ({ checked, title, onPress }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialCommunityIcons
          name={checked ? "checkbox-marked-outline" : "checkbox-blank-outline"}
          size={30}
          color={"#537188"}
        />
        <Text style={{ fontSize: 20, paddingLeft: 10 }}>{title}</Text>
      </View>
    </Pressable>
  );
};
