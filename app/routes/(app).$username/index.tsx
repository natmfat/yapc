import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { View } from "natmfat/components/View";
import { UserProfile } from "./components/UserProfile";
import { Router } from "remix-endpoint";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "natmfat/components/Tabs";
import { Post } from "../(app)._index/components/Post";
import { RiChat4Icon } from "natmfat/icons/RiChat4Icon";
import { RiTerminalBoxIcon } from "natmfat/icons/RiTerminalBoxIcon";
import { prisma } from "~/.server/prisma";
import { getStars } from "~/.server/prismaUtils";

export async function loader({ params }: LoaderFunctionArgs) {
  Router.assertResponse(params.username, new Response(null, { status: 404 }));
  const user = await prisma.user.findFirst({
    where: { username: params.username },
    include: {
      posts: {
        include: {
          tags: true,
          _count: {
            select: { comments: true },
          },
        },
      },
      comments: true,
    },
  });
  Router.assertResponse(user, new Response(null, { status: 404 }));

  return {
    user,
    stars: getStars(user),
  };
}

export default function PortfoliosPage() {
  const { user, stars } = useLoaderData<typeof loader>();
  return (
    <View className="flex-row items-start gap-4">
      <UserProfile user={user} stars={stars} />
      <Tabs defaultValue="posts" className="w-full">
        <TabsList>
          <TabsTrigger value="posts">
            <RiTerminalBoxIcon />
            Projects
          </TabsTrigger>
          <TabsTrigger value="replies">
            <RiChat4Icon />
            Comments
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          {user.posts.map((post) => (
            <Post key={post.id} post={post} user={user} />
          ))}
        </TabsContent>
      </Tabs>
      {/* <View className="flex-1 w-full">
        <Outlet />
      </View> */}
    </View>
  );
}
