import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Alert,
} from "react-native";
import React from "react";
import { fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { Board } from "@/types/enums";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
type BigBoardCardType = {
  boards: Board[];
  header?: string;
  containerStyle?: StyleProp<ViewStyle>;
};
const PersonalBoardCard = ({
  boards,
  header,
  containerStyle,
}: BigBoardCardType) => {
  const ListItem = ({ item }: { item: Board }) => {
    return (
      <Link
        // @ts-ignore
        href={`/(authenticated)/board/${item.id}?bg=${encodeURIComponent(
          item.background
        )}`}
        style={{
          borderRadius: 16,
          backgroundColor: item.background,
          // borderWidth: 1,
          overflow: "hidden", // for images
          height: 160,
        }}
        key={`${item.id}`}
        asChild>
        <TouchableOpacity
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}>
          {/* left side */}
          <View style={{ width: "30%" }}>
            <Image
              source={require("@/assets/images/task2.jpg")}
              style={{ width: "100%", height: 160 }}
            />
          </View>
          {/* right side */}
          <View
            style={{
              // borderWidth: 1,
              width: "70%",
              justifyContent: "space-between",
            }}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Text style={{ fontSize: 16 }}>{item.title}</Text>
              <View style={{ flexDirection: "row" }}>
                {[0, 1, 2].map((_, index) => (
                  <Image
                    source={{ uri: item.memberInfo[0].avatar_url }}
                    key={index}
                    style={[
                      {
                        height: 30,
                        width: 30,
                        borderRadius: 50,
                      },
                      index < 2 && { marginRight: -15 },
                    ]}
                  />
                ))}
              </View>
            </View>
            {/* Bottom Section */}
            <View
              style={{
                padding: 10,
              }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  paddingBottom: "10%",
                  paddingLeft: 10,
                }}>
                <MaterialIcons name="people-alt" size={20} color={"#cccccc"} />
                <Text style={{ color: Colors.text_muted }}>Workspaces 1</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  borderTopWidth: StyleSheet.hairlineWidth,
                  borderColor: "#CCCCCC",
                  paddingHorizontal: 10,
                }}>
                <View style={{ width: "50%" }}>
                  <Text style={{ color: Colors.text_muted }}>6 Lsits</Text>
                </View>
                <View
                  style={{
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: "#CCCCCC",
                  }}
                />
                <View style={{ width: "50%", alignItems: "flex-end" }}>
                  <Text style={{ color: Colors.text_muted }}>30 Cards</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };
  return (
    <View style={[containerStyle, { paddingHorizontal: 30 }]}>
      <View
        style={{
          // paddingHorizontal: 10,
          paddingVertical: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          // borderWidth: 1,
          alignItems: "center",
        }}>
        <View>
          <Text style={{ fontFamily: fonts.Roboto_500Medium, fontSize: 16 }}>
            {header}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            Alert.alert("WIP: work in progress");
          }}>
          <Text
            style={{
              fontFamily: fonts.Roboto_500Medium,
              fontSize: 10,
              color: Colors.text_link,
            }}>
            show all
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={
          boards.length > 0 &&
          {
            // borderWidth: 1,
            // paddingHorizontal: 30,
          }
        }
        data={boards}
        keyExtractor={(item) => `${item.id}`}
        renderItem={ListItem}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      />
    </View>
  );
};

export default PersonalBoardCard;
