import { Text } from "natmfat/components/Text";
import { ReactNode } from "react";

export function Feature({ text, icon }: { text: string; icon: ReactNode }) {
  return (
    <li className="flex items-center text-left gap-4">
      {icon}
      <Text maxLines={2} className="flex-1">
        {text}
      </Text>
    </li>
  );
}
