import DropdownPlus from "@/components/DropdownPlus";
import { Colors } from "@/constants/Colors";
import { fonts } from "@/constants/Fonts";
import { useSupabase } from "@/context/SupabaseContext";
import { Board } from "@/types/enums";
import { MaterialIcons } from "@expo/vector-icons";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import { Link, Stack, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  RefreshControl,
  Image,
} from "react-native";

const Page = () => {
  const { getBoards, getBoardMember } = useSupabase();
  const [boards, setBoards] = useState<Board[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadBoards();
    }, [])
  );

  const loadBoards = async () => {
    const data = await getBoards!();
    const dataWithMemberInfo = await Promise.all(
      data.map(async (item: any) => {
        const memberInfo = await getBoardMember!(item.id);
        return {
          ...item,
          memberInfo,
        };
      })
    );

    setBoards(dataWithMemberInfo);
  };
  const ListItem = ({ item }: { item: Board }) => {
    console.log(`🚀 ~ ListItem ~ item:`, item.background);
    return (
      <Link
        href={`/(authenticated)/board/${item.id}?bg=${encodeURIComponent(
          item.background
        )}`}
        style={{
          borderRadius: 16,
          // backgroundColor: "#FFC6C6",
          backgroundColor: item.background, //"#E6FCFF",
          // borderWidth: 1,
          gap: 10,

          width: 300,
        }}
        key={`${item.id}`}
        asChild>
        <TouchableOpacity style={{ justifyContent: "space-between" }}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            {/* <View
              style={[
                { width: 30, height: 30, borderRadius: 4 },
                { backgroundColor: item.background },
              ]}
            /> */}
            <Text style={{ fontSize: 16 }}>{item.title}</Text>
            <View style={{ flexDirection: "row" }}>
              {[0, 1, 2].map((_, index) => (
                <Image
                  source={{ uri: item.memberInfo[0].avatar_url }}
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
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20,
      }}>
      <Stack.Screen
        options={{
          headerRight: () => <DropdownPlus />,
        }}
      />
      <View
        style={{
          paddingHorizontal: 30,
          paddingVertical: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          // borderWidth: 1,
          alignItems: "center",
        }}>
        <View>
          <Text style={{ fontFamily: fonts.Roboto_500Medium, fontSize: 16 }}>
            Favourite
          </Text>
        </View>
        <TouchableOpacity>
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
          boards.length > 0 && {
            // borderWidth: 1,
            paddingLeft: 30,
            height: WINDOW_HEIGHT * 0.2,
            backgroundColor: "#fff",
          }
        }
        data={boards}
        keyExtractor={(item) => `${item.id}`}
        renderItem={ListItem}
        horizontal
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadBoards} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    borderColor: Colors.grey,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    gap: 10,
  },
  colorBlock: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});

export default Page;
