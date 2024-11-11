import { Interactive } from "natmfat/components/Interactive";
import { Text } from "natmfat/components/Text";
import { View, ViewProps } from "natmfat/components/View";
import { IconSizeProvider } from "natmfat/icons/Icon";
import { cn } from "natmfat/lib/cn";
import { tokens } from "natmfat/lib/tokens";
import { ReactNode } from "react";

export function Featured({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn("grid grid-cols-4 grid-rows-1 gap-4", className)}
      {...props}
    />
  );
}

const FEATURED_ITEM_CLASS_NAME = "w-full aspect-square rounded-default ";

export function FeaturedItem({ className, ...props }: ViewProps) {
  return (
    <Interactive>
      <View
        className={cn(FEATURED_ITEM_CLASS_NAME, className, "bg-surface")}
        {...props}
      ></View>
    </Interactive>
  );
}

export function FeaturedButtonGroup({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn(
        FEATURED_ITEM_CLASS_NAME,
        "grid grid-cols-1 grid-rows-2 gap-4",
        className
      )}
      {...props}
    />
  );
}

export function FeaturedButton({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) {
  return (
    <Interactive>
      <button className="flex flex-col items-center justify-center text-center gap-2">
        <View className="mx-auto">
          <IconSizeProvider value={tokens.space24}>{icon}</IconSizeProvider>
        </View>
        <Text>{text}</Text>
      </button>
    </Interactive>
  );
}
