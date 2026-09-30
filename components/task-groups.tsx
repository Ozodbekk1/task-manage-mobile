import AsyncStorage from "@react-native-async-storage/async-storage";
import { FolderKanban, Plus, Trash2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export interface TaskGroup {
  id: string;
  name: string;
  taskCount: number;
  color: string;
}

const STORAGE_KEY = "@task_groups_data";

const COLOR_PALETTE = [
  "#6366f1", // Indigo
  "#059669", // Emerald
  "#d97706", // Amber
  "#dc2626", // Red
  "#8b5cf6", // Purple
  "#0284c7", // Sky
];

export default function TaskGroups() {
  const [groups, setGroups] = useState<TaskGroup[]>([]);
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        setGroups(JSON.parse(jsonValue));
      } else {
        const initialData: TaskGroup[] = [
          { id: "1", name: "OziyEdu Frontend", taskCount: 8, color: "#6366f1" },
          { id: "2", name: "Backend Services", taskCount: 4, color: "#059669" },
        ];
        setGroups(initialData);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
      }
    } catch (e) {
      Alert.alert("Xatolik", "Ma'lumotlarni yuklashda xatolik yuz berdi.");
    }
  };

  const handleAddGroup = async () => {
    if (!groupName.trim()) {
      Alert.alert("Diqqat", "Iltimos, guruh nomini kiriting.");
      return;
    }

    const randomColor =
      COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];

    const newGroup: TaskGroup = {
      id: Date.now().toString(),
      name: groupName.trim(),
      taskCount: 0,
      color: randomColor,
    };

    const updatedGroups = [newGroup, ...groups];
    setGroups(updatedGroups);
    setGroupName("");

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGroups));
    } catch (e) {
      Alert.alert("Xatolik", "Guruhni saqlashda xatolik yuz berdi.");
    }
  };

  const handleDeleteGroup = async (id: string) => {
    const updatedGroups = groups.filter((item) => item.id !== id);
    setGroups(updatedGroups);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGroups));
    } catch (e) {
      Alert.alert("Xatolik", "O'chirishda xatolik yuz berdi.");
    }
  };

  return (
    <View className="flex-1 p-4">
      <View className="mb-4 flex-row items-center space-x-2">
        <View className="flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
          <TextInput
            placeholder="Yangi guruh nomi..."
            placeholderTextColor="#9ca3af"
            value={groupName}
            onChangeText={setGroupName}
            className="text-base text-gray-900"
          />
        </View>

        <Pressable
          onPress={handleAddGroup}
          className="h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 ml-3 active:opacity-80"
        >
          <Plus size={22} color="#ffffff" />
        </Pressable>
      </View>

      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View className="mb-3 flex-row items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <View className="flex-row items-center flex-1">
              <View
                className="mr-3 h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <FolderKanban size={22} color={item.color} />
              </View>

              <View className="flex-1 mr-2">
                <Text
                  className="text-base font-semibold text-gray-900"
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                <Text className="text-xs text-gray-500 mt-0.5">
                  {item.taskCount} ta vazifa
                </Text>
              </View>
            </View>

            <Pressable
              onPress={() => handleDeleteGroup(item.id)}
              className="h-9 w-9 items-center justify-center rounded-xl bg-red-50 active:bg-red-100"
            >
              <Trash2 size={18} color="#ef4444" />
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center justify-center py-12">
            <Text className="text-sm font-medium text-gray-400">
              Hozircha hech qanday guruh mavjud emas.
            </Text>
          </View>
        }
      />
    </View>
  );
}
