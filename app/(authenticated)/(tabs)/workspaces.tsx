import BigBoardCard from "@/components/Board/BigBoardCard";
import PersonalBoardCard from "@/components/Board/PersonalBoardCard";
import { useSupabase } from "@/context/SupabaseContext";
import { Board } from "@/types/enums";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";

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
    <FlatList
      contentContainerStyle={{
        backgroundColor: "#fff",
        paddingBottom: 40,
      }}
      data={[
        { worskspaceName: "Worskspace 1" },
        { worskspaceName: "Worskspace 2" },
        { worskspaceName: "Worskspace 3" },
      ]}
      ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
      renderItem={({ item, index }) => {
        return <BigBoardCard boards={boards} header={item.worskspaceName} />;
      }}
    />
  );
};

export default Page;
