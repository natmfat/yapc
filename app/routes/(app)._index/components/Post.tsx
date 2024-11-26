import { Prisma } from "@prisma/client";
import { Link } from "@remix-run/react";
import invariant from "invariant";
import { Button } from "natmfat/components/Button";
import { Heading } from "natmfat/components/Heading";
import { Interactive } from "natmfat/components/Interactive";
import { Pill } from "natmfat/components/Pill";
import { Surface } from "natmfat/components/Surface";
import { Text } from "natmfat/components/Text";
import { Timestamp } from "natmfat/components/Timestamp";
import { View } from "natmfat/components/View";
import { RiChat4Icon } from "natmfat/icons/RiChat4Icon";
import { RiErrorWarningIcon } from "natmfat/icons/RiErrorWarningIcon";
import { RiEyeIcon } from "natmfat/icons/RiEyeIcon";
import { RiShiningIcon } from "natmfat/icons/RiShiningIcon";
import { ReactNode } from "react";
import { createRoute } from "~/routes/(app).$username.$postSlug";
import { Author } from "~/routes/(app)/components/Author";

export interface PostProps {
  post: Prisma.PostGetPayload<{
    include: {
      tags: true;
      author: true;
      _count: {
        select: { comments: true; stars: true };
      };
    };
  }>;
}

export const MAX_TAGS = 3;

export function Post({ post }: PostProps) {
  invariant(post.author, "Expected post author to exist"); // @todo deleted users?

  const tags = post.tags.slice(0, MAX_TAGS);
  const remainingTags = tags.length - MAX_TAGS;

  return (
    <View className="py-3 gap-2">
      <View className="flex-row items-center justify-between">
        <View className="flex-row gap-1 items-center">
          <Author user={post.author} />
          <span className="text-foreground-dimmer flex flex-row items-center gap-1">
            published an {post.type.toLocaleLowerCase()}
            <span>•</span>
            <Timestamp date={post.createdAt} className="align-top" />
          </span>
        </View>
        <Button className="w-20">
          <RiShiningIcon /> {post._count.stars}
        </Button>
      </View>

      <Link to={createRoute(post.author.username, post.slug)}>
        <Interactive className="p-2">
          <View className="gap-2">
            <View className="flex-row gap-2">
              <View className="w-20 aspect-square grid place-items-center border border-interactive rounded-default overflow-hidden flex-0">
                {post.thumbnailUrl ? (
                  <img className="w-full h-full" src={post.thumbnailUrl} />
                ) : (
                  <RiErrorWarningIcon />
                )}
              </View>
              <View>
                <Heading size="subheadBig">{post.heading}</Heading>
                <Text>{post.body}</Text>
              </View>
            </View>
          </View>
        </Interactive>
      </Link>

      <View className="flex-row justify-between items-center">
        <View className="flex-row">
          <PostStat icon={<RiChat4Icon />} count={post._count.comments} />
          <PostStat icon={<RiShiningIcon />} count={post._count.stars} />
          <PostStat icon={<RiEyeIcon />} count={post.views} />
        </View>
        <Surface
          elevated
          className="bg-transparent flex-row items-center gap-1 h-7"
        >
          {post.tags.map((tag) => (
            <Pill key={tag.name}>#{tag.name}</Pill>
          ))}
          {remainingTags > 0 ? (
            <Text size="small" color="dimmer">
              +{remainingTags}
            </Text>
          ) : null}
        </Surface>
      </View>
    </View>
  );
}

// @todo format count from number -> human readable string
export function PostStat({ icon, count }: { icon: ReactNode; count: number }) {
  return (
    <View className="w-12">
      <Text className="flex flex-row items-center gap-1" color="dimmer">
        {icon}
        {count}
      </Text>
    </View>
  );
}
