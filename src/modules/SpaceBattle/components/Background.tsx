import React, { useEffect, useRef } from "react";
import { Image, ImageSourcePropType, View } from "react-native";
import { useAnimationData } from "../context/AnimationProvider";
import { Backgrounds } from "../assets";

export default () => {
  const { run, frameCount } = useAnimationData();

  const image = useRef<ImageSourcePropType>(Backgrounds.bg_stars);

  const getRandonBg = () => {
    const bgKeys = Object.keys(Backgrounds);
    const randomNumber = Math.round(Math.random() * (bgKeys.length - 1));
    return Backgrounds[bgKeys[randomNumber]];
  };

  const img = !run ? Backgrounds.bg_stars : image.current;

  useEffect(() => {
    if (!run) {
      image.current = getRandonBg();
    }
  }, [run]);

  return (
    <View
      style={{
        flexDirection: "row",
        transform: [{ translateX: -frameCount % 512 }],
      }}
    >
      <Image source={img} />
      <Image source={img} />
      <Image source={img} />
    </View>
  );
};
