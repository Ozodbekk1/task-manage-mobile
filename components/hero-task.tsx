import { EllipsisIcon } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import Progress from "./progress";

export default function HeroTask() {
  return (
    <View className="rounded-3xl bg-indigo-500 p-6 m-3">
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-semibold text-white">
          Today's Task {"\n"} almost done
        </Text>

        <Pressable className="rounded-xl p-2 bg-white/60">
          <EllipsisIcon size={22} color="white" />
        </Pressable>
      </View>

      <View className="mt-6 flex-row items-center justify-between">
        <View>
          <Text className="text-sm text-indigo-100">
            Keep your streak going!
          </Text>

          <Pressable className="mt-4 self-start rounded-xl bg-white px-5 py-3">
            <Text className="font-semibold text-3xl text-indigo-600">
              View Task
            </Text>
          </Pressable>
        </View>

        <Progress />
      </View>
    </View>
  );
}
