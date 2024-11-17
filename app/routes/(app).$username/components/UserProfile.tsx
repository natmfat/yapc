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

import { useUserStore } from "../../(app)/hooks/useUserStore";
import { UserRole } from "./UserRole";
import { UserData, RoleData } from "~/.server/database/client";

interface UserDetailsProps {
  user: UserData;
  roles: RoleData[];
  stars?: number;
}

export function UserProfile({ user, roles, stars = 0 }: UserDetailsProps) {
  const userSession = useUserStore((state) => state.session);
  const owner = userSession && userSession.username === user.username;

  return (
    <View className="overflow-x-hidden w-4/12">
      <View className="w-full bg-blue-dimmest relative h-28 rounded-default">
        <RiSquareIcon className="text-white bottom-4 right-4 absolute" />
      </View>
      <View className="-translate-y-16 relative p-4">
        <Avatar
          username={user.username}
          src={user.avatar_url}
          size={spaceTokens.space96}
        />
        <View className="absolute flex-row items-center gap-2 top-16 right-0 pt-2 pr-4">
          {!owner ? (
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
                <ListItem dangerous>
                  <RiFlagIcon className="text-red-stronger" />
                  Report
                </ListItem>
                <ListItem dangerous>
                  <RiSpamIcon />
                  Block
                </ListItem>
              </PopoverContent>
            </Popover>
          ) : null}

          <CopyIconButton
            size={tokens.space24}
            icon={<RiLinkIcon />}
            text={typeof window === "undefined" ? "" : location.href}
            className="h-8 w-8 bg-interactive hover:bg-interactive-active duration-chill transition-background"
            color="transparent"
          />
          {owner ? (
            <Button color="transparent">
              <RiEditIcon />
              Edit Profile
            </Button>
          ) : null}
        </View>
        <Heading level={1} size="headerDefault" className="mt-2">
          {user.first_name || user.username} {user.last_name}
        </Heading>
        <Text color="dimmer">
          {user.username} ({stars})
        </Text>

        <Text maxLines={2}>{user.bio}</Text>

        <View className="flex-row flex-wrap gap-2 mt-1">
          {roles.map((role) => (
            <UserRole role={role.name} key={role.name} />
          ))}
        </View>
      </View>
    </View>
  );
}
