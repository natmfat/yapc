import { Post, PostType, Prisma, User } from "@prisma/client";
import { View } from "natmfat/components/View";
import { MAX_TAGS, PostStat } from "~/routes/(app)._index/components/Post";
import { Author } from "../Author";
import { RiShiningIcon } from "natmfat/icons/RiShiningIcon";
import { Heading } from "natmfat/components/Heading";
import { Text } from "natmfat/components/Text";
import { Surface } from "natmfat/components/Surface";
import { Pill } from "natmfat/components/Pill";
import { RiChat4Icon } from "natmfat/icons/RiChat4Icon";
import { RiEyeIcon } from "natmfat/icons/RiEyeIcon";
import { RiErrorWarningIcon } from "natmfat/icons/RiErrorWarningIcon";

export function PostPreview({
  author,
  type,
  tags,
  thumbnailUrl,
  heading,
  body,
}: Pick<
  Prisma.PostGetPayload<{ include: { author: true } }>,
  "author" | "type" | "heading" | "body" | "thumbnailUrl"
> & {
  tags: string[];
}) {
  const displayTags = tags.slice(0, MAX_TAGS);
  const remainingTags = tags.length - MAX_TAGS;

  return (
    <View className="py-3 gap-2">
      <View className="flex-row items-center justify-between">
        <View className="flex-row gap-1 items-center">
          <Author user={author} />
          <span className="text-foreground-dimmer flex flex-row items-center gap-1">
            published an {type.toLocaleLowerCase()}
          </span>
        </View>
        <RiShiningIcon />
      </View>

      <View className="gap-2 p-2 border border-interactive rounded-default">
        <View className="flex-row gap-2">
          <View className="w-20 aspect-square grid place-items-center border border-interactive rounded-default overflow-hidden flex-0 bg-interactive">
            {thumbnailUrl ? (
              <img className="w-full h-full" src={thumbnailUrl} />
            ) : (
              <RiErrorWarningIcon />
            )}
          </View>

          <View className="flex-1 w-full overflow-hidden">
            <Heading size="subheadBig">{heading}</Heading>
            <Text>{body}</Text>
          </View>
        </View>

        <View className="flex-row justify-between">
          <View className="flex-row">
            <PostStat icon={<RiChat4Icon />} count={0} />
            <PostStat icon={<RiShiningIcon />} count={0} />
            <PostStat icon={<RiEyeIcon />} count={0} />
          </View>
          <Surface
            elevated
            className="bg-transparent flex-row items-center gap-1"
          >
            {displayTags.map((tag) => (
              <Pill>#{tag}</Pill>
            ))}
            {remainingTags > 0 ? (
              <Text size="small" color="dimmer">
                +{remainingTags}
              </Text>
            ) : null}
          </Surface>
        </View>
      </View>
    </View>
  );
}
