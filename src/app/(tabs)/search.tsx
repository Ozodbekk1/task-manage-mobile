import {
  ArrowUpRight,
  Clock,
  Search as SearchIcon,
  SlidersHorizontal,
  X,
} from "lucide-react-native";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Filtrlash uchun kategoriyalar
const CATEGORIES = ["Barchasi", "Loyiha", "Vazifalar", "Dizayn", "Backend"];

// Mock ma'lumotlar
const INITIAL_RECENT = ["OziyEdu Mobile", "Design System", "Auth API"];

const MOCK_RESULTS = [
  {
    id: "1",
    title: "OziyEdu UI/UX Redesign",
    category: "Dizayn",
    date: "Bugun",
  },
  {
    id: "2",
    title: "Auth Microservice Setup",
    category: "Backend",
    date: "Kechagilar",
  },
  {
    id: "3",
    title: "Task Manager Mobile App",
    category: "Loyiha",
    date: "2 kun oldin",
  },
  {
    id: "4",
    title: "Database Schema Optimization",
    category: "Backend",
    date: "O'tgan hafta",
  },
];

export default function Search() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [recentSearches, setRecentSearches] =
    useState<string[]>(INITIAL_RECENT);

  // Qidiruv va kategoriya bo'yicha filter qilish
  const filteredResults = MOCK_RESULTS.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      selectedCategory === "Barchasi" || item.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  // So'nggi qidiruvlardan o'chirish
  const removeRecent = (itemToRemove: string) => {
    setRecentSearches(recentSearches.filter((item) => item !== itemToRemove));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <View className="flex-1 px-4 pt-2">
        {/* Sarlavha qismi */}
        <View className="mb-4 flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-gray-900">Qidiruv</Text>
            <Text className="text-xs font-medium text-gray-500 mt-0.5">
              Loyiha va vazifalaringizni toping
            </Text>
          </View>

          <Pressable className="h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-gray-200 active:bg-gray-100">
            <SlidersHorizontal size={18} color="#374151" />
          </Pressable>
        </View>

        {/* Search Input Bar */}
        <View className="mb-4 flex-row items-center rounded-2xl bg-white px-4 py-3 shadow-sm border border-gray-200/80">
          <SearchIcon size={20} color="#6b7280" />
          <TextInput
            placeholder="Qidirish uchun yozing..."
            placeholderTextColor="#9ca3af"
            value={query}
            onChangeText={setQuery}
            className="ml-3 flex-1 text-base text-gray-900 font-medium"
          />
          {query.length > 0 && (
            <Pressable
              onPress={() => setQuery("")}
              className="p-1 rounded-full bg-gray-100"
            >
              <X size={16} color="#6b7280" />
            </Pressable>
          )}
        </View>

        {/* Horizontal Categories Filter */}
        <View className="mb-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <Pressable
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-4 py-2.5 border ${
                    isActive
                      ? "bg-gray-900 border-gray-900"
                      : "bg-white border-gray-200"
                  } active:opacity-80`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      isActive ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {cat}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Body Content Logic */}
        {query.length === 0 ? (
          /* Qidiruv bo'sh bo'lganda So'nggi Qidiruvlar */
          <View className="flex-1">
            {recentSearches.length > 0 && (
              <>
                <View className="mb-3 flex-row items-center justify-between">
                  <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    So'nggi qidiruvlar
                  </Text>
                  <Pressable onPress={() => setRecentSearches([])}>
                    <Text className="text-xs font-semibold text-indigo-600">
                      Tozalash
                    </Text>
                  </Pressable>
                </View>

                {recentSearches.map((item) => (
                  <View
                    key={item}
                    className="mb-2.5 flex-row items-center justify-between rounded-2xl bg-white p-3.5 border border-gray-200/60 shadow-sm"
                  >
                    <Pressable
                      onPress={() => setQuery(item)}
                      className="flex-1 flex-row items-center"
                    >
                      <View className="h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                        <Clock size={16} color="#6b7280" />
                      </View>
                      <Text className="ml-3 text-sm font-semibold text-gray-800">
                        {item}
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => removeRecent(item)}
                      className="p-1.5 rounded-lg active:bg-gray-100"
                    >
                      <X size={16} color="#9ca3af" />
                    </Pressable>
                  </View>
                ))}
              </>
            )}
          </View>
        ) : (
          /* Qidiruv Natijalari Ro'yxati */
          <FlatList
            data={filteredResults}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => (
              <Pressable className="mb-3 flex-row items-center justify-between rounded-2xl bg-white p-4 shadow-sm border border-gray-200/70 active:bg-gray-50">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-900">
                    {item.title}
                  </Text>
                  <View className="mt-1.5 flex-row items-center space-x-2">
                    <View className="rounded-md bg-gray-100 px-2 py-0.5">
                      <Text className="text-xs font-medium text-gray-600">
                        {item.category}
                      </Text>
                    </View>
                    <Text className="text-xs text-gray-400">• {item.date}</Text>
                  </View>
                </View>
                <View className="h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                  <ArrowUpRight size={18} color="#4b5563" />
                </View>
              </Pressable>
            )}
            ListEmptyComponent={
              <View className="items-center justify-center py-16">
                <Text className="text-base font-semibold text-gray-500">
                  Natija topilmadi
                </Text>
                <Text className="text-xs text-gray-400 mt-1">
                  Boshqa kalit so'z bilan qidirib ko'ring
                </Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}
