import { Button } from "natmfat/components/Button";
import { Heading } from "natmfat/components/Heading";
import { View } from "natmfat/components/View";
import { RiGithubIcon } from "natmfat/icons/RiGithubIcon";
import { Logo } from "../(app)/components/Header/Logo";
import { tokens } from "natmfat/lib/tokens";
import { Surface } from "natmfat/components/Surface";
import { RiGoogleIcon } from "natmfat/icons/RiGoogleIcon";
import { RiDiscordIcon } from "natmfat/icons/RiDiscordIcon";
import { Input } from "natmfat/components/Input";
import { Anchor } from "natmfat/components/Anchor";
import { Separator } from "natmfat/components/Separator";
import { Text } from "natmfat/components/Text";
import { RiGlobalIcon } from "natmfat/icons/RiGlobalIcon";
import { RiQuestionMarkIcon } from "natmfat/icons/RiQuestionMarkIcon";
import { RiArticleIcon } from "natmfat/icons/RiArticleIcon";
import { RiGamepadIcon } from "natmfat/icons/RiGamepadIcon";
import { Feature } from "./components/Feature";
import { Form } from "@remix-run/react";
import { createRoute } from "../auth.$strategy";
import { UserProviderStrategy } from "@prisma/client";

export const ROUTE = "/login";

export default function Login() {
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
          <Heading size="headerDefault">Log in to your account</Heading>

          <View className="gap-2" asChild>
            <Form action={createRoute(UserProviderStrategy.FORM)}>
              <Input placeholder="Email or username" />
              <Input placeholder="Password" />
              <Button color="primary">Log In</Button>
            </Form>
          </View>

          <Anchor>Forgot password?</Anchor>

          <View className="gap-2">
            <Button>
              <RiGoogleIcon />
              Continue with Google
            </Button>
            <Button>
              <RiGithubIcon />
              Continue with GitHub
            </Button>
            <Button>
              <RiDiscordIcon />
              Continue with Discord
            </Button>
          </View>

          <Separator />

          <View className="gap-2">
            <Text>
              New to YAPC? <Anchor>Sign up</Anchor>
            </Text>

            <Text multiline>
              By continuing, you agree to YAPC's{" "}
              <Anchor>Terms of Service</Anchor> and{" "}
              <Anchor>Privacy Policy</Anchor>.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
