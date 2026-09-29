import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView className="flex-1">
      <View>
        <Text>Profile</Text>
      </View>

      <Pressable onPress={() => alert("clicked")}>
        <Text>Restart onboarding</Text>
      </Pressable>
    </SafeAreaView>
  );
}
