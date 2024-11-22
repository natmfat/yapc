import { Interactive } from "natmfat/components/Interactive";
import {
  MultilineInput,
  MultilineInputProps,
} from "natmfat/components/MultilineInput";
import { Separator } from "natmfat/components/Separator";
import { Surface } from "natmfat/components/Surface";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "natmfat/components/Tabs";
import { Text } from "natmfat/components/Text";
import { View } from "natmfat/components/View";
import { RiImageIcon } from "natmfat/icons/RiImageIcon";
import { RiMarkdownIcon } from "natmfat/icons/RiMarkdownIcon";
import { ChangeEvent, ReactNode, useCallback, useRef, useState } from "react";
import { Markdown } from "./Markdown";

export function MarkdownInput({
  value: overrideValue,
  onChange: overrideOnChange,
  defaultValue,
  ...props
}: MultilineInputProps) {
  const [localValue, setLocalValue] = useState(defaultValue);
  const value = overrideValue || localValue;
  const ref = useRef<HTMLTextAreaElement>(null);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (overrideOnChange) {
        overrideOnChange(e);
      }
      setLocalValue(e.target.value);
    },
    [overrideOnChange]
  );

  return (
    <Tabs defaultValue="write">
      <TabsList>
        <TabsTrigger value="write">Write</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="write">
        <View className="block pt-2">
          <MultilineInput
            {...props}
            autoSize
            className="w-full"
            ref={ref}
            value={value}
            onChange={onChange}
          ></MultilineInput>
          <View className="flex-row gap-2 mt-2">
            <InfoButton
              icon={<RiMarkdownIcon />}
              text="Markdown is supported"
            />

            <Separator orientation="vertical" />
            <InfoButton
              icon={<RiImageIcon />}
              text="Paste, drop, or click to add files"
            />
          </View>
        </View>
      </TabsContent>
      <TabsContent value="preview">
        <View
          className="pt-2"
          style={{
            // magic number, default height of input + info buttons
            minHeight: "98.4px",
          }}
        >
          <View className="px-2 py-1 border border-transparent">
            {value && String(value).length > 0 ? (
              <Markdown body={String(value)} />
            ) : (
              <Text>Nothing to preview</Text>
            )}
          </View>
        </View>
      </TabsContent>
    </Tabs>
  );
}

function InfoButton({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <Interactive variant="noFill">
      <View className="flex-row gap-2 items-center px-2 py-0.5 w-fit">
        {icon}
        <Text className="select-none">{text}</Text>
      </View>
    </Interactive>
  );
}
