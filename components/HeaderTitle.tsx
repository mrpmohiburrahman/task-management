import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { fonts } from "@/constants/Fonts";
import { Notification, Search } from "react-native-iconly";
import { Colors } from "@/constants/Colors";
type HeaderTitleTypes = {
  headerTitle?: string;
};
const HeaderTitle = ({ headerTitle }: HeaderTitleTypes) => {
  return (
    <View
      style={{
        // flex: 1,
        width: WINDOW_WIDTH - 40,
        // borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={{
            width: 40,
            height: 40,
            resizeMode: "contain",
            transform: [{ rotate: "180deg" }],
          }}
          source={require("@/assets/images/task-management-blue.png")}
        />
        <Text
          style={{
            fontWeight: "500",
            fontFamily: fonts.Roboto_500Medium,
          }}>
          {headerTitle}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          // borderWidth: 1,
        }}>
        <TouchableOpacity
          style={
            {
              // borderWidth: 1
            }
          }>
          <Search primaryColor={Colors.grey} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={
            {
              // borderWidth: 1
            }
          }>
          <Notification primaryColor={Colors.grey} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderTitle;
