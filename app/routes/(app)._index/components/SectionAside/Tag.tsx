import { Interactive } from "natmfat/components/Interactive";
import { View } from "natmfat/components/View";
import { RiCheckIcon } from "natmfat/icons/RiCheckIcon";
import { Text } from "natmfat/components/Text";

export function Tag({
  text,
  checked = false,
}: {
  text: string;
  checked?: boolean;
}) {
  return (
    <Interactive>
      <View className="rounded-full flex-row items-center px-2 py-1 w-fit gap-2 select-none">
        <Text className="before:content-['#'] before:text-foreground-dimmer">
          {text}
        </Text>
        {checked ? (
          <View className="h-5 w-5 rounded-full bg-yellow-dimmer text-yellow-strongest grid place-items-center">
            <RiCheckIcon />
          </View>
        ) : null}
      </View>
    </Interactive>
  );
}
