import { Link } from "@remix-run/react";
import { IconButton } from "natmfat/components/IconButton";
import { Text } from "natmfat/components/Text";
import { View } from "natmfat/components/View";
import { RiSquareIcon } from "natmfat/icons/RiSquareIcon";
import { tokens } from "natmfat/lib/tokens";
import { UserData } from "~/.server/database/client";
import { Notifications } from "./Notifications";
import { Profile } from "./Profile";
import { RiAddIcon } from "natmfat/icons/RiAddIcon";
import { Logo } from "./Logo";

export interface HeaderProps {
  user: Pick<UserData, "username" | "avatar_url">;
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="py-6 flex flex-row justify-between">
      <Logo />
      <View className="flex-row items-center">
        <IconButton alt="Create Portfolio" className="h-8 w-8" asChild>
          <Link to={"/"}>
            <RiAddIcon />
          </Link>
        </IconButton>
        <Notifications />
        <Profile user={user} />
      </View>
    </header>
  );
}
