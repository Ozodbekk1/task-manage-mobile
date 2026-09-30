// app/(other)/notify.tsx
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function NotifyScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white pt-12">
      {/* NativeWind Header Bar */}
      <View className="flex-row items-center px-4 h-12 border-b border-gray-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-1 -ml-1 mr-3 rounded-full active:bg-gray-100"
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>

        <Text className="text-lg font-semibold text-black">Notify</Text>
      </View>

      {/* Screen Content */}
      <View className="p-4">
        <Text className="text-gray-700">Notify Screen Content</Text>
      </View>
    </View>
  );
}
