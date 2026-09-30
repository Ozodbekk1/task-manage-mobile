import { useRouter } from "expo-router";
import type { LucideIcon } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export interface TaskItem {
  id: string;
  title: string;
  project: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  icon: LucideIcon;
  progress: number;
  color: string;
}

interface TaskCardProps {
  task: TaskItem;
}

export default function TaskCard({ task }: TaskCardProps) {
  const router = useRouter();
  const { id, title, project, icon: Icon, progress, color, priority } = task;

  return (
    <Pressable
      onPress={() => router.push(`/${id}`)}
      className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100 active:opacity-90"
    >
      <View className="flex-row items-center">
        <View
          className="mr-4 h-11 w-11 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon size={22} color={color} />
        </View>

        <View className="flex-1">
          <View className="flex-row items-center justify-between mr-2">
            <Text
              className="text-base font-semibold text-gray-900"
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>

          <Text className="mt-0.5 text-sm text-gray-500">{project}</Text>

          {/* Progress Bar */}
          <View className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
            <View
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                backgroundColor: color,
              }}
            />
          </View>
        </View>

        <View className="ml-3 items-end">
          <Text className="text-sm font-bold" style={{ color }}>
            {progress}%
          </Text>
          <View className="mt-2 rounded-md bg-gray-100 px-2 py-0.5">
            <Text className="text-xs font-medium text-gray-600">
              {priority}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
