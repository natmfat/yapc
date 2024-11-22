import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import { GitHubStrategy } from "remix-auth-github";
import invariant from "invariant";
import { zfd } from "zod-form-data";
import { Router } from "remix-endpoint";
import bcrypt from "bcryptjs";
import { prisma } from "~/.server/prisma";
import { User, UserProviderStrategy } from "@prisma/client";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User>(sessionStorage);

invariant(process.env.GITHUB_CLIENT_ID, "expected github client id");
invariant(process.env.GITHUB_CLIENT_SECRET, "expected github client secret");
invariant(process.env.GITHUB_REDIRECT_URI, "expected github redirect uri");

const formStrategySchema = zfd.formData({
  email: zfd.text(),
  password: zfd.text(),
});

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const { email, password } = await formStrategySchema.parseAsync(form);

    // find corresponding provider w/ details
    const provider = await prisma.userProvider
      .findFirstOrThrow({
        select: { profilePassword: true, user: true },
        where: {
          strategy: UserProviderStrategy.FORM,
          profileId: email,
        },
      })
      .catch(() => null);
    Router.assertResponse(provider, "a user with this email does not exist");

    // provider does exist, check password & return user data
    const result = await bcrypt.compare(password, provider.profilePassword);
    Router.assertResponse(result, "incorrect password");
    return provider.user;
  }),
  UserProviderStrategy.FORM
);

authenticator.use(
  new GitHubStrategy(
    {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      redirectURI: process.env.GITHUB_REDIRECT_URI,
    },
    async ({ profile, tokens, request, context }) => {
      // Get the user data from your DB or API using the tokens and profile
      // return shitgen.user.findOrCreate({ email: profile.emails[0].value });
      return {} as User;
    }
  ),
  UserProviderStrategy.GITHUB
);
