import BigBoardCard from "@/components/Board/BigBoardCard";
import { useSupabase } from "@/context/SupabaseContext";
import { Board } from "@/types/enums";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";

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
      <BigBoardCard
        boards={boards}
        header="Recent"
        containerStyle={{ paddingTop: 20 }}
      />
    </View>
  );
};

export default Page;
