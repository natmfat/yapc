import { View, ViewProps } from "natmfat/components/View";
import { Text } from "natmfat/components/Text";
import { ReactNode } from "react";
import { cn } from "natmfat/lib/cn";

export function SectionAside({ className, ...props }: ViewProps) {
  return <View className={cn("flex-shrink-0 gap-8", className)} {...props} />;
}

export function SectionAsideItem({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <View className="gap-4">
      <Text className="uppercase" color="dimmest">
        {heading}
      </Text>
      <View className=" gap-2">{children}</View>
    </View>
  );
}
