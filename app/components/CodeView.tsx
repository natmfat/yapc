import { InlineCode } from "natmfat/components/InlineCode";
import { useThemeContext } from "natmfat/components/ThemeProvider";
import { View } from "natmfat/components/View";
import { cn } from "natmfat/lib/cn";
import { ComponentProps, ReactNode, useMemo } from "react";
import { CodeBlock, solarizedDark, solarizedLight } from "react-code-blocks";

type CodeBlockProps = ComponentProps<typeof CodeBlock>;

export function CodeView({
  className,
  children,
  ...props
}: Omit<CodeBlockProps, "text" | "ref"> & {
  language: string;
  className?: string;
  children?: ReactNode;
}) {
  const { theme } = useThemeContext();
  const text = useMemo(() => getNodeText(children).trim(), [children]);

  const codeBlockProps = {
    ...props,
    text,
    theme: theme === "light" ? solarizedLight : solarizedDark,
    showLineNumbers: true,
  } satisfies CodeBlockProps;

  if (!text.includes("\n")) {
    return <InlineCode>{text}</InlineCode>;
  }

  return (
    <View
      className={cn(
        className,
        "border border-interactive rounded-default overflow-hidden bg-surface"
      )}
    >
      <CodeBlock {...codeBlockProps} />
    </View>
  );
}

// https://stackoverflow.com/questions/34204975/react-is-there-something-similar-to-node-textcontent
function getNodeText(node: ReactNode): string {
  if (node == null) return "";

  switch (typeof node) {
    case "string":
    case "number":
      return node.toString();

    case "boolean":
      return "";

    case "object": {
      if (node instanceof Array) {
        return node.map(getNodeText).join("");
      }

      if ("props" in node) {
        return getNodeText(node.props.children);
      }
    }

    // eslint-ignore-line no-fallthrough
    default:
      console.warn("Unresolved `node` of type:", typeof node, node);
      return "";
  }
}
