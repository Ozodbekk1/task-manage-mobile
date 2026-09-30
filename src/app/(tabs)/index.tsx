import {
  BookOpen,
  Brain,
  Calculator,
  CheckCircle,
  Target,
} from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import HeaderComponent from "../../../components/header";
import HeaderComponent from "../../../components/header";
import HeroTask from "../../../components/hero-task";
import ProgressSlider, {
  SliderProps,
} from "../../../components/progress-slider";
import ScreenGradient from "../../../components/screen-gradient";
import TaskGroups from "../../../components/task-groups";

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
      <ScrollView>
        <SafeAreaView className="flex-1">
          <HeaderComponent />

          <HeroTask />

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
        </SafeAreaView>
      </ScrollView>
    </ScreenGradient>
  );
}
