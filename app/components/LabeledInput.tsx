import { Slot } from "@radix-ui/react-slot";
import { Input, InputProps } from "natmfat/components/Input";
import { Text } from "natmfat/components/Text";
import { View } from "natmfat/components/View";
import { cn } from "natmfat/lib/cn";
import {
  ChangeEvent,
  ElementRef,
  forwardRef,
  useCallback,
  useState,
} from "react";
import { Defined } from "~/lib/types";

interface LabeledInputProps extends Defined<Omit<InputProps, "ref">, "name"> {
  /** Explain what the input is for  */
  label: string;

  /** Warn user if the number of characters exceeds this number */
  maxLength?: number;

  /** Render this component as its child instead */
  asChild?: boolean;
}

export const LabeledInput = forwardRef<
  ElementRef<typeof Input>,
  LabeledInputProps
>(
  (
    {
      label: labelText,
      maxLength,
      asChild,
      name,
      onChange: onChangeInner,
      className,
      ...props
    },
    ref
  ) => {
    const [length, setLength] = useState<number>(getLength(props));
    const onChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setLength(e.target.value.length);
        if (onChangeInner) {
          onChangeInner(e);
        }
      },
      [setLength, onChangeInner]
    );

    const Comp = asChild ? Slot : Input;

    return (
      <View className={cn("gap-1.5", className)}>
        <View className="flex-row items-center justify-between">
          <Text asChild>
            <label htmlFor={name}>{labelText}</label>
          </Text>

          {maxLength ? (
            <Text color="dimmest" className={cn(getColor(length, maxLength))}>
              {length}/{maxLength}
            </Text>
          ) : null}
        </View>

        <Comp
          id={name}
          name={name}
          ref={ref}
          onChange={onChange}
          maxLength={maxLength}
          {...props}
        />
      </View>
    );
  }
);

LabeledInput.displayName = "LabeledInput";

/**
 * Get an appropriate color to tell the user how close they are to the maxLength threshold
 * @param length Current length of the text
 * @param maxLength Threshold for text length
 * @returns A class name that applies a color
 */
export function getColor(length: number, maxLength: number) {
  if (length > maxLength) {
    return "text-negative-default";
  } else if (length > maxLength - maxLength / 10) {
    // warn at 10% of maxLength
    return "text-yellow-default";
  }
  return "";
}

/**
 * Get the default length from the provided value or defaultValue so it can be displayed to the user
 * Apparently value doesn't have to be a string?
 * @param args
 * @returns
 */
function getLength({
  value,
  defaultValue,
}: Pick<LabeledInputProps, "defaultValue" | "value">) {
  if (typeof value === "string") {
    return value.length;
  } else if (typeof defaultValue === "string") {
    return defaultValue.length;
  }
  return 0;
}
