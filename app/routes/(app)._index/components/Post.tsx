import { Prisma, User } from "@prisma/client";
import { Avatar } from "natmfat/components/Avatar";
import { Button } from "natmfat/components/Button";
import { Heading } from "natmfat/components/Heading";
import { Interactive } from "natmfat/components/Interactive";
import { Pill } from "natmfat/components/Pill";
import { Surface } from "natmfat/components/Surface";
import { Text } from "natmfat/components/Text";
import { Timestamp } from "natmfat/components/Timestamp";
import { View } from "natmfat/components/View";
import { RiChat4Icon } from "natmfat/icons/RiChat4Icon";
import { RiEyeIcon } from "natmfat/icons/RiEyeIcon";
import { RiShiningIcon } from "natmfat/icons/RiShiningIcon";
import { tokens } from "natmfat/lib/tokens";
import { ReactNode } from "react";

interface PostProps {
  post: Prisma.PostGetPayload<{ include: { tags: true; comments: true } }>;
  user: User;
}

const MAX_TAGS = 3;

export function Post({ user, post }: PostProps) {
  const tags = post.tags.slice(0, MAX_TAGS);
  const remainingTags = tags.length - MAX_TAGS;

  return (
    <View className="py-3 gap-2">
      <View className="flex-row items-center justify-between">
        <View className="flex-row gap-2">
          <Avatar
            size={tokens.space24}
            src={user.avatarUrl}
            username={user.username}
          />
          <Text>
            natmfat{" "}
            <span className="text-foreground-dimmer">
              published an {post.type} <span className="px-1">•</span>{" "}
              <Timestamp date={post.createdAt} className="align-top" />
            </span>
          </Text>
        </View>
        <Button className="w-20">
          <RiShiningIcon /> {post.stars}
        </Button>
      </View>

      <Interactive className="p-2">
        <View className="gap-2">
          <View className="flex-row gap-2">
            <img
              className="w-20 h-20 rounded-default border border-interactive"
              src={post.thumbnailUrl}
            />
            <View>
              <Heading size="subheadBig">{post.heading}</Heading>
              <Text>{post.body}</Text>
            </View>
          </View>

          <View className="flex-row justify-between">
            <View className="flex-row">
              <PostStat icon={<RiChat4Icon />} count={post.comments.length} />
              <PostStat icon={<RiShiningIcon />} count={post.stars} />
              <PostStat icon={<RiEyeIcon />} count={post.views} />
            </View>
            <Surface
              elevated
              className="bg-transparent flex-row items-center gap-1"
            >
              {post.tags.map((tag) => (
                <Pill>#{tag.name}</Pill>
              ))}
              {remainingTags > 0 ? (
                <Text size="small" color="dimmer">
                  +{remainingTags}
                </Text>
              ) : null}
            </Surface>
          </View>
        </View>
      </Interactive>
    </View>
  );
}

// @todo format count from number -> human readable string
function PostStat({ icon, count }: { icon: ReactNode; count: number }) {
  return (
    <View className="w-16">
      <Text className="flex flex-row items-center gap-1" color="dimmer">
        {icon}
        {count}
      </Text>
    </View>
  );
}
