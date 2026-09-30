import { router } from "expo-router";
import { ArrowRight, BookOpen, Clock3, Layers3 } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenGradient from "../../../components/screen-gradient";

const lessons = [
  {
    id: "algebra-basics",
    title: "Algebra basics",
    subtitle: "Linear equations and expressions",
    duration: "12 min",
    color: "#DBEAFE",
    iconColor: "#2563EB",
  },
  {
    id: "reading-strategy",
    title: "Reading strategy",
    subtitle: "Find the author's main idea",
    duration: "18 min",
    color: "#D1FAE5",
    iconColor: "#059669",
  },
  {
    id: "practice-review",
    title: "Practice review",
    subtitle: "Turn mistakes into momentum",
    duration: "10 min",
    color: "#FEF3C7",
    iconColor: "#D97706",
  },
];

export default function SampleStackIndex() {
  return (
    <ScreenGradient>
      <SafeAreaView className="flex-1" edges={["bottom"]}>
        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-6 px-5 pb-10 pt-6"
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text className="text-3xl font-bold text-neutral-950">
              Keep learning
            </Text>
            <Text className="mt-2 text-base leading-6 text-neutral-500">
              A simple stack flow for browsing a lesson and opening its details.
            </Text>
          </View>

          <View className="flex-row items-center rounded-3xl bg-neutral-950 p-5">
            <View className="mr-4 h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Layers3 size={24} color="#FFFFFF" />
            </View>
            <View className="flex-1">
              <Text className="text-xs font-semibold uppercase tracking-widest text-white/60">
                This week
              </Text>
              <Text className="mt-1 text-lg font-bold text-white">
                3 lessons ready
              </Text>
            </View>
            <Text className="text-2xl font-bold text-white">72%</Text>
          </View>

          <View className="gap-3">
            <Text className="text-lg font-bold text-neutral-900">Lessons</Text>
            {lessons.map((lesson) => (
              <Pressable
                key={lesson.id}
                accessibilityRole="button"
                accessibilityLabel={`Open ${lesson.title}`}
                onPress={() => router.push(`/stack/${lesson.id}`)}
                className="flex-row items-center rounded-3xl bg-white p-4 active:opacity-75"
              >
                <View
                  className="mr-4 h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: lesson.color }}
                >
                  <BookOpen size={22} color={lesson.iconColor} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-bold text-neutral-900">
                    {lesson.title}
                  </Text>
                  <Text className="mt-1 text-sm text-neutral-500">
                    {lesson.subtitle}
                  </Text>
                  <View className="mt-2 flex-row items-center gap-1">
                    <Clock3 size={13} color="#737373" />
                    <Text className="text-xs font-medium text-neutral-500">
                      {lesson.duration}
                    </Text>
                  </View>
                </View>
                <ArrowRight size={20} color="#A3A3A3" />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenGradient>
  );
}
