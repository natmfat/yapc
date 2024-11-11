import { Outlet } from "@remix-run/react";
import { View } from "natmfat/components/View";
import { Header } from "./components/Header";

export default function AppLayout() {
  return (
    <View className="max-w-5xl w-full mx-auto px-6">
      <Header
        user={{
          avatar_url: "https://natmfat.com/logo.png",
          username: "natmfat",
        }}
      />

      <View className="gap-4">
        <Outlet />
      </View>

      <footer></footer>
    </View>
  );
}
