import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const Layout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: {
            // backgroundColor: Colors.primary,
          },
          // headerTitle: () => (
          //   <Image
          //     style={{ width: 120, height: 50, resizeMode: "contain" }}
          //     source={require("@/assets/images/trello-logo-gradient-white.png")}
          //   />
          // ),
          headerShadowVisible: true,

          headerTitle: () => (
            <View
              style={{
                flex: 1,
                // borderWidth: 1
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
                <Text style={{ fontWeight: "500" }}>Boards</Text>
              </View>
            </View>
          ),
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
