import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { UserProviderStrategy } from "@prisma/client";
import { authenticator } from "~/services/auth.server";
import { ROUTE as LOGIN_ROUTE } from "./(auth).login";
import { ROUTE as DASHBOARD_ROUTE } from "./(app)._index";
import { validateStrategy } from "./(auth)/lib/utils.server";

export function createRoute(strategy: UserProviderStrategy) {
  return `/auth/${strategy}`;
}

export async function loader() {
  return redirect(LOGIN_ROUTE);
}

export async function action({ request, params }: ActionFunctionArgs) {
  const strategy = await validateStrategy(params.strategy);
  return authenticator.authenticate(strategy, request, {
    successRedirect: DASHBOARD_ROUTE,
    failureRedirect: LOGIN_ROUTE,
  });
}

// @todo upgrade remix-auth to 4.0.0
