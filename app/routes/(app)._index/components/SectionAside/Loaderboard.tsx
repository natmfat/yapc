import { Avatar } from "natmfat/components/Avatar";
import { Text } from "natmfat/components/Text";
import { View } from "natmfat/components/View";
import { RiShiningIcon } from "natmfat/icons/RiShiningIcon";

export function LeaderboardItem() {
  return (
    <View asChild>
      <li className="flex-row items-center justify-between px-2 py-1.5">
        <View className="flex-row items-center gap-2">
          <Text className="font-bold pr-2">1</Text>
          <Avatar src="https://natmfat.com/logo.png" username="natmfat">
            natmfat
          </Avatar>

          <Text className="flex-1">natmfat</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <RiShiningIcon />
          <Text>100k</Text>
        </View>
      </li>
    </View>
  );
}
