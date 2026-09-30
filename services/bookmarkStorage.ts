import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import * as FileSystem from "expo-file-system";

export interface BookmarkItem {
  id: string;
  title: string;
  description: string;
  audioUrl: string; // Masofaviy URL
  localAudioPath?: string; // Qurilmadagi mahalliy fayl yo'li
  isDownloaded: boolean;
}

const BOOKMARKS_META_KEY = "@bookmarks_metadata";

// 1. Tarmoq bor-yo'qligini tekshirish
export const checkIsOnline = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  return state.isConnected ?? false;
};

// 2. Mahalliy saqlangan xatcholar ro'yxatini olish
export const getLocalBookmarks = async (): Promise<BookmarkItem[]> => {
  try {
    const json = await AsyncStorage.getItem(BOOKMARKS_META_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error("Xatcholarni o'qishda xatolik:", error);
    return [];
  }
};

// 3. Audio va Matn faylini telefon xotirasiga to'liq yuklab olish (Offlayn uchun)
export const downloadBookmarkAudio = async (
  item: BookmarkItem,
  onProgress?: (progress: number) => void,
): Promise<BookmarkItem> => {
  const fileExtension = item.audioUrl.split(".").pop() || "mp3";
  const localUri = `${FileSystem.documentDirectory}audio_${item.id}.${fileExtension}`;

  // Progress bilan yuklab olish
  const downloadResumable = FileSystem.createDownloadResumable(
    item.audioUrl,
    localUri,
    {},
    (downloadProgress) => {
      const progress =
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite;
      if (onProgress) onProgress(progress);
    },
  );

  const result = await downloadResumable.downloadAsync();

  const updatedItem: BookmarkItem = {
    ...item,
    localAudioPath: result?.uri || localUri,
    isDownloaded: true,
  };

  // Metama'lumotlarni yangilash va AsyncStorage'ga saqlash
  const currentBookmarks = await getLocalBookmarks();
  const index = currentBookmarks.findIndex((b) => b.id === item.id);

  if (index >= 0) {
    currentBookmarks[index] = updatedItem;
  } else {
    currentBookmarks.push(updatedItem);
  }

  await AsyncStorage.setItem(
    BOOKMARKS_META_KEY,
    JSON.stringify(currentBookmarks),
  );
  return updatedItem;
};

// 4. Mahalliy yuklab olingan audio faylni o'chirish
export const removeLocalAudio = async (
  item: BookmarkItem,
): Promise<BookmarkItem> => {
  if (item.localAudioPath) {
    await FileSystem.deleteAsync(item.localAudioPath, { idempotent: true });
  }

  const updatedItem: BookmarkItem = {
    ...item,
    localAudioPath: undefined,
    isDownloaded: false,
  };

  const currentBookmarks = await getLocalBookmarks();
  const updatedList = currentBookmarks.map((b) =>
    b.id === item.id ? updatedItem : b,
  );
  await AsyncStorage.setItem(BOOKMARKS_META_KEY, JSON.stringify(updatedList));

  return updatedItem;
};
