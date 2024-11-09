import { Avatar } from "natmfat/components/Avatar";
import { Button } from "natmfat/components/Button";
import { Heading } from "natmfat/components/Heading";
import { Interactive } from "natmfat/components/Interactive";
import { Pill } from "natmfat/components/Pill";
import { Surface } from "natmfat/components/Surface";
import { Text } from "natmfat/components/Text";
import { Timestamp } from "natmfat/components/Timestamp";
import { View } from "natmfat/components/View";
import { RiChat4Icon } from "natmfat/icons/RiChat4Icon";
import { RiPlayIcon } from "natmfat/icons/RiPlayIcon";
import { RiShiningIcon } from "natmfat/icons/RiShiningIcon";
import { tokens } from "natmfat/lib/tokens";
import { ReactNode } from "react";

export function Post() {
  return (
    <View className="py-3 gap-2">
      <View className="flex-row items-center justify-between">
        <View className="flex-row gap-2">
          <Avatar
            size={tokens.space24}
            src="https://natmfat.com/logo.png"
            username="natmfat"
          />
          <Text>
            natmfat{" "}
            <span className="text-foreground-dimmer">
              published an update <span className="px-1">•</span>{" "}
              <Timestamp date={new Date()} className="align-top" />
            </span>
          </Text>
        </View>
        <Button className="w-24">
          <RiShiningIcon />0
        </Button>
      </View>

      <Interactive className="p-2">
        <View className="gap-2">
          <View className="flex-row gap-2">
            <img
              className="w-20 h-20 rounded-default border border-interactive"
              src="https://natmfat.com/logo.png"
            />
            <View>
              <Heading size="subheadBig">IDE from the future</Heading>
              <Text>I've been really excited about Replit Desktop!</Text>
            </View>
          </View>

          <View className="flex-row justify-between">
            <View className="flex-row">
              <PostStat icon={<RiPlayIcon />} count="111" />
              <PostStat icon={<RiChat4Icon />} count="378" />
              <PostStat icon={<RiShiningIcon />} count="37" />
            </View>
            <Surface
              elevated
              className="bg-transparent flex-row items-center gap-1"
            >
              <Pill>#python</Pill>
              <Pill>#fun</Pill>
              <Pill>#game</Pill>
              <Text size="small" color="dimmer">
                +2
              </Text>
            </Surface>
          </View>
        </View>
      </Interactive>
    </View>
  );
}

// @todo format count from number -> human readable string
function PostStat({ icon, count }: { icon: ReactNode; count: string }) {
  return (
    <View className="w-16">
      <Text className="flex flex-row items-center gap-1" color="dimmer">
        {icon}
        {count}
      </Text>
    </View>
  );
}
