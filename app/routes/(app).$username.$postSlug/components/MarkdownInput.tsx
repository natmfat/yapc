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
import { ReactNode } from "react";

export function MarkdownInput(props: MultilineInputProps) {
  return (
    <Tabs defaultValue="write">
      <TabsList>
        <TabsTrigger value="write">Write</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="write">
        <View className="pt-2 gap-2">
          <MultilineInput autoSize {...props}></MultilineInput>
          <View className="flex-row gap-2">
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
        <View className="p-2 border border-transparent min-h-20">
          <Text>Nothing to preview</Text>
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
