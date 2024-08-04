import { Colors } from "@/constants/Colors";
import { fonts } from "@/constants/Fonts";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Chat, Home } from "react-native-iconly";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTitleStyle: {
          color: "white",
        },
      }}>
      <Tabs.Screen
        name="boards"
        options={{
          headerShown: false,
          title: "Boards",
          headerTitleStyle: {
            fontFamily: fonts.Roboto_700Bold,
            fontSize: 12,
          },
          tabBarIcon: ({ focused }) => (
            <Home
              primaryColor={focused ? "#0065FF" : "#828282"}
              filled={true}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="my-cards"
        options={{
          title: "My Cards",
          tabBarIcon: ({ focused }) => (
            <Chat primaryColor={focused ? "#0065FF" : "#828282"} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="user-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};
export default Layout;
