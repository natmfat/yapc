import { Surface } from "natmfat/components/Surface";
import { View } from "natmfat/components/View";
import { cn } from "natmfat/lib/cn";

interface PostSkeletonProps {
  /**
   * Which half of the skeleton to show \
   * Limits the amount of useless shit we show to the user
   */
  variant?: "top" | "bottom";
}

export function PostSkeleton({ variant }: PostSkeletonProps) {
  return (
    <View
      className={cn(
        "h-24 py-3 overflow-hidden w-full after:absolute after:block after:content-[''] after:w-full after:h-1/2  after:from-background-root",
        variant === "bottom"
          ? "after:bg-gradient-to-b after:top-0"
          : "after:bg-gradient-to-t after:bottom-0"
      )}
    >
      <View
        className={cn(
          "gap-2 w-full absolute",
          variant === "bottom" ? "bottom-0" : "top-0"
        )}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row gap-2 items-center">
            <Surface elevated className="w-6 rounded-full aspect-square" />
            <Surface
              elevated
              className="h-4 w-44 max-w-full flex-shrink rounded-default"
            />
          </View>
        </View>

        <Surface
          className="gap-2 p-2 border border-transparent rounded-default"
          elevated
        >
          <View className="flex-row gap-2">
            <Surface
              className="w-20 aspect-square rounded-default overflow-hidden flex-0"
              elevated
            />

            <View className="flex-1 gap-2 w-full overflow-hidden">
              <Surface
                elevated
                className="h-6 w-full flex-shrink rounded-default"
              />
              <Surface
                elevated
                className="h-4 w-44 max-w-full flex-shrink rounded-default"
              />
            </View>
          </View>

          <View className="flex-row justify-between">
            <View className="flex-row gap-1">
              <Surface elevated className="w-10 h-5 rounded-default" />
              <Surface elevated className="w-10 h-5 rounded-default" />
              <Surface elevated className="w-10 h-5 rounded-default" />
            </View>
          </View>
        </Surface>
      </View>
    </View>
  );
}
