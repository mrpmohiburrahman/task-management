import HeaderTitle from "@/components/HeaderTitle";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

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
