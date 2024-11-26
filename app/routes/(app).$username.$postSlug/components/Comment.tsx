import { Prisma } from "@prisma/client";
import { Avatar } from "natmfat/components/Avatar";
import { Text } from "natmfat/components/Text";
import { Timestamp } from "natmfat/components/Timestamp";
import { View } from "natmfat/components/View";
import { Markdown } from "./Markdown";
import { useState } from "react";
import { MarkdownInput } from "./MarkdownInput";
import { Button } from "natmfat/components/Button";
import { MarkdownForm } from "./MarkdownForm";

export function Comment({
  createdAt,
  body,
  author,
}: Prisma.CommentGetPayload<{ include: { author: true } }>) {
  const [replying, setReplying] = useState(false);

  return (
    <View className="flex-row gap-3">
      <Avatar username={author.username} src={author.avatarUrl} />
      <View className="flex-1 gap-1">
        <View className="flex-row items-center gap-2">
          <Text>{author.username}</Text>
          <Timestamp date={createdAt} textColor="dimmest" textVariant="small" />
        </View>
        <Markdown body={body} />
        {replying ? (
          <MarkdownForm onCancel={() => setReplying(false)} />
        ) : (
          <button
            className="text-primary-stronger text-small  transition-colors duration-snappy w-fit"
            onClick={() => setReplying(true)}
          >
            Reply
          </button>
        )}
      </View>
    </View>
  );
}
