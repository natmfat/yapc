import { Outlet, useLoaderData } from "@remix-run/react";
import { View } from "natmfat/components/View";
import { Header } from "./components/Header";
import { authenticator } from "~/services/auth.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { SessionStoreProvider } from "./hooks/useSessionStore";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await authenticator.isAuthenticated(request);
  return { session };
}

export default function AppLayout() {
  const { session } = useLoaderData<typeof loader>();

  return (
    <SessionStoreProvider data={session}>
      <View className="max-w-5xl w-full mx-auto px-6">
        <Header user={session} />

        <View className="gap-4">
          <Outlet />
        </View>

        <footer className="h-20"></footer>
      </View>
    </SessionStoreProvider>
  );
}
