import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenGradient from "../../../components/screen-gradient";

export default function Search() {
  return (
    <ScreenGradient>
      <SafeAreaView className="">
        <View>
          <Text>Search</Text>
        </View>
      </SafeAreaView>
    </ScreenGradient>
  );
}
