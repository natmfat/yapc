import { LoaderFunctionArgs } from "@remix-run/node";
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
import { notFound } from "~/.server/routeUtils";
import { useLoaderData } from "@remix-run/react";
import { useUserStore } from "../(app).$username/hooks/useUserStore";
import invariant from "invariant";

export async function loader({ params }: LoaderFunctionArgs) {
  Router.assertResponse(params.username, notFound());
  const user = await prisma.user.findFirst({
    where: { username: params.username },
    select: {
      posts: {
        include: {
          tags: true,
          _count: {
            select: { comments: true, stars: true },
          },
        },
      },
      comments: {
        include: {
          replies: true,
        },
      },
    },
  });
  Router.assertResponse(user, notFound());
  return {
    posts: user.posts,
    comments: user.comments,
  };
}

export default function PortfoliosPage() {
  const { posts, comments } = useLoaderData<typeof loader>();
  const user = useUserStore((state) => state.data);
  invariant(user, "Expected user to exist on username route");

  return (
    <Tabs defaultValue="posts" className="w-full gap-0">
      <TabsList>
        <TabsTrigger value="posts">
          <RiTerminalBoxIcon />
          Projects
        </TabsTrigger>
        <TabsTrigger value="replies">
          <RiChat4Icon />
          Replies
        </TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={{
              ...post,
              author: user,
              authorId: user?.id || 0,
            }}
          />
        ))}
      </TabsContent>
      <TabsContent value="replies"></TabsContent>
    </Tabs>
  );
}
