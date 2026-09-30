import { useLocalSearchParams, useRouter } from "expo-router";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  FolderKanban,
} from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TaskDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Mock task data (replace with state or API fetch using `id`)
  const task = {
    id: id || "1",
    title: "Redesign Mobile Dashboard",
    project: "OziyEdu Mobile",
    description:
      "Implement the updated design system for the core mobile dashboard. Clean up navigation headers and standardize component styles across screen transitions.",
    dueDate: "Oct 12, 2026",
    priority: "High",
    status: "In Progress",
    progress: 75,
    color: "#6366f1",
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      {/* Custom Header Bar */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full active:bg-gray-100"
        >
          <ChevronLeft size={24} color="#0f172a" />
        </Pressable>

        <Text className="text-lg font-semibold text-gray-900">
          Task Details
        </Text>

        <View className="h-10 w-10" />
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* Top Info Card */}
        <View className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-2">
              <FolderKanban size={16} color="#64748b" />
              <Text className="text-sm font-medium text-gray-500 ml-1.5">
                {task.project}
              </Text>
            </View>

            <View
              className="rounded-full px-3 py-1"
              style={{ backgroundColor: `${task.color}15` }}
            >
              <Text
                className="text-xs font-semibold"
                style={{ color: task.color }}
              >
                {task.status}
              </Text>
            </View>
          </View>

          <Text className="mt-3 text-xl font-bold text-gray-900">
            {task.title}
          </Text>

          {/* Progress Slider Bar */}
          <View className="mt-5">
            <View className="flex-row justify-between mb-2">
              <Text className="text-xs font-medium text-gray-500">
                Completion
              </Text>
              <Text className="text-xs font-bold" style={{ color: task.color }}>
                {task.progress}%
              </Text>
            </View>
            <View className="h-2.5 overflow-hidden rounded-full bg-gray-100">
              <View
                className="h-full rounded-full"
                style={{
                  width: `${task.progress}%`,
                  backgroundColor: task.color,
                }}
              />
            </View>
          </View>
        </View>

        {/* Key Attributes Meta Grid */}
        <View className="mt-4 flex-row space-x-3">
          <View className="flex-1 rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
            <View className="flex-row items-center mb-1">
              <Calendar size={16} color="#64748b" />
              <Text className="ml-2 text-xs font-medium text-gray-400">
                Due Date
              </Text>
            </View>
            <Text className="text-sm font-semibold text-gray-800">
              {task.dueDate}
            </Text>
          </View>

          <View className="flex-1 rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
            <View className="flex-row items-center mb-1">
              <AlertCircle size={16} color="#64748b" />
              <Text className="ml-2 text-xs font-medium text-gray-400">
                Priority
              </Text>
            </View>
            <Text className="text-sm font-semibold text-gray-800">
              {task.priority}
            </Text>
          </View>
        </View>

        {/* Task Description */}
        <View className="mt-4 rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
          <Text className="text-base font-semibold text-gray-900">
            Description
          </Text>
          <Text className="mt-2 leading-6 text-sm text-gray-600">
            {task.description}
          </Text>
        </View>

        {/* Mark Complete Action Button */}
        <Pressable
          className="mt-6 mb-8 flex-row items-center justify-center rounded-xl p-4 active:opacity-90"
          style={{ backgroundColor: task.color }}
        >
          <CheckCircle2 size={20} color="#fff" />
          <Text className="ml-2 text-base font-semibold text-white">
            Mark as Completed
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
