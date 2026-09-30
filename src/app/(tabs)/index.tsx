import { router } from "expo-router";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Calculator,
  CheckCircle,
  CheckSquare,
  Target,
} from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import HeaderComponent from "../../../components/header";
import HeaderComponent from "../../../components/header";
import HeroTask from "../../../components/hero-task";
import ProgressSlider, {
  SliderProps,
} from "../../../components/progress-slider";
import ScreenGradient from "../../../components/screen-gradient";
import TaskGroups from "../../../components/task-groups";
import TaskCard from "../../../components/TaskCard";

const mockSliders: SliderProps[] = [
  {
    title: "Complete 20 questions",
    project: "SAT Math",
    icon: Calculator,
    slider: 75,
    sliderColor: "#3B82F6",
  },
  {
    title: "Reading practice",
    project: "SAT Reading & Writing",
    icon: BookOpen,
    slider: 60,
    sliderColor: "#8B5CF6",
  },
  {
    title: "Master Algebra",
    project: "SAT Math",
    icon: Brain,
    slider: 45,
    sliderColor: "#10B981",
  },
  {
    title: "Finish 5 practice tests",
    project: "SAT Preparation",
    icon: Target,
    slider: 80,
    sliderColor: "#F59E0B",
  },
  {
    title: "Review mistakes",
    project: "Mistake Bank",
    icon: CheckCircle,
    slider: 90,
    sliderColor: "#EF4444",
  },
];

export default function Home() {
  return (
    <ScreenGradient>
      <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
        <SafeAreaView className="flex-1">
          <HeaderComponent />

          <HeroTask />

          <Pressable
            onPress={() => router.push("/stack")}
            className="mx-5 flex-row items-center rounded-3xl bg-neutral-950 p-5 active:opacity-80"
          >
            <View className="flex-1">
              <Text className="text-xs font-semibold uppercase tracking-widest text-white/60">
                Sample navigation
              </Text>
              <Text className="mt-1 text-lg font-bold text-white">
                Browse lesson stack
              </Text>
            </View>
            <ArrowRight size={22} color="#FFFFFF" />
          </Pressable>

          <View className="mt-6 px-5">
            <Text className="mb-4 text-3xl font-bold text-gray-900">
              In Progress
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="gap-4 px-5"
            >
              {mockSliders.map((item, index) => (
                <View key={index} className="w-80">
                  <ProgressSlider {...item} />
                </View>
              ))}
            </ScrollView>
          </View>
          <TaskGroups />

          <View className="m-2 gap-3 ">
            <TaskCard
              task={{
                id: "task-101",
                title: "Setup Auth API Flow",
                project: "Backend Microservices",
                description:
                  "Build JWT authentication routes and refresh token logic.",
                dueDate: "Oct 05, 2026",
                priority: "High",
                icon: CheckSquare,
                progress: 60,
                color: "#059669",
              }}
            />

            <TaskCard
              task={{
                id: "task-101",
                title: "Setup Auth API Flow",
                project: "Backend Microservices",
                description:
                  "Build JWT authentication routes and refresh token logic.",
                dueDate: "Oct 05, 2026",
                priority: "High",
                icon: CheckSquare,
                progress: 60,
                color: "#059669",
              }}
            />

            <TaskCard
              task={{
                id: "task-101",
                title: "Setup Auth API Flow",
                project: "Backend Microservices",
                description:
                  "Build JWT authentication routes and refresh token logic.",
                dueDate: "Oct 05, 2026",
                priority: "High",
                icon: CheckSquare,
                progress: 60,
                color: "#059669",
              }}
            />

            <TaskCard
              task={{
                id: "task-101",
                title: "Setup Auth API Flow",
                project: "Backend Microservices",
                description:
                  "Build JWT authentication routes and refresh token logic.",
                dueDate: "Oct 05, 2026",
                priority: "High",
                icon: CheckSquare,
                progress: 60,
                color: "#059669",
              }}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </ScreenGradient>
  );
}
