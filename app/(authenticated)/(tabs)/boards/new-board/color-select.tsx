import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, TouchableOpacity } from "react-native";

const COLORS = [
  "#987D9A",
  "#FFC96F",
  "#BFF6C3",
  "#FFC6C6",
  "#89609e",
  "#cd5a91",
  "#4bbf6b",
  "#AAD7D9",
  "#BED7DC",
];
export const DEFAULT_COLOR = COLORS[0];

const Page = () => {
  const [selected, setSelected] = useState<string>(DEFAULT_COLOR);
  const router = useRouter();

  const onColorSelect = (color: string) => {
    setSelected(color);
    router.setParams({ bg: color });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        flexGrow: 1,
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
      {COLORS.map((color) => (
        <TouchableOpacity
          key={color}
          style={{
            backgroundColor: color,
            height: 100,
            width: 100,
            margin: 5,
            borderRadius: 4,
            borderWidth: selected === color ? 1 : 0,
            borderColor: Colors.fontDark,
          }}
          onPress={() => onColorSelect(color)}
        />
      ))}
    </View>
  );
};
export default Page;
