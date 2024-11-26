import { Avatar } from "natmfat/components/Avatar";
import { Button } from "natmfat/components/Button";
import { Heading } from "natmfat/components/Heading";
import { IconButton } from "natmfat/components/IconButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "natmfat/components/Popover";
import { Text } from "natmfat/components/Text";
import { View } from "natmfat/components/View";
import { RiEditIcon } from "natmfat/icons/RiEditIcon";
import { RiFlagIcon } from "natmfat/icons/RiFlagIcon";
import { RiLinkIcon } from "natmfat/icons/RiLinkIcon";
import { RiMoreIcon } from "natmfat/icons/RiMoreIcon";
import { RiSpamIcon } from "natmfat/icons/RiSpamIcon";
import { RiSquareIcon } from "natmfat/icons/RiSquareIcon";
import { spaceTokens, tokens } from "natmfat/lib/tokens";
import { CopyIconButton } from "~/components/CopyIconButton";
import { ListItem } from "~/components/ListItem";
import { ClientOnly } from "remix-utils/client-only";

import { useSessionStore } from "../../(app)/hooks/useSessionStore";
import { UserRole } from "./UserRole";
import { User } from "@prisma/client";
import { RiAddIcon } from "natmfat/icons/RiAddIcon";
import { RiCalendarIcon } from "natmfat/icons/RiCalendarIcon";
import { Timestamp } from "natmfat/components/Timestamp";
import { useToastContext } from "natmfat/components/Toast";
import { copyToClipboard } from "natmfat/lib/copyToClipboard";
import { createRoute } from "..";
import { useCallback } from "react";

interface UserDetailsProps {
  user: User;
  stars: number;
}

export function UserProfile({ user, stars }: UserDetailsProps) {
  const userSession = useSessionStore((state) => state.data);
  const owner = userSession && userSession.username === user.username;

  const { addToast } = useToastContext();
  const copyLinkToProfile = useCallback(() => {
    copyToClipboard(
      new URL(createRoute(user.username), location.href).toString()
    );
    addToast({
      type: "success",
      message: "Copied to clipboard",
    });
  }, [addToast]);

  return (
    <View className="overflow-x-hidden flex-shrink-0 w-4/12">
      <View className="w-full bg-blue-dimmest relative aspect-[12/5] rounded-default">
        <RiSquareIcon className="text-white bottom-4 right-4 absolute" />
      </View>
      <View className="-translate-y-16 relative p-4">
        <Avatar
          username={user.username}
          src={user.avatarUrl}
          size={spaceTokens.space96}
        />
        <View className="absolute flex-row items-center gap-2 top-16 right-0 pt-2 pr-4">
          <Popover>
            <PopoverTrigger asChild>
              <IconButton
                size={tokens.space24}
                alt="More user detail options"
                className="h-8 w-8"
              >
                <RiMoreIcon />
              </IconButton>
            </PopoverTrigger>
            <PopoverContent className="px-0 py-1.5">
              <ListItem onClick={copyLinkToProfile}>
                <RiLinkIcon />
                Copy link to profile
              </ListItem>
              {!owner ? (
                <>
                  <ListItem dangerous>
                    <RiSpamIcon />
                    Block @{user.username}
                  </ListItem>
                  <ListItem dangerous>
                    <RiFlagIcon />
                    Report @{user.username}
                  </ListItem>
                </>
              ) : null}
            </PopoverContent>
          </Popover>

          {owner ? (
            <Button color="transparent">
              <RiEditIcon />
              Edit Profile
            </Button>
          ) : (
            <Button>
              <RiAddIcon />
              Follow
            </Button>
          )}
        </View>
        <Heading level={1} size="headerDefault" className="mt-2">
          {user.firstName || user.username} {user.lastName}
        </Heading>
        <Text color="dimmer">@{user.username}</Text>
        <Text maxLines={2}>{user.bio}</Text>
        <View className="flex-row flex-wrap gap-2 mt-1">
          {user.roles.map((role) => (
            <UserRole role={role} key={role} />
          ))}
        </View>
      </View>
    </View>
  );
}
