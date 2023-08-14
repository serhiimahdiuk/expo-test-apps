import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

interface RadiioButtonProps {
  title?: string;
  checked?: boolean;
  onPress: () => void;
}

export const RadioButton = ({ title, checked, onPress }: RadiioButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <View
          style={{
            height: 30,
            width: 30,
            borderRadius: 15,
            borderColor: "#537188",
            borderWidth: 3,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          {checked && (
            <View
              style={{
                height: 18,
                width: 18,
                borderRadius: 9,
                backgroundColor: "#537188",
              }}
            />
          )}
        </View>
        <Text style={{ fontSize: 20 }}>{title}</Text>
      </View>
    </Pressable>
  );
};

interface RadioButtonGroupProps {
  data: {
    value: string;
    title: string;
  }[];
  value: string;
  onChange: (value: string) => void;
}

export default ({ data, onChange, value }: RadioButtonGroupProps) => {
  const [usedOption, setUsedOption] = useState(value ?? data[0].value);

  useEffect(() => {
    onChange(usedOption);
  }, [usedOption]);

  return (
    <>
      {data.map((i) => (
        <RadioButton
          key={i.value}
          title={i.title}
          onPress={() => setUsedOption(i.value)}
          checked={usedOption === i.value}
        />
      ))}
    </>
  );
};
