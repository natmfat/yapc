import { Outlet, useLoaderData } from "@remix-run/react";
import { View } from "natmfat/components/View";
import { Header } from "./components/Header";
import { authenticator } from "~/services/auth.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { SessionStoreProvider } from "./hooks/useSessionStore";
import { PostDialog, PostDialogProvider } from "./components/CreatePostDialog";
import { useState } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await authenticator.isAuthenticated(request);
  return { session };
}

export default function AppLayout() {
  const { session } = useLoaderData<typeof loader>();
  const [open, setOpen] = useState(false);

  return (
    <SessionStoreProvider data={session}>
      <PostDialogProvider
        value={{
          open,
          setOpen,
        }}
      >
        <View className="max-w-5xl w-full mx-auto px-6">
          <Header user={session} />

          <View className="gap-4">
            <Outlet />
          </View>

          <PostDialog />

          <footer className="h-20"></footer>
        </View>
      </PostDialogProvider>
    </SessionStoreProvider>
  );
}
