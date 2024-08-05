import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const FloatingButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{
        borderRadius: 50,
        width: 60,
        height: 60,
        backgroundColor: "#0065FF",
        position: "absolute",
        bottom: 50,
        right: 40,
        zIndex: 40,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => {
        // @ts-ignore
        router.push("(authenticated)/(tabs)/boards/new-board");
      }}>
      <Ionicons name="add" size={40} color={"#FFF"} />
    </TouchableOpacity>
  );
};

export default FloatingButton;
