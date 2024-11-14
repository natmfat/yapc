import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { View } from "natmfat/components/View";
// import { requireTruthy } from "~/lib/utils.server";
// import { publicUser } from "~/services/auth.server";

import { UserProfile } from "./components/UserProfile";
import { Router } from "remix-endpoint";
import { shitgen } from "~/.server/database/client";

export async function loader({ params }: LoaderFunctionArgs) {
  Router.assertResponse(params.username);
  const user = await shitgen.user.find({
    where: { username: params.username },
  });
  Router.assertResponse(user);
  return {
    user,
    roles: (
      await shitgen.userRole.findMany({
        where: { user_id: user.id },
        include: { role_id: true },
      })
    ).map(({ role_id }) => role_id),
  };
  // return { user: publicUser(await requireUser(params.username)) };
}

export default function PortfoliosPage() {
  const data = useLoaderData<typeof loader>();
  return (
    <View className="flex-row items-start gap-4">
      <UserProfile {...data} />
      <View className="flex-1 w-full">
        <Outlet />
      </View>
    </View>
  );
}
