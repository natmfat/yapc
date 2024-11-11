import { Authenticator } from "remix-auth";
import { shitgen, UserData } from "~/.server/database/client";
import { sessionStorage } from "~/services/session.server";
import { GitHubStrategy } from "remix-auth-github";
import invariant from "invariant";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<UserData>(sessionStorage);

invariant(process.env.GITHUB_CLIENT_ID, "expected github client id");
invariant(process.env.GITHUB_CLIENT_SECRET, "expected github client secret");
invariant(process.env.GITHUB_REDIRECT_URI, "expected github redirect uri");

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
