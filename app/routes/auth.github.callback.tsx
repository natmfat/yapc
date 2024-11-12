import type { LoaderFunctionArgs } from "@remix-run/node";
import { GitHubStrategyDefaultName } from "remix-auth-github";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  return authenticator.authenticate(GitHubStrategyDefaultName, request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
}
