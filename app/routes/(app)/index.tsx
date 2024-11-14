import { Outlet } from "@remix-run/react";
import { View } from "natmfat/components/View";
import { Header } from "./components/Header";
import { authenticator } from "~/services/auth.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { UserStoreProvider } from "./hooks/useUserStore";
import { UserData } from "~/.server/database/client";

export async function loader({ request }: LoaderFunctionArgs) {
  const userSession = await authenticator.isAuthenticated(request);
  return null;
  // return { userSession: userSession ? publicUser(userSession) : null };
}

export default function AppLayout() {
  return (
    <UserStoreProvider session={null} sessionRoles={[]}>
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

        <footer className="h-20"></footer>
      </View>
    </UserStoreProvider>
  );
}
