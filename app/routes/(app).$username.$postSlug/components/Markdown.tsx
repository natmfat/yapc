import { Anchor } from "natmfat/components/Anchor";
import { Heading } from "natmfat/components/Heading";
import { Separator } from "natmfat/components/Separator";
import { Text } from "natmfat/components/Text";
import { View } from "natmfat/components/View";
import MarkdownRoot from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeView } from "~/components/CodeView";
import { omit } from "~/lib/utils";

export function Markdown({ body }: { body: string }) {
  return (
    <MarkdownRoot
      remarkPlugins={[remarkGfm]}
      className="flex flex-col [&>:first-child]:mt-0"
      components={{
        h1: (props) => (
          <Heading
            {...omit(props, ["node"])}
            color="default"
            level={1}
            size="headerBig"
            className="mt-6"
          />
        ),
        h2: (props) => (
          <Heading
            {...omit(props, ["node"])}
            color="default"
            level={1}
            size="headerDefault"
            className="mt-6"
          />
        ),
        h3: (props) => (
          <Heading
            {...omit(props, ["node"])}
            color="default"
            level={1}
            size="subheadBig"
            className="mt-4"
          />
        ),
        h4: (props) => (
          <Heading
            {...omit(props, ["node"])}
            color="default"
            level={1}
            size="subheadDefault"
            className="mt-4"
          />
        ),
        h5: (props) => (
          <Heading
            {...omit(props, ["node"])}
            color="default"
            level={1}
            size="subheadDefault"
            className="mt-2"
          />
        ),
        p: (props) => (
          <Text
            {...omit(props, ["node"])}
            multiline
            color="default"
            className="mt-2"
          />
        ),
        hr: () => <Separator />,
        ul: (props) => (
          <ul {...omit(props, ["node"])} className="list-disc pl-6 mt-2" />
        ),
        ol: (props) => (
          <ul {...omit(props, ["node"])} className="list-decimal pl-6 mt-2" />
        ),
        li: (props) => (
          <li
            {...omit(props, ["node"])}
            className="[&>ul]:mt-0 [&>ol]:mt-0 align-middle"
          />
        ),
        a: ({ href, ...props }) => (
          <Anchor
            {...omit(props, ["node"])}
            href={href}
            {...(isExternal(href)
              ? {
                  target: "_blank",
                  rel: "noreferrer",
                }
              : {})}
          />
        ),
        code: ({ className, ...props }) => {
          return (
            <CodeView
              className="mt-2"
              {...omit(props, ["node"])}
              language={getLanguage(className)}
            />
          );
        },
        // eslint-disable-next-line
        img: ({ alt, ...props }) => (
          // @todo alt should be rendered in small text underneath
          <View className="flex-col items-center justify-center gap-2 mt-2 text-center">
            <View className="rounded-default border border-interactive bg-surface overflow-hidden">
              <img
                {...omit(props, ["node"])}
                alt={
                  alt ||
                  "This image does not have a description. Please @ me on my socials to fix this as soon as possible!"
                }
                className="w-full height-auto"
              />
            </View>
            {alt ? (
              <Text size="small" color="dimmer" multiline>
                {alt}
              </Text>
            ) : null}
          </View>
        ),
      }}
    >
      {body}
    </MarkdownRoot>
  );
}

function getLanguage(className: string = "") {
  const language = (/language-(\w+)/.exec(className) || [])[0];
  return language ? language.substring("language-".length) : "text";
}

function isExternal(href?: string) {
  return href?.startsWith("https://");
}
