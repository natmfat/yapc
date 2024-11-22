import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { View } from "natmfat/components/View";
import { UserProfile } from "./components/UserProfile";
import { Router } from "remix-endpoint";
import { prisma } from "~/.server/prisma";
import { getStars } from "~/.server/prismaUtils";
import { notFound } from "~/.server/routeUtils";
import { UserStoreProvider } from "./hooks/useUserStore";
import { omit } from "~/lib/utils";

export async function loader({ params }: LoaderFunctionArgs) {
  Router.assertResponse(params.username, notFound());
  const user = await prisma.user.findFirst({
    where: { username: params.username },
    include: {
      posts: {
        select: { stars: true },
      },
      comments: {
        select: { stars: true },
      },
    },
  });

  // @todo limit number of posts & comments

  Router.assertResponse(user, notFound());

  return {
    user: omit(user, ["posts", "comments"]),
    stars: getStars(user),
  };
}

export default function PortfoliosPage() {
  const { user, stars } = useLoaderData<typeof loader>();
  return (
    <UserStoreProvider data={user}>
      <View className="flex-row items-start gap-4">
        <UserProfile user={user} stars={stars} />
        <View className="flex-1 w-full max-w-full overflow-x-hidden">
          <Outlet />
        </View>
      </View>
    </UserStoreProvider>
  );
}
