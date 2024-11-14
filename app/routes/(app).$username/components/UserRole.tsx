import { Label, LabelProps } from "natmfat/components/Label";
import { RiHourglassIcon } from "natmfat/icons/RiHourglassIcon";
import { RiTerminalIcon } from "natmfat/icons/RiTerminalIcon";

const roleDetails: Record<
  string,
  Partial<LabelProps> & Pick<LabelProps, "name">
> = {
  developer: {
    color: "orange",
    name: "Developer",
    tagline: "Official maintainer of Gitlocker",
    icon: <RiTerminalIcon />,
  },
  early_access: {
    color: "green",
    name: "Early Access",
    tagline: "Beta users of Gitlocker",
    icon: <RiHourglassIcon />,
  },
};

export function UserRole({ role }: { role: string }) {
  return role in roleDetails ? (
    <Label {...roleDetails[role]} className="w-fit" />
  ) : null;
}
