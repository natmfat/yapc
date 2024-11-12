import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { GitHubStrategyDefaultName } from "remix-auth-github";
import { authenticator } from "~/services/auth.server";

export async function loader() {
  return redirect("/login");
}

export async function action({ request }: ActionFunctionArgs) {
  return authenticator.authenticate(GitHubStrategyDefaultName, request);
}
