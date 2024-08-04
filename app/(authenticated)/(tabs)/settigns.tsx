import { Colors } from "@/constants/Colors";
import { fonts } from "@/constants/Fonts";
import { useAuth } from "@clerk/clerk-expo";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

const Page = () => {
  const { signOut } = useAuth();

  const themeData = [
    {
      title: "Choose theme",
      onPress: () => {
        Alert.alert("WIP: work in progress");
      },
    },
  ];
  const notificationsData = [
    {
      title: "Open system settings",
      onPress: () => {
        Alert.alert("WIP: work in progress");
      },
    },
  ];
  const settingsData = [
    {
      title: "Privacy Policy",
      onPress: () => {
        Alert.alert("WIP: work in progress");
      },
    },
    {
      title: "Help",
      onPress: () => {
        Alert.alert("WIP: work in progress");
      },
    },
    {
      title: "Log Out",
      onPress: () => {
        signOut();
      },
    },
  ];
  const syncData = [
    {
      title: "Offline boards",
      onPress: () => {
        Alert.alert("WIP: work in progress");
      },
    },
    {
      title: "Sync queue",
      onPress: () => {
        Alert.alert("WIP: work in progress");
      },
    },
  ];

  const SettingsListItem = ({
    data,
    listTitle,
  }: {
    data: { onPress: () => void; title: string }[];
    listTitle?: string;
  }) => {
    return (
      <FlatList
        data={data}
        contentContainerStyle={
          {
            // borderWidth: 1,
            // flexGrow: 1,
            // flex: 1,
          }
        }
        ListHeaderComponent={() => (
          <Text
            style={{
              color: Colors.text_muted,
              fontFamily: fonts.Roboto_400Regular,
              fontSize: 12,
            }}>
            {listTitle}
          </Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={item.onPress}
            style={{
              height: 40,
              justifyContent: "center",
            }}>
            <Text
              style={{
                fontFamily: fonts.Roboto_400Regular,
                fontSize: 16,
              }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => `${item.title}-${index}`}
      />
    );
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        paddingHorizontal: 20,
      }}>
      <View style={{ flexGrow: 1 }}>
        {/* <SettingsListItem data={notificationsData} listTitle="Notifications" /> */}
        {/* <SettingsListItem data={themeData} listTitle="Theme" /> */}
        {/* <SettingsListItem data={syncData} listTitle="Sync" /> */}
        <View style={{ paddingTop: 40 }} />
        <SettingsListItem data={settingsData} listTitle="General" />
      </View>
      <View style={{ flexGrow: 1 }} />
    </View>
  );
};

export default Page;
