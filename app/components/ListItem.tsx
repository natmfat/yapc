import { Slot } from "@radix-ui/react-slot";
import { Interactive } from "natmfat/components/Interactive";
import { cn } from "natmfat/lib/cn";
import type { ReactNode } from "react";

export function ListItem({
  children,
  dangerous,
  className,
  asChild,
  ...props
}: {
  children: ReactNode;
  dangerous?: boolean;
  asChild?: boolean;
} & React.ComponentPropsWithoutRef<"button">) {
  const Comp = asChild ? Slot : "button";

  return (
    <Interactive
      variant="listItem"
      className={cn(
        "flex-row px-2 py-1 text-left min-w-24 flex items-center gap-2",
        dangerous && "text-red-stronger",
        className
      )}
    >
      <Comp {...props}>{children}</Comp>
    </Interactive>
  );
}
