import type { LucideIcon } from "lucide-react-native";
import { Text, View } from "react-native";

export interface SliderProps {
  title: string;
  project: string;
  icon: LucideIcon;
  slider: number;
  sliderColor: string;
}

export default function ProgressSlider({
  title,
  project,
  icon: Icon,
  slider,
  sliderColor,
}: SliderProps) {
  return (
    <View className="rounded-2xl bg-white p-4">
      <View className="flex-row items-center">
        <View
          className="mr-4 h-11 w-11 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `${sliderColor}20`,
          }}
        >
          <Icon size={22} color={sliderColor} />
        </View>

        <View className="flex-1">
          <Text className="text-base font-semibold text-gray-900">{title}</Text>

          <Text className="mt-1 text-sm text-gray-500">{project}</Text>

          <View className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
            <View
              className="h-full rounded-full"
              style={{
                width: `${slider}%`,
                backgroundColor: sliderColor,
              }}
            />
          </View>
        </View>

        <Text className="ml-3 text-sm font-bold" style={{ color: sliderColor }}>
          {slider}%
        </Text>
      </View>
    </View>
  );
}
