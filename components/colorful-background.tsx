import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

export default function ColorfulBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View className="flex-1 overflow-hidden bg-white">
      <View
        className="absolute h-[220px] w-[220px] rounded-full"
        style={[
          styles.blob,
          {
            backgroundColor: "#7C46F0",
            top: -80,
            left: -60,
          },
        ]}
      />

      <LinearGradient
        colors={["#5F27FF", "#CAB8FF"]}
        className="absolute h-[260px] w-[260px] rounded-full"
        style={[
          styles.blob,
          {
            top: 100,
            right: -100,
          },
        ]}
      />

      <View
        className="absolute h-[220px] w-[220px] rounded-full"
        style={[
          styles.blob,
          {
            backgroundColor: "#46BDF0",
            top: 350,
            left: -100,
          },
        ]}
      />

      <View
        className="absolute h-[220px] w-[220px] rounded-full"
        style={[
          styles.blob,
          {
            backgroundColor: "#46F080",
            bottom: 200,
            right: -100,
          },
        ]}
      />

      <View
        className="absolute h-[180px] w-[180px] rounded-full"
        style={[
          styles.blob,
          {
            backgroundColor: "#EDF046",
            bottom: 50,
            left: 50,
          },
        ]}
      />

      <View
        className="absolute h-[180px] w-[180px] rounded-full"
        style={[
          styles.blob,
          {
            backgroundColor: "#F0B646",
            top: 500,
            right: 40,
          },
        ]}
      />

      <View className="flex-1">{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  blob: {
    opacity: 0.8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 150,
  },
});
