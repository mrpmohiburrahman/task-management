import BigBoardCard from "@/components/Board/BigBoardCard";
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20,
      }}>
      {/* <Stack.Screen
        options={{
          headerRight: () => <DropdownPlus />,
        }}
      /> */}
      <BigBoardCard boards={boards} header="Favorite" />
    </View>
  );
};

export default Page;
