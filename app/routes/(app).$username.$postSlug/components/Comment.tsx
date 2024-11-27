import { Prisma } from "@prisma/client";
import { Avatar } from "natmfat/components/Avatar";
import { Text } from "natmfat/components/Text";
import { Timestamp } from "natmfat/components/Timestamp";
import { View } from "natmfat/components/View";
import { Markdown } from "./Markdown";
import { useState } from "react";
import { MarkdownForm } from "./MarkdownForm";
import { ActionIntent, Intent } from "..";
import { Button } from "natmfat/components/Button";
import { RiStarIcon } from "natmfat/icons/RiStarIcon";
import { IconButton } from "natmfat/components/IconButton";
import { RiShiningIcon } from "natmfat/icons/RiShiningIcon";
import { tokens } from "natmfat/lib/tokens";
import { RiMore2Icon } from "natmfat/icons/RiMore2Icon";

// @todo do a youtube-esque reply,

export function Comment({
  id,
  postId,
  body,
  author,
  createdAt,
  replies,
}: Prisma.CommentGetPayload<{
  include: {
    author: { select: { username: true; avatarUrl: true } };
    replies: {
      include: { author: { select: { username: true; avatarUrl: true } } };
    };
  };
}>) {
  const [replying, setReplying] = useState(false);

  return (
    <View className="relative">
      <IconButton alt="upvote" className="w-7 h-7 absolute top-0 right-0 z-10">
        <RiMore2Icon />
      </IconButton>

      <View className="flex-row gap-4">
        <Avatar username={author.username} src={author.avatarUrl} />
        <View className="flex-1 gap-1">
          <View className="flex-row items-center gap-2">
            <Text>{author.username}</Text>
            <Timestamp
              date={createdAt}
              textColor="dimmest"
              textVariant="small"
            />
          </View>
          <Markdown body={body} />

          <View className="flex-row">
            <View className="flex-row items-center gap-1 pr-2">
              <IconButton alt="upvote" className="w-7 h-7">
                <RiShiningIcon />
              </IconButton>
              <Text>0</Text>
            </View>
            <Button
              size={tokens.space12}
              onClick={() => setReplying(true)}
              className="bg-transparent hover:bg-interactive"
            >
              Reply
            </Button>
            <Button
              size={tokens.space12}
              className="bg-transparent hover:bg-interactive"
            >
              Share
            </Button>
          </View>

          <View className="gap-2 pt-2">
            {replying ? (
              <MarkdownForm method="POST" onCancel={() => setReplying(false)}>
                <Intent value={ActionIntent.CREATE_COMMENT} />
                <input type="hidden" name="parentId" value={id} />
                <input type="hidden" name="postId" value={postId} />
              </MarkdownForm>
            ) : null}

            {replies.map((reply) => (
              <Comment key={reply.id} {...reply} replies={[]} />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
