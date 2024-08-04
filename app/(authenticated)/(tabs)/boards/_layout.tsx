import DropdownPlus from "@/components/DropdownPlus";
import HeaderTitle from "@/components/HeaderTitle";
import { Colors } from "@/constants/Colors";
import { fonts } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { Stack, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Notification, Search } from "react-native-iconly";

const Layout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShadowVisible: true,
          headerTitle: () => <HeaderTitle headerTitle="Boards" />,
        }}
      />
      <Stack.Screen
        name="new-board"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />

      <Stack.Screen
        name="templates"
        options={{
          title: "Start with a template",
          presentation: "fullScreenModal",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: "#E3DFE9",
                borderRadius: 16,
                padding: 6,
              }}>
              <Ionicons name="close" size={18} color={"#716E75"} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};
export default Layout;
