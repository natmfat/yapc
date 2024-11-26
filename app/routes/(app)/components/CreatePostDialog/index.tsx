import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "natmfat/components/Dialog";
import {
  ChangeEvent,
  Component,
  ComponentProps,
  ComponentPropsWithoutRef,
  createContext,
  Dispatch,
  ElementRef,
  forwardRef,
  Fragment,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
  TabsContent as TabsContentRoot,
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
import { RiImageIcon } from "natmfat/icons/RiImageIcon";
import { RiArrowLeftIcon } from "natmfat/icons/RiArrowLeftIcon";
import { RiUploadIcon } from "natmfat/icons/RiUploadIcon";
import { tokens } from "natmfat/lib/tokens";
import { RiAddIcon } from "natmfat/icons/RiAddIcon";
import { Pill } from "natmfat/components/Pill";
import { RiCloseIcon } from "natmfat/icons/RiCloseIcon";
import { cn } from "natmfat/lib/cn";
import { mergeRefs } from "natmfat/lib/mergeRefs";

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

const tabs = ["basics", "tags", "icon", "cover_page"] as const;

type TabValue = (typeof tabs)[number];

export function PostDialog() {
  const session = useSessionStore((store) => store.data);
  invariant(session, "expected session to exist");

  const [tab, setTab] = useState<TabValue>("tags");
  const [tags, setTags] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState("");

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

            <Tabs
              variant="progress"
              value={tab}
              onValueChange={(nextTab) => setTab(nextTab as TabValue)}
              className="h-full flex-1"
            >
              <TabsList>
                {tabs.map((tab, i) => (
                  <Fragment key={tab}>
                    <TabsTrigger value={tab}>{formatTabTitle(tab)}</TabsTrigger>
                    {i !== tabs.length - 1 ? <TabsSeparator /> : null}
                  </Fragment>
                ))}
              </TabsList>
              <TabsContent value="basics" setTab={setTab}>
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
              </TabsContent>
              <TabsContent value="tags" setTab={setTab}>
                <View className="flex-row flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Tag key={tag} name={tag} onClose={() => {}} />
                  ))}
                  <TagInput
                    value={tagValue}
                    onChange={(e) => {
                      setTagValue(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      const formattedTagValue = tagValue.trim();

                      if (
                        e.key === "Enter" &&
                        !tags.includes(formattedTagValue)
                      ) {
                        setTags((prevTags) => [...prevTags, formattedTagValue]);
                        setTagValue("");
                      } else if (
                        e.key === "Backspace" &&
                        tagValue.length === 0
                      ) {
                        setTags((prevTags) =>
                          prevTags.filter((_, i) => i < prevTags.length - 1)
                        );
                      }
                    }}
                  />
                </View>
              </TabsContent>
              <TabsContent value="icon" setTab={setTab}>
                <Button>
                  <RiImageIcon />
                  Upload an icon
                </Button>
              </TabsContent>
              <TabsContent value="cover_page" setTab={setTab}>
                <View>
                  <Button>
                    <RiImageIcon />
                    Upload a cover photo
                  </Button>
                </View>
              </TabsContent>
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

function Tag({ name, onClose }: { name: string; onClose: () => void }) {
  return (
    <View className="w-fit flex-row items-center gap-0.5 h-6 px-1.5 bg-interactive border border-interactive rounded-full select-none">
      <Text size="small">
        <span className="text-foreground-dimmest">#</span>
        <span className="text-foreground-dimmer">{name}</span>
      </Text>
      <View className="cursor-pointer" onClick={onClose}>
        <RiCloseIcon />
      </View>
    </View>
  );
}

const TagInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>(({ className, style, onChange: onChangeInner, ...props }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const resizeInput = useCallback(() => {
    if (!inputRef.current) {
      return;
    }

    const tempSpan = document.createElement("span");
    tempSpan.style.visibility = "hidden"; // Make sure it's not visible
    tempSpan.style.whiteSpace = "pre"; // Preserve spaces and formatting
    tempSpan.style.font = window.getComputedStyle(inputRef.current).font; // Use the same font as the input
    tempSpan.textContent =
      inputRef.current.value || inputRef.current.placeholder; // Use value or placeholder if empty
    document.body.appendChild(tempSpan);

    const newWidth = tempSpan.offsetWidth;
    document.body.removeChild(tempSpan);
    inputRef.current.style.width = `${newWidth}px`;
  }, []);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      resizeInput();
      if (onChangeInner) {
        onChangeInner(e);
      }
    },
    [onChangeInner]
  );

  useEffect(() => {
    resizeInput();
  }, [props.value]);

  return (
    <View className="flex-row gap-1 border border-interactive-active rounded-full focus-within:border-interactive-active w-fit items-center h-6 px-1.5 pr-2.5">
      <RiAddIcon />
      <input
        className={cn(
          "border-none outline-none text-small bg-transparent placeholder:text-foreground-dimmest px-0 py-0.5",
          className
        )}
        maxLength={60}
        onChange={onChange}
        ref={mergeRefs(ref, inputRef)}
        placeholder="Add a tag"
        {...props}
      />
    </View>
  );
});

function TabsContent({
  setTab,
  value,
  children,
  ...props
}: Omit<ComponentProps<typeof TabsContentRoot>, "value" | "asChild"> & {
  setTab: Dispatch<SetStateAction<TabValue>>;
  value: TabValue;
}) {
  const index = tabs.indexOf(value);

  return (
    <TabsContentRoot value={value} asChild {...props}>
      <View className="gap-4 h-full flex-1 relative">
        {children}

        <View className="flex-row absolute bottom-0 w-full">
          {index > 0 ? (
            <Button
              className="self-start"
              type="button"
              onClick={() => setTab(tabs[index - 1])}
            >
              <RiArrowLeftIcon /> Back
            </Button>
          ) : null}

          {index < tabs.length - 1 ? (
            <Button
              color="primary"
              className="justify-self-end ml-auto"
              type="button"
              onClick={() => setTab(tabs[index + 1])}
            >
              Next <RiArrowRightIcon />
            </Button>
          ) : null}

          {index === tabs.length - 1 ? (
            <Button
              color="primary"
              className="justify-self-end ml-auto border border-primary-stronger"
              style={{
                boxShadow: `0 0 ${tokens.space16} ${tokens.primaryDimmer}`,
              }}
              type="submit"
            >
              <RiUploadIcon />
              Publish to Community
            </Button>
          ) : null}
        </View>
      </View>
    </TabsContentRoot>
  );
}

/**
 * Convert a TabValue into a readable string with proper capitalization \
 * Allows us to use a single array as the base for all tabs
 * @param tab TabValue to convert
 * @returns Properly capitalized tab value
 *
 * @example
 * formatTabTitle("cover_page") // => "Cover Page"
 */
function formatTabTitle(tab: TabValue) {
  return tab
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");
}
