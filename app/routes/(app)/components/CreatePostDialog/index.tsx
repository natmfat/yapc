import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "natmfat/components/Dialog";
import { createContext, ElementRef, forwardRef, useContext } from "react";
import { View } from "natmfat/components/View";
import { Surface } from "natmfat/components/Surface";
import { Heading } from "natmfat/components/Heading";
import { Text } from "natmfat/components/Text";
import { PostType } from "@prisma/client";
import { useSessionStore } from "../../hooks/useSessionStore";
import invariant from "invariant";
import { PostPreview } from "./PostPreview";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsSeparator,
  TabsTrigger,
} from "natmfat/components/Tabs";
import { Input, InputProps } from "natmfat/components/Input";
import { MultilineInput } from "natmfat/components/MultilineInput";
import { Button } from "natmfat/components/Button";
import { RiArrowRightIcon } from "natmfat/icons/RiArrowRightIcon";
import { LabeledInput } from "~/components/LabeledInput";
import { PostSkeleton } from "./PostSkeleton";

interface ContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Context = createContext<ContextType>({
  open: false,
  setOpen: () => {},
});

export const PostDialogProvider = Context.Provider;

export const usePostDialogContext = () => useContext(Context);

export function PostDialog() {
  const session = useSessionStore((store) => store.data);
  invariant(session, "expected session to exist");

  return (
    <Dialog maxWidth={"1000px"} defaultOpen>
      <DialogContent className="p-0">
        {/* @audit-ok we want to add our own styling */}
        <VisuallyHidden>
          <DialogTitle>Publish your Project</DialogTitle>
          <DialogDescription>
            Publish your project to the Yet Another Programming Community.
          </DialogDescription>
        </VisuallyHidden>
        <View className="flex-row">
          <Surface elevated className="w-1/3 p-4 gap-2">
            <Heading size="headerDefault">Publish your Project</Heading>

            <Tabs variant="progress" defaultValue="basics">
              <TabsList>
                <TabsTrigger value="basics" complete>
                  Basics
                </TabsTrigger>
                <TabsSeparator />
                <TabsTrigger value="tags">Tags</TabsTrigger>
                <TabsSeparator />
                <TabsTrigger value="icon">Icon</TabsTrigger>
                <TabsSeparator />
                <TabsTrigger value="cover">Cover Page</TabsTrigger>
              </TabsList>
              <TabsContent value="basics">
                <View className="gap-4">
                  <LabeledInput
                    label="Project name"
                    name="heading"
                    maxLength={60}
                  />
                  <LabeledInput
                    label="Project description"
                    name="body"
                    maxLength={600}
                    asChild
                  >
                    <MultilineInput />
                  </LabeledInput>
                  <Button color="primary" className="self-end">
                    Next <RiArrowRightIcon />
                  </Button>
                </View>
              </TabsContent>
              <TabsContent value="tags">tags</TabsContent>
              <TabsContent value="icon">icon</TabsContent>
              <TabsContent value="cover">cover</TabsContent>
            </Tabs>
          </Surface>

          <Surface
            background="root"
            className="w-full flex-1 p-4 overflow-hidden"
          >
            <Text color="dimmer">Preview</Text>
            <View className="gap-4 px-20">
              <PostSkeleton variant="bottom" />
              <PostPreview
                author={session}
                type={PostType.PROJECT}
                tags={[]}
                thumbnailUrl=""
                heading="Welcome to Yet Another Programming Community!"
                body="Idk what to write here, worry about it later"
              />
              <PostSkeleton variant="top" />
            </View>
          </Surface>
        </View>
      </DialogContent>
    </Dialog>
  );
}
