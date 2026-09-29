import { Tabs } from "expo-router";
import { Bookmark, Home, Search, User } from "lucide-react-native";
import { Platform } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#111111",
        tabBarInactiveTintColor: "#9A9A9A",

        tabBarStyle: {
          position: "absolute",

          left: 16,
          right: 16,
          bottom: Platform.OS === "ios" ? 18 : 16,

          height: 68,

          backgroundColor: "#FFFFFF",

          borderRadius: 24,
          borderTopWidth: 0,

          paddingHorizontal: 8,
          paddingTop: 8,
          paddingBottom: 8,

          // iOS
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.08,
          shadowRadius: 20,

          // Android
          elevation: 8,
        },

        tabBarItemStyle: {
          borderRadius: 18,
          marginHorizontal: 2,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 2,
        },

        tabBarIconStyle: {
          marginTop: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({ color, focused }) => (
            <Home
              size={focused ? 23 : 22}
              color={color}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",

          tabBarIcon: ({ color, focused }) => (
            <Search
              size={focused ? 23 : 22}
              color={color}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="bookmarks"
        options={{
          title: "Bookmarks",

          tabBarIcon: ({ color, focused }) => (
            <Bookmark
              size={focused ? 23 : 22}
              color={color}
              strokeWidth={focused ? 2.5 : 2}
              fill={focused ? color : "transparent"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          tabBarIcon: ({ color, focused }) => (
            <User
              size={focused ? 23 : 22}
              color={color}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
    </Tabs>
  );
}
