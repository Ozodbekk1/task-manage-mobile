import { router } from "expo-router";
import {
  ArrowRight,
  Bell,
  BookOpen,
  ExternalLink,
  Sparkles,
} from "lucide-react-native";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  updateHomeScreenWidget,
  WidgetVerseData,
} from "../../../services/widgetService";
// import {
//   updateHomeScreenWidget,
//   WidgetVerseData,
// } from "../../services/widgetService";

const CURRENT_VERSE: WidgetVerseData = {
  title: "NUR QUR'ON",
  arabicText:
    "﴿ فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ ﴾",
  translation:
    "«Bas, Meni eslangiz, Men ham sizni eslayman. Va Menga shukr qilingiz va kufr keltirmangiz.»",
  surah: "Al-Baqara · 2:152",
  juz: "2-Juz",
};

export default function Profile() {
  // Vidjetga ma'lumot yuborish
  const handleApplyToWidget = async () => {
    await updateHomeScreenWidget(CURRENT_VERSE);
    Alert.alert(
      "Muvaffaqiyatli!",
      "Ushbu oyat Home Screen va Lock Screen vidjetingizga o'rnatildi.",
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      className="flex-1 bg-gray-50"
      edges={["top"]}
    >
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 100,
        }}
      >
        {/* Header Title */}
        <View className="mb-6 flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-gray-900">Vidjetlar</Text>
            <Text className="text-xs text-gray-500 mt-0.5">
              Asosiy va qulflash ekrani uchun
            </Text>
          </View>

          <Pressable
            onPress={() => router.push("/notify")}
            className="flex-row items-center space-x-1 rounded-xl bg-white px-3 py-2 border border-gray-200/80 shadow-sm"
          >
            <Bell size={16} color="#4f46e5" />
            <Text className="text-xs font-semibold text-gray-700 ml-1">
              Bildirishnomalar
            </Text>
          </Pressable>
        </View>

        {/* ---------------- 1. O'RTACHA VIDJET (4x2) ---------------- */}
        <View className="mb-6">
          <View className="mb-2 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-base font-bold text-gray-900">
                O'rtacha vidjet (4×2)
              </Text>
              <View className="ml-2 rounded-md bg-amber-100 px-2 py-0.5">
                <Text className="text-[10px] font-bold text-amber-800">
                  Ommabop
                </Text>
              </View>
            </View>
            <Text className="text-xs font-medium text-gray-400">
              4 x 2 panjara
            </Text>
          </View>

          {/* Card Wrapper */}
          <View className="rounded-3xl bg-white p-5 shadow-sm border border-gray-200/70">
            <View className="mb-3 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="h-7 w-7 items-center justify-center rounded-lg bg-emerald-900">
                  <BookOpen size={14} color="#ffffff" />
                </View>
                <Text className="text-xs font-bold uppercase tracking-wider text-gray-800 ml-2">
                  {CURRENT_VERSE.title}
                </Text>
                <Text className="text-xs font-bold text-amber-600 ml-2">
                  • Kun oyati
                </Text>
              </View>

              <View className="rounded-full bg-gray-100 px-2.5 py-0.5">
                <Text className="text-[11px] font-medium text-gray-600">
                  Bugun
                </Text>
              </View>
            </View>

            <View className="my-2 items-center px-1">
              <Text className="text-center text-xl font-semibold leading-9 text-gray-900">
                {CURRENT_VERSE.arabicText}
              </Text>
            </View>

            <Text className="mt-2 text-center text-xs font-medium text-gray-600 leading-5">
              {CURRENT_VERSE.translation}
            </Text>

            <View className="mt-5 flex-row items-center justify-between border-t border-gray-100 pt-3">
              <View className="flex-row items-center">
                <Text className="text-xs font-bold text-gray-800">
                  {CURRENT_VERSE.surah}
                </Text>
                <View className="rounded bg-gray-100 px-1.5 py-0.5 ml-2">
                  <Text className="text-[10px] font-medium text-gray-500">
                    {CURRENT_VERSE.juz}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <Text className="text-xs font-semibold text-gray-800 mr-1">
                  Qur'onda ochish
                </Text>
                <ArrowRight size={14} color="#1f2937" />
              </View>
            </View>
          </View>
        </View>

        {/* ---------------- 2. KICHIK VIDJET (2x2) ---------------- */}
        <View className="mb-6">
          <View className="mb-2 flex-row items-center justify-between">
            <Text className="text-base font-bold text-gray-900">
              Kichik vidjet (2×2)
            </Text>
            <Text className="text-xs font-medium text-gray-400">Ixcham</Text>
          </View>

          <View className="rounded-3xl bg-[#0f382c] p-5 shadow-sm min-h-[260px] justify-between">
            <View className="flex-row items-center justify-between">
              <View className="h-8 w-8 items-center justify-center rounded-xl bg-white/10">
                <BookOpen size={18} color="#e5e7eb" />
              </View>
              <Text className="text-[11px] font-bold uppercase tracking-widest text-emerald-200/70">
                OYAT
              </Text>
            </View>

            <View className="my-4 items-center">
              <Text className="text-center text-lg font-bold text-emerald-50 leading-8 mb-2">
                ﴿ فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ﴾
              </Text>
              <Text className="text-center text-xs italic text-emerald-100/80">
                «Albatta, qiyinchilik bilan birga yengillik bordir.»
              </Text>
            </View>

            <View className="flex-row items-center justify-between border-t border-white/10 pt-3">
              <Text className="text-xs font-medium text-emerald-200/80">
                Ash-Sharh · 94:5
              </Text>
              <ExternalLink size={15} color="#a7f3d0" />
            </View>
          </View>
        </View>

        {/* Vidjetni ishga tushirish tugmasi */}
        <Pressable
          onPress={handleApplyToWidget}
          className="flex-row items-center justify-center rounded-2xl bg-indigo-600 py-4 shadow-sm active:bg-indigo-700"
        >
          <Sparkles size={18} color="#ffffff" />
          <Text className="ml-2 text-sm font-bold text-white">
            Ushbu Oyatni Vidjetga O'rnatish
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
