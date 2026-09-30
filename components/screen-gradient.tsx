import { LinearGradient } from "expo-linear-gradient";
import type { ReactNode } from "react";

export default function ScreenGradient({ children }: { children: ReactNode }) {
  return (
    <LinearGradient
      colors={[
        "#FFFFFF",
        "#F3EEFF",
        "#E8E0FF",
        "#E8F8FF",
        "#EEFFF4",
        "#FFFBE8",
      ]}
      locations={[0, 0.2, 0.4, 0.6, 0.8, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="min-h-screen flex-1"
    >
      {children}
    </LinearGradient>
  );
}
