import { router } from "expo-router";
import { BellDot } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function HeaderComponent() {
  const showNotification = () => {
    Toast.show({
      type: "info",
      text1: "Notifications",
      text2: "You don't have any notifications yet.",
      position: "top",
      visibilityTime: 2500,
      topOffset: 60,
    });

    router.push("/notify");
  };

  return (
    <View className="flex-row items-center justify-around rounded-full bg-white/60 p-4 m-2">
      <Image
        source={require("../assets/internal/avatra.png")}
        className="w-16 h-16 rounded-full"
      />

      <Text>
        Hello!{"\n"}
        <Text className="text-xl font-semibold">Ozodbek</Text>
      </Text>

      <Pressable onPress={showNotification}>
        <BellDot size={28} color="#111827" strokeWidth={2} />
      </Pressable>
    </View>
  );
}
