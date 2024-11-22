import { User } from "@prisma/client";
import { Avatar } from "natmfat/components/Avatar";
import { Text } from "natmfat/components/Text";
import { View } from "natmfat/components/View";
import { tokens } from "natmfat/lib/tokens";
import { ReactNode } from "react";

export function Author({ user }: { user: User | null }) {
  if (!user) {
    // @todo better deleted user signifier
    return <Text>Deleted User</Text>;
  }

  return (
    <View className="flex-row items-center gap-2">
      <Avatar
        size={tokens.space24}
        src={user.avatarUrl}
        username={user.username}
      />
      <Text>{user.username}</Text>
    </View>
  );
}

// @todo profile view popover
// @todo move post to (app) components
