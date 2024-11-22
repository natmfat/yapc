import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { View } from "natmfat/components/View";
import { Router } from "remix-endpoint";
import { prisma } from "~/.server/prisma";
import { notFound } from "~/.server/routeUtils";
import { Author } from "../(app)/components/Author";
import { Heading } from "natmfat/components/Heading";
import { Button } from "natmfat/components/Button";
import { RiShiningIcon } from "natmfat/icons/RiShiningIcon";
import { Timestamp } from "natmfat/components/Timestamp";
import { RiAddIcon } from "natmfat/icons/RiAddIcon";
import { tokens } from "natmfat/lib/tokens";
import { Text } from "natmfat/components/Text";
import { RiLinkIcon } from "natmfat/icons/RiLinkIcon";
import { Pill } from "natmfat/components/Pill";
import { MultilineInput } from "natmfat/components/MultilineInput";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "natmfat/components/Tabs";
import { MarkdownInput } from "./components/MarkdownInput";

export async function loader({
  params: { username, postSlug },
}: LoaderFunctionArgs) {
  Router.assertResponse(username, notFound());
  Router.assertResponse(postSlug, notFound());

  const post = await prisma.post.findFirst({
    where: {
      author: { username },
      slug: postSlug,
    },
    include: { author: true, tags: true },
  });

  Router.assertResponse(post, notFound());

  return { post };
}

export function createRoute(username: string, postSlug: string) {
  return `/${username}/${postSlug}`;
}

export default function PostPage() {
  const { post } = useLoaderData<typeof loader>();
  return (
    <View className="gap-2">
      <View className="flex-row justify-between flex-1 overflow-hidden">
        <View className="flex-row items-center gap-2 flex-1">
          <img
            className="border border-interactive rounded-default h-8 w-8 flex-shrink-0"
            src={post.thumbnailUrl}
          />
          <Heading size="headerDefault" className="flex-1">
            {post.heading}
          </Heading>
        </View>

        <View className="flex-row gap-2 flex-shrink-0">
          <Button>
            <RiShiningIcon /> {post.stars}
          </Button>
          <Button>
            <RiLinkIcon />
            Copy Link
          </Button>
        </View>
      </View>

      <View className="flex-row gap-1 items-center">
        <Author user={post.author} />
        <span className="text-foreground-dimmer flex flex-row items-center gap-1">
          published an {post.type.toLocaleLowerCase()}
          <span>•</span>
          <Timestamp date={post.createdAt} className="align-top" />
        </span>
      </View>

      {/* {post.tags.map(({ name }) => (
        <Pill>#{name}</Pill>
      ))} */}

      <View>{post.body}</View>

      <MarkdownInput placeholder="Add your comment here..." />
      <Button color="primary" className="w-fit" disabled>
        Comment
      </Button>
    </View>
  );
}

// different view depending on type
