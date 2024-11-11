import { Avatar, AvatarProps } from "natmfat/components/Avatar";
import { Interactive } from "natmfat/components/Interactive";
import { Text } from "natmfat/components/Text";
import { View } from "natmfat/components/View";
import { RiChat4Icon } from "natmfat/icons/RiChat4Icon";
import { tokens } from "natmfat/lib/tokens";

interface PinnedProps {
  avatar: AvatarProps;
  heading: string;
  messageCount: number;
}

export function Pinned({ avatar, heading, messageCount }: PinnedProps) {
  return (
    <Interactive variant="fill">
      <View className="p-2 flex-row max-w-full overflow-hidden flex-1 items-center gap-2">
        <Avatar size={tokens.space24} {...avatar} />
        <Text className="flex-1">{heading}</Text>
        <Text color="dimmer" className="flex flex-row gap-1 items-center">
          <RiChat4Icon />
          {messageCount}
        </Text>
      </View>
    </Interactive>
  );
}

// @todo format number
