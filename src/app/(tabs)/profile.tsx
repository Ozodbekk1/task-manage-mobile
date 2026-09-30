import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenGradient from "../../../components/screen-gradient";

export default function Profile() {
  return (
    <ScreenGradient>
      <SafeAreaView className="">
        <View>
          <Text>Profile</Text>
        </View>

        <Pressable onPress={() => alert("clicked")}>
          <Text>Restart onboarding</Text>
        </Pressable>
      </SafeAreaView>
    </ScreenGradient>
  );
}
