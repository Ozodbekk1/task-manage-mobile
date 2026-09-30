// src/app/(tabs)/bookmarks.tsx
import { View } from "react-native";
import BookmarksComponent from "../../../components/Bookmarks";

export default function BookmarksRoute() {
  return (
    <View style={{ flex: 1 }} className="flex-1 bg-gray-50">
      <BookmarksComponent />
    </View>
  );
}
