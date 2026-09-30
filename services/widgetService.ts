import { ExtensionStorage } from "react-native-widget-extension";

// app.json dagi App Group ID bilan bir xil bo'lishi shart!
const APP_GROUP_ID = "group.com.oziyedu.sampleapp";

export interface WidgetVerseData {
  title: string;
  arabicText: string;
  translation: string;
  surah: string;
  juz?: string;
}

/**
 * React Native ilovasidan Vidjetga ma'lumot yuborish funksiyasi
 */
export const updateHomeScreenWidget = async (data: WidgetVerseData) => {
  try {
    // 1. Ma'lumotni JSON ko'rinishida saqlaymiz
    await ExtensionStorage.setItem(
      "widget_verse_data",
      JSON.stringify(data),
      APP_GROUP_ID,
    );

    // 2. iOS WidgetKit va Android AppWidget ga ekraningni yangila deb buyruq beramiz
    ExtensionStorage.reloadAllTimelines();
    console.log("Vidjet ma'lumotlari yangilandi!");
  } catch (error) {
    console.error("Vidjetni yangilashda xatolik:", error);
  }
};
