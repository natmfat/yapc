import { Button } from "natmfat/components/Button";
import { Heading } from "natmfat/components/Heading";
import { View } from "natmfat/components/View";
import { RiGithubIcon } from "natmfat/icons/RiGithubIcon";
import { RiGoogleIcon } from "natmfat/icons/RiGoogleIcon";
import { RiDiscordIcon } from "natmfat/icons/RiDiscordIcon";
import { Input } from "natmfat/components/Input";
import { Anchor } from "natmfat/components/Anchor";
import { Separator } from "natmfat/components/Separator";
import { Text } from "natmfat/components/Text";
import { Form, Link } from "@remix-run/react";
import { createRoute } from "../auth.$strategy";
import { UserProviderStrategy } from "@prisma/client";
import { ROUTE as LOGIN_ROUTE } from "../(auth).login";

export const ROUTE = "/signup";

export default function LoginPage() {
  return (
    <>
      <Heading size="headerDefault">Create an account</Heading>

      <View className="gap-2" asChild>
        <Form action={createRoute(UserProviderStrategy.FORM)}>
          <Input placeholder="Email " />
          <Input placeholder="Password" />
          <Button color="primary">Create Account</Button>
        </Form>
      </View>

      <Separator />

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
          Already have an account?{" "}
          <Anchor asChild>
            <Link to={LOGIN_ROUTE}>Log in</Link>
          </Anchor>
        </Text>

        <Text multiline>
          By continuing, you agree to YAPC's <Anchor>Terms of Service</Anchor>{" "}
          and <Anchor>Privacy Policy</Anchor>.
        </Text>
      </View>
    </>
  );
}
