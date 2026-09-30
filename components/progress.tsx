import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default function Progress() {
  return (
    <View className="items-center justify-center">
      <PieChart
        donut
        radius={50}
        innerRadius={40}
        data={[
          {
            value: 85,
            color: "#3B82F6",
          },
          {
            value: 25,
            color: "#E5E7EB",
          },
        ]}
        centerLabelComponent={() => (
          <View className="items-center justify-center">
            <Text className="text-2xl font-bold text-blue-500">85%</Text>
          </View>
        )}
      />
    </View>
  );
}
