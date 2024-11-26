import { Form } from "@remix-run/react";
import { ComponentProps, useState } from "react";
import { MarkdownInput } from "./MarkdownInput";
import { Button } from "natmfat/components/Button";
import { View } from "natmfat/components/View";

interface MarkdownFormProps extends ComponentProps<typeof Form> {
  onCancel?: () => void;
}

export function MarkdownForm({
  children,
  onCancel,
  ...props
}: MarkdownFormProps) {
  const [body, setBody] = useState("");
  return (
    <View asChild className="gap-2">
      <Form {...props}>
        {children}
        <MarkdownInput
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          required
          name="body"
          placeholder="Add your comment here..."
        />
        <View className="flex-row gap-2 justify-end items-end">
          {onCancel ? (
            <Button type="button" onClick={onCancel}>
              Cancel
            </Button>
          ) : null}
          <Button
            type="submit"
            color="primary"
            disabled={body.trim().length === 0}
          >
            Comment
          </Button>
        </View>
      </Form>
    </View>
  );
}
