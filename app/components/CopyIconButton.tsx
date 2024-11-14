import { IconButton, IconButtonProps } from "natmfat/components/IconButton";
import { RiCheckIcon } from "natmfat/icons/RiCheckIcon";
import { RiClipboardIcon } from "natmfat/icons/RiClipboardIcon";
import { ReactNode, useRef, useState } from "react";
import { useIsMounted } from "~/hooks/useIsMounted";

interface CopyIconButtonProps {
  text: string;
  delay?: number;
  icon?: ReactNode;
}

export function CopyIconButton({
  text,
  icon,
  delay = 750,
  ...props
}: CopyIconButtonProps & Omit<IconButtonProps, "alt">) {
  const [showCheck, setShowCheck] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();
  const isMounted = useIsMounted();

  icon = icon || <RiClipboardIcon />;

  return (
    <IconButton
      alt="Copy"
      onClick={async () => {
        await navigator.clipboard.writeText(text);

        // show check for brief period of time
        setShowCheck(true);
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          if (isMounted.current) {
            setShowCheck(false);
          }
        }, delay);
      }}
      {...props}
    >
      {showCheck ? <RiCheckIcon className="text-green-default" /> : icon}
    </IconButton>
  );
}
