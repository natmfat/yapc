import { Label, LabelProps } from "natmfat/components/Label";
import { RiHourglassIcon } from "natmfat/icons/RiHourglassIcon";
import { RiTerminalIcon } from "natmfat/icons/RiTerminalIcon";
import { UserRole as UserRoleEnum } from "@prisma/client";
import { RiSquareIcon } from "natmfat/icons/RiSquareIcon";

const roleDetails: Record<
  UserRoleEnum,
  Partial<LabelProps> & Pick<LabelProps, "name">
> = {
  [UserRoleEnum.DEVELOPER]: {
    color: "orange",
    name: "Developer",
    tagline: "Official maintainer of Gitlocker",
    icon: <RiTerminalIcon />,
  },
  [UserRoleEnum.EARLY_ACCESS]: {
    color: "green",
    name: "Early Access",
    tagline: "Beta users of Gitlocker",
    icon: <RiHourglassIcon />,
  },
  [UserRoleEnum.CORE]: {
    color: "orange",
    name: "Core",
    tagline: "Subscribers to YAPC",
    icon: <RiSquareIcon />,
  },
};

export function UserRole({ role }: { role: string }) {
  return role in roleDetails ? (
    <Label {...roleDetails[role as UserRoleEnum]} className="w-fit" />
  ) : null;
}
