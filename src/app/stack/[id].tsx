import { router, Stack, useLocalSearchParams } from "expo-router";
import { Check, CirclePlay, Sparkles } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenGradient from "../../../components/screen-gradient";

const lessonContent: Record<
  string,
  { title: string; eyebrow: string; intro: string; points: string[] }
> = {
  "algebra-basics": {
    title: "Algebra basics",
    eyebrow: "SAT Math",
    intro:
      "Build a reliable method for solving linear equations without losing the small details.",
    points: [
      "Isolate the variable one step at a time",
      "Keep both sides of the equation balanced",
      "Check your answer in the original equation",
    ],
  },
  "reading-strategy": {
    title: "Reading strategy",
    eyebrow: "SAT Reading & Writing",
    intro:
      "A focused reading pass helps you find the author's main idea before the distractors get loud.",
    points: [
      "Read for the argument, not every detail",
      "Underline the shift in the author's position",
      "Choose the answer that matches the whole passage",
    ],
  },
  "practice-review": {
    title: "Practice review",
    eyebrow: "Mistake Bank",
    intro:
      "Reviewing an error is a short feedback loop: name what happened, then make the next attempt easier.",
    points: [
      "Name the exact step where you got stuck",
      "Write the correct rule in your own words",
      "Try a fresh question before moving on",
    ],
  },
};

export default function LessonDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = lessonContent[id] ?? lessonContent["algebra-basics"];

  return (
    <ScreenGradient>
      <Stack.Screen options={{ title: lesson.title }} />
      <SafeAreaView className="flex-1" edges={["bottom"]}>
        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-6 px-5 pb-10 pt-6"
          showsVerticalScrollIndicator={false}
        >
          <View className="rounded-[28px] bg-neutral-950 p-6">
            <View className="mb-8 h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Sparkles size={23} color="#FFFFFF" />
            </View>
            <Text className="text-xs font-semibold uppercase tracking-widest text-white/60">
              {lesson.eyebrow}
            </Text>
            <Text className="mt-2 text-3xl font-bold text-white">
              {lesson.title}
            </Text>
            <Text className="mt-3 text-base leading-6 text-white/70">
              {lesson.intro}
            </Text>
          </View>

          <View className="gap-4 rounded-3xl bg-white p-5">
            <Text className="text-lg font-bold text-neutral-900">
              Focus points
            </Text>
            {lesson.points.map((point) => (
              <View key={point} className="flex-row items-start gap-3">
                <View className="mt-0.5 h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                  <Check size={15} color="#059669" strokeWidth={3} />
                </View>
                <Text className="flex-1 text-base leading-6 text-neutral-600">
                  {point}
                </Text>
              </View>
            ))}
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            className="h-14 flex-row items-center justify-center gap-2 rounded-2xl bg-blue-600 active:opacity-80"
          >
            <CirclePlay size={20} color="#FFFFFF" />
            <Text className="text-base font-bold text-white">Start lesson</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </ScreenGradient>
  );
}
