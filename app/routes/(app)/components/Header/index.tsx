import { Link } from "@remix-run/react";
import { IconButton } from "natmfat/components/IconButton";
import { Text } from "natmfat/components/Text";
import { View } from "natmfat/components/View";
import { Notifications } from "./Notifications";
import { Profile } from "./Profile";
import { RiAddIcon } from "natmfat/icons/RiAddIcon";
import { Logo } from "./Logo";
import { User } from "@prisma/client";
import { Button } from "natmfat/components/Button";
import { Nullable } from "~/lib/types";

export interface HeaderProps {
  user: Nullable<Pick<User, "username" | "avatarUrl">>;
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="py-6 flex flex-row justify-between">
      <Logo />
      <View className="flex-row items-center">
        {user ? (
          <>
            <IconButton alt="Create Portfolio" className="h-8 w-8" asChild>
              <Link to={"/"}>
                <RiAddIcon />
              </Link>
            </IconButton>
            <Notifications />
            <Profile user={user} />
          </>
        ) : (
          <Button>Log in</Button>
        )}
      </View>
    </header>
  );
}
