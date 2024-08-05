import RoundButtonGradient from "@/components/ButtonGradient";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

const FloatingButton = () => {
  const router = useRouter();
  return (
    <View
      style={{
        position: "absolute",
        bottom: 50,
        right: 40,
        zIndex: 40,
      }}>
      <RoundButtonGradient
        size={80}
        onPress={() => {
          // @ts-ignore
          router.push("(authenticated)/(tabs)/boards/new-board");
        }}
      />
    </View>
  );
};

export default FloatingButton;
