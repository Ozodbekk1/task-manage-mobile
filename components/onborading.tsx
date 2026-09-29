import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ONBOARDING_STORAGE_KEY } from "../src/constants/storage";

export default function OnboardingComponent() {
  const [checking, setChecking] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const checkOnboarding = async () => {
        const isCompleted = await AsyncStorage.getItem(ONBOARDING_STORAGE_KEY);

        if (isCompleted === "true") {
          router.replace("/(tabs)");
          return;
        }

        if (active) {
          setChecking(false);
        }
      };

      checkOnboarding();

      return () => {
        active = false;
      };
    }, []),
  );

  const handleGetStarted = async () => {
    await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, "true");

    router.replace("/(tabs)");
  };

  if (checking) {
    return null;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 px-6">
          <View className="flex-1 items-center justify-center">
            <View className="mb-8 h-28 w-28 items-center justify-center rounded-[32px] bg-neutral-100">
              <Text className="text-5xl">☪️</Text>
            </View>

            <Text className="text-center text-4xl font-bold tracking-tight text-neutral-950">
              Read. Listen.
              {"\n"}
              Reflect.
            </Text>

            <Text className="mt-5 max-w-[320px] text-center text-base leading-6 text-neutral-500">
              A simple and peaceful way to read the Quran, listen to
              recitations, and keep your daily connection.
            </Text>
          </View>

          <View className="pb-4">
            <Pressable
              onPress={handleGetStarted}
              className="h-14 items-center justify-center rounded-2xl bg-neutral-950 active:opacity-80"
            >
              <Text className="text-base font-semibold text-white">
                Get Started
              </Text>
            </Pressable>

            <Text className="mt-4 text-center text-xs text-neutral-400">
              Your journey starts here
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
