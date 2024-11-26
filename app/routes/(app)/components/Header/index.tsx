import { Link } from "@remix-run/react";
import { IconButton } from "natmfat/components/IconButton";
import { View } from "natmfat/components/View";
import { Notifications } from "./Notifications";
import { Profile } from "./Profile";
import { RiAddIcon } from "natmfat/icons/RiAddIcon";
import { Logo } from "./Logo";
import { User } from "@prisma/client";
import { Button } from "natmfat/components/Button";
import { Nullable } from "~/lib/types";
import { ROUTE as LOGIN_ROUTE } from "~/routes/(auth).login";
import { usePostDialogContext } from "../CreatePostDialog";

export interface HeaderProps {
  user: Nullable<Pick<User, "username" | "avatarUrl">>;
}

export function Header({ user }: HeaderProps) {
  const { setOpen } = usePostDialogContext();
  return (
    <header className="py-6 flex flex-row justify-between">
      <Logo />
      <View className="flex-row items-center">
        {user ? (
          <>
            <IconButton
              alt="Create post"
              className="h-8 w-8"
              onClick={() => setOpen(true)}
            >
              <RiAddIcon />
            </IconButton>
            <Notifications />
            <Profile user={user} />
          </>
        ) : (
          <Button asChild>
            <Link to={LOGIN_ROUTE}>Log in</Link>
          </Button>
        )}
      </View>
    </header>
  );
}
