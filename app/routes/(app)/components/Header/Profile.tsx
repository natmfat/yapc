import { Link } from "@remix-run/react";
import { Avatar } from "natmfat/components/Avatar";
import { Heading } from "natmfat/components/Heading";
import { Interactive } from "natmfat/components/Interactive";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "natmfat/components/Popover";
import { Separator } from "natmfat/components/Separator";
import { Text } from "natmfat/components/Text";
import { View } from "natmfat/components/View";
import { RiArrowDownSIcon } from "natmfat/icons/RiArrowDownSIcon";
import { RiLogoutBoxIcon } from "natmfat/icons/RiLogoutBoxIcon";
import { RiSettingsIcon } from "natmfat/icons/RiSettingsIcon";
import { RiUserIcon } from "natmfat/icons/RiUserIcon";
import { tokens } from "natmfat/lib/tokens";
import { ListItem } from "~/components/ListItem";
import { HeaderProps } from ".";

export function Profile({ user }: Pick<HeaderProps, "user">) {
  return (
    <Popover>
      <PopoverTrigger>
        <Interactive variant="noFill">
          <View className="flex-row items-center gap-1.5 p-1 h-8 rounded-default">
            <Avatar
              size={tokens.space24}
              src={user.avatar_url}
              username={user.username}
            />
            <RiArrowDownSIcon />
          </View>
        </Interactive>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-44">
        <View className="flex-row p-4 items-center gap-2">
          <Avatar
            size={tokens.space32}
            src={user.avatar_url}
            username={user.username}
          />
          <Heading level={1} size="subheadDefault">
            {user.username}
          </Heading>
        </View>

        <ListItem className="px-4" asChild>
          <Link to={`/${user.username}`}>
            <RiUserIcon />
            <Text>Profile</Text>
          </Link>
        </ListItem>

        <ListItem className="px-4" asChild>
          <Link to="/account">
            <RiSettingsIcon />
            <Text>Account</Text>
          </Link>
        </ListItem>

        <Separator />

        <ListItem className="px-4 rounded-b-default" asChild>
          <Link to="/logout">
            <RiLogoutBoxIcon />
            <Text>Logout</Text>
          </Link>
        </ListItem>
      </PopoverContent>
    </Popover>
  );
}
