import { Authenticator } from "remix-auth";
import {
  shitgen,
  UserData,
  UserProviderDataStrategy,
} from "~/.server/database/client";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import { GitHubStrategy } from "remix-auth-github";
import invariant from "invariant";
import { zfd } from "zod-form-data";
import { Router } from "remix-endpoint";
import bcrypt from "bcrypt";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<UserData>(sessionStorage);

export const FormStrategyDefaultName = "form-strategy";

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
    const provider = await shitgen.userProvider.find({
      select: ["profile_password"],
      where: {
        strategy: UserProviderDataStrategy.FORM,
        profile_id: email,
      },
      include: {
        user_id: true,
      },
    });
    Router.assertResponse(provider, "a user with this email does not exist");

    // provider does exist, check password & return user data
    const result = await bcrypt.compare(password, provider.profile_password);
    Router.assertResponse(result, "incorrect password");
    return provider.user_id;
  }),
  FormStrategyDefaultName
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
      return {} as UserData;
    }
  )
);
