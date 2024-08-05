import { LogBox } from "react-native";

// Ignore all logs
LogBox.ignoreAllLogs();
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { Colors } from "@/constants/Colors";
import { SupabaseProvider } from "@/context/SupabaseContext";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";

const CLERK_PUBLISHABLE_KEY = process.env
  .EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const InitialLayout = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "(authenticated)";

    if (isSignedIn && !inAuthGroup) {
      router.replace("/(authenticated)/(tabs)/boards");
    } else if (!isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn]);

  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

  // if (!fontsLoaded) {
  //   return null;
  // }
  if (!isLoaded && !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SupabaseProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
      </Stack>
    </SupabaseProvider>
  );
};

const RootLayoutNav = () => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}>
      <StatusBar style="light" />
      <ActionSheetProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <InitialLayout />
        </GestureHandlerRootView>
      </ActionSheetProvider>
    </ClerkProvider>
  );
};
export default RootLayoutNav;
