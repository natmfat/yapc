import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { View } from "natmfat/components/View";
// import { requireTruthy } from "~/lib/utils.server";
// import { publicUser } from "~/services/auth.server";

import { UserProfile } from "./components/UserProfile";
import { Router } from "remix-endpoint";
import { PostData, shitgen, TagData } from "~/.server/database/client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "natmfat/components/Tabs";
import { Post } from "../(app)._index/components/Post";
import { RiChat4Icon } from "natmfat/icons/RiChat4Icon";
import { RiTerminalBoxIcon } from "natmfat/icons/RiTerminalBoxIcon";

export type PostWithTagsData = Omit<PostData, "user_id"> & {
  tags: Pick<TagData, "name">[];
};

export async function loader({ params }: LoaderFunctionArgs) {
  Router.assertResponse(params.username, new Response(null, { status: 404 }));
  const user = await shitgen.user.find({
    where: { username: params.username },
  });
  Router.assertResponse(user, new Response(null, { status: 404 }));
  const where = { user_id: user.id };
  return {
    user,
    roles: (
      await shitgen.userRole.findMany({ where, include: { role_id: true } })
    ).map(({ role_id }) => role_id),
    posts: (await Promise.all(
      (
        await shitgen.post.findMany({ where })
      ).map(async (post) => ({
        ...post,
        tags:
          (
            await shitgen.postTag.findMany({
              where: { post_id: post.id },
              include: {
                tag_id: {
                  name: true,
                },
              },
            })
          )
            .map(({ tag_id }) => tag_id)
            .filter((tag) => !!tag) || [],
      }))
    )) as PostWithTagsData[],
    comments: await shitgen.comment.findMany({ where }),
  };
  // return { user: publicUser(await requireUser(params.username)) };
}

export default function PortfoliosPage() {
  const { user, roles, posts, comments } = useLoaderData<typeof loader>();
  return (
    <View className="flex-row items-start gap-4">
      <UserProfile user={user} roles={roles} />
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
          {posts.map((post) => (
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
