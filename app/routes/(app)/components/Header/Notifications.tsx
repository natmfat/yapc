import { Button } from "natmfat/components/Button";
import { ButtonGroup, ButtonGroupItem } from "natmfat/components/ButtonGroup";
import { Heading } from "natmfat/components/Heading";
import { IconButton } from "natmfat/components/IconButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "natmfat/components/Popover";
import { Separator } from "natmfat/components/Separator";
import { Text } from "natmfat/components/Text";
import { View } from "natmfat/components/View";
import { RiArrowRightIcon } from "natmfat/icons/RiArrowRightIcon";
import { RiNotificationIcon } from "natmfat/icons/RiNotificationIcon";
import { tokens } from "natmfat/lib/tokens";

export function Notifications() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton alt="Notifications" className="h-8 w-8">
          <RiNotificationIcon />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent className="p-3 w-80">
        <View className="flex-row items-center justify-between">
          <Heading level={1} size="subheadBig">
            Notifications
          </Heading>

          <Button size={tokens.space12} color="transparent" variant="outline">
            View all
            <RiArrowRightIcon />
          </Button>
        </View>
        <Separator className="my-3" />
        <ButtonGroup defaultValue="unread">
          <ButtonGroupItem value="unread">Unread</ButtonGroupItem>
          <ButtonGroupItem value="all">All</ButtonGroupItem>
        </ButtonGroup>
        <Separator className="my-3" />
        <View className="h-20 items-center justify-center text-center">
          <Text color="dimmer">You're all caught up!</Text>
        </View>
      </PopoverContent>
    </Popover>
  );
}
