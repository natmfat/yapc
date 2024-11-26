import { Text } from "natmfat/components/Text";
import { View } from "natmfat/components/View";
import { RiErrorWarningIcon } from "natmfat/icons/RiErrorWarningIcon";
import { cn } from "natmfat/lib/cn";
import { ComponentProps, forwardRef, useEffect, useState } from "react";

// @todo CDN/resizing

export const Image = forwardRef<
  HTMLImageElement,
  ComponentProps<"img"> & { concise?: boolean }
>(({ className, src, concise, ...props }, ref) => {
  const [error, setError] = useState(src ? "" : "Image does not exist");

  return (
    <View
      className={cn(
        "grid place-items-center border border-interactive rounded-default overflow-hidden p-4 flex-shrink-0",
        className
      )}
      title={error}
    >
      {src && !error ? (
        <img
          className="w-full h-full"
          src={src}
          ref={ref}
          {...props}
          onError={() => {
            setError("Failed to load image");
          }}
        />
      ) : null}

      {error ? (
        <View className="gap-1 overflow-hidden items-center w-full">
          <RiErrorWarningIcon className="flex-shrink-0" />
          {!concise ? (
            <Text className="flex-1" size="small">
              {error}
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
});

// @todo container query
