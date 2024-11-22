import { Link } from "@remix-run/react";
import { Text } from "natmfat/components/Text";
import { View, ViewProps } from "natmfat/components/View";
import { RiSquareIcon } from "natmfat/icons/RiSquareIcon";
import { cn } from "natmfat/lib/cn";
import { tokens } from "natmfat/lib/tokens";
import { ROUTE } from "~/routes/(app)._index";

export function Logo({ className, ...props }: ViewProps) {
  return (
    <Link to={ROUTE}>
      <View className={cn("flex-row items-center gap-2", className)} {...props}>
        <RiSquareIcon className="text-primary-default" size={tokens.space20} />
        <Text className="font-mono font-bold" size="subheadBig">
          yapc
        </Text>
      </View>
    </Link>
  );
}
