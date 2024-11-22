import { Heading } from "natmfat/components/Heading";
import { View } from "natmfat/components/View";
import { Logo } from "../(app)/components/Header/Logo";
import { tokens } from "natmfat/lib/tokens";
import { Surface } from "natmfat/components/Surface";
import { RiGlobalIcon } from "natmfat/icons/RiGlobalIcon";
import { RiQuestionMarkIcon } from "natmfat/icons/RiQuestionMarkIcon";
import { RiArticleIcon } from "natmfat/icons/RiArticleIcon";
import { RiGamepadIcon } from "natmfat/icons/RiGamepadIcon";
import { Feature } from "./components/Feature";
import { Outlet } from "@remix-run/react";

export default function AuthPage() {
  return (
    <View className="grid grid-cols-2 h-screen">
      <Surface
        className="p-8"
        elevated
        style={{
          background: `radial-gradient(circle at bottom, ${tokens.backgroundHigher}, transparent)`,
        }}
      >
        <Logo />

        <View className="gap-6 mt-28 text-center">
          <Heading>Share software, better</Heading>

          <ul className="grid grid-cols-2 gap-4">
            <Feature
              icon={<RiQuestionMarkIcon />}
              text="Get feedback on your work from a community of passionate developers."
            />
            <Feature
              icon={<RiArticleIcon />}
              text="Publish long form content, from project updates to in-depth tutorials."
            />
            <Feature
              icon={<RiGamepadIcon />}
              text="Compete on a global leaderboard by helping others. Knowledge, gamified."
            />
            <Feature
              icon={<RiGlobalIcon />}
              text="Join an active community of programmers from all over the world."
            />
          </ul>
        </View>
      </Surface>
      <View>
        <View className="h-full gap-6 justify-center max-w-xs w-full mx-auto">
          <Outlet />
        </View>
      </View>
    </View>
  );
}
