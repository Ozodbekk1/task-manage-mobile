import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#FFFFFF" },
        headerTintColor: "#171717",
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: "700" },
        contentStyle: { backgroundColor: "#F8FAFC" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Sample stack" }} />
      <Stack.Screen name="[id]" options={{ title: "Lesson" }} />
    </Stack>
  );
}
