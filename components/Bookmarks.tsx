import { AudioPlayer, createAudioPlayer } from "expo-audio";
import {
  CheckCircle,
  Download,
  FileText,
  Pause,
  Play,
  Trash2,
  Wifi,
  WifiOff,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  BookmarkItem,
  checkIsOnline,
  downloadBookmarkAudio,
  getLocalBookmarks,
  removeLocalAudio,
} from "../services/bookmarkStorage";

// Sample data
const REMOTE_DATA: BookmarkItem[] = [
  {
    id: "1",
    title: "SAT Reading Strategy - Part 1",
    description:
      "Digital SAT imtihoni uchun reading bo'limi audio qo'llanmasi.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    isDownloaded: false,
  },
  {
    id: "2",
    title: "System Design & Microservices Architecture",
    description: "NestJS va RabbitMQ arxitekturasi bo'yicha audio darslik.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    isDownloaded: false,
  },
];

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  // Player state
  const [activePlayer, setActivePlayer] = useState<AudioPlayer | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  useEffect(() => {
    initData();

    return () => {
      if (activePlayer) {
        activePlayer.pause();
      }
    };
  }, []);

  const initData = async () => {
    setLoading(true);
    const online = await checkIsOnline();
    setIsOnline(online);

    const localItems = await getLocalBookmarks();

    if (online) {
      const merged = REMOTE_DATA.map((remote) => {
        const foundLocal = localItems.find((loc) => loc.id === remote.id);
        return foundLocal ? foundLocal : remote;
      });
      setBookmarks(merged);
    } else {
      setBookmarks(localItems);
    }
    setLoading(false);
  };

  // expo-audio orqali audioni streaming yoki local fayldan o'ynatish
  const handlePlayAudio = async (item: BookmarkItem) => {
    try {
      // Hozirgi ijro etilayotgan audioni to'xtatish
      if (playingId === item.id && activePlayer) {
        activePlayer.pause();
        setPlayingId(null);
        return;
      }

      if (activePlayer) {
        activePlayer.pause();
      }

      if (!isOnline && !item.isDownloaded) {
        Alert.alert(
          "Offlayn rejim",
          "Internet yo'q. Ushbu audioni eshitish uchun avval yuklab olingan bo'lishi kerak.",
        );
        return;
      }

      const sourceUri =
        item.isDownloaded && item.localAudioPath
          ? item.localAudioPath
          : item.audioUrl;

      // expo-audio bilan pleyer yaratamiz
      const player = createAudioPlayer(sourceUri);
      setActivePlayer(player);
      setPlayingId(item.id);
      player.play();
    } catch (error) {
      Alert.alert("Xatolik", "Audioni ijro etishda xatolik yuz berdi.");
    }
  };

  const handleDownload = async (item: BookmarkItem) => {
    if (!isOnline) {
      Alert.alert(
        "Internet yo'q",
        "Faylni yuklab olish uchun internetga ulaning.",
      );
      return;
    }

    try {
      setDownloadingId(item.id);
      setDownloadProgress(0);

      const updatedItem = await downloadBookmarkAudio(item, (progress) => {
        setDownloadProgress(Math.round(progress * 100));
      });

      setBookmarks((prev) =>
        prev.map((b) => (b.id === updatedItem.id ? updatedItem : b)),
      );
    } catch (error) {
      Alert.alert("Xatolik", "Faylni yuklab olishda xatolik yuz berdi.");
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDeleteLocal = async (item: BookmarkItem) => {
    const updated = await removeLocalAudio(item);
    setBookmarks((prev) =>
      prev.map((b) => (b.id === updated.id ? updated : b)),
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <View className="flex-1 px-4 pt-2">
        {/* Header Bar */}
        <View className="mb-4 flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-gray-900">Bookmarks</Text>
            <Text className="text-xs font-medium text-gray-500 mt-0.5">
              Saqlangan audio va darsliklar
            </Text>
          </View>

          <View
            className={`flex-row items-center space-x-1.5 rounded-full px-3 py-1.5 ${
              isOnline ? "bg-emerald-50" : "bg-amber-50"
            }`}
          >
            {isOnline ? (
              <>
                <Wifi size={14} color="#059669" />
                <Text className="text-xs font-semibold text-emerald-700 ml-1">
                  Onlayn
                </Text>
              </>
            ) : (
              <>
                <WifiOff size={14} color="#d97706" />
                <Text className="text-xs font-semibold text-amber-700 ml-1">
                  Offlayn
                </Text>
              </>
            )}
          </View>
        </View>

        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#4f46e5" />
          </View>
        ) : (
          <FlatList
            data={bookmarks}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => {
              const isPlaying = playingId === item.id;
              const isDownloading = downloadingId === item.id;

              return (
                <View className="mb-3.5 rounded-2xl bg-white p-4 shadow-sm border border-gray-200/80">
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1 mr-3">
                      <Text className="text-base font-bold text-gray-900">
                        {item.title}
                      </Text>
                      <Text className="mt-1 text-xs text-gray-600 leading-5">
                        {item.description}
                      </Text>
                    </View>

                    <FileText size={18} color="#9ca3af" />
                  </View>

                  <View className="mt-4 flex-row items-center justify-between border-t border-gray-100 pt-3">
                    <Pressable
                      onPress={() => handlePlayAudio(item)}
                      className={`flex-row items-center rounded-xl px-4 py-2.5 ${
                        isPlaying ? "bg-amber-500" : "bg-indigo-600"
                      } active:opacity-90`}
                    >
                      {isPlaying ? (
                        <Pause size={16} color="#ffffff" />
                      ) : (
                        <Play size={16} color="#ffffff" />
                      )}
                      <Text className="ml-2 text-xs font-semibold text-white">
                        {isPlaying
                          ? "To'xtatish"
                          : item.isDownloaded
                            ? "Tinglash (Offlayn)"
                            : "Striming"}
                      </Text>
                    </Pressable>

                    {isDownloading ? (
                      <View className="flex-row items-center space-x-2">
                        <ActivityIndicator size="small" color="#4f46e5" />
                        <Text className="text-xs font-semibold text-indigo-600">
                          {downloadProgress}%
                        </Text>
                      </View>
                    ) : item.isDownloaded ? (
                      <View className="flex-row items-center space-x-2">
                        <View className="flex-row items-center rounded-lg bg-emerald-50 px-2.5 py-1">
                          <CheckCircle size={14} color="#059669" />
                          <Text className="ml-1 text-xs font-semibold text-emerald-700">
                            Xotirada
                          </Text>
                        </View>
                        <Pressable
                          onPress={() => handleDeleteLocal(item)}
                          className="p-1.5 rounded-lg active:bg-gray-100"
                        >
                          <Trash2 size={16} color="#ef4444" />
                        </Pressable>
                      </View>
                    ) : (
                      <Pressable
                        onPress={() => handleDownload(item)}
                        className="flex-row items-center rounded-xl bg-gray-100 px-3 py-2 active:bg-gray-200"
                      >
                        <Download size={15} color="#374151" />
                        <Text className="ml-1.5 text-xs font-semibold text-gray-700">
                          Yuklash
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              );
            }}
            ListEmptyComponent={
              <View className="items-center justify-center py-16">
                <Text className="text-base font-semibold text-gray-500">
                  Xatcholar mavjud emas
                </Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}
