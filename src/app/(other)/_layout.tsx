import { Stack } from "expo-router";

export default function OtherLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="notify"
        options={{
          title: "Notify",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
