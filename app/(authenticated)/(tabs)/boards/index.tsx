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
      data={[0, 1, 2]}
      renderItem={({ index }) => {
        if (index === 0)
          return <BigBoardCard boards={boards} header="Favorite" />;
        else if (index === 1)
          return (
            <BigBoardCard
              boards={boards}
              header="Recent"
              containerStyle={{ paddingTop: 20 }}
            />
          );
        else
          return (
            <PersonalBoardCard
              boards={boards}
              header="Personal"
              containerStyle={{ paddingTop: 20 }}
            />
          );
      }}
    />
  );
};

export default Page;
