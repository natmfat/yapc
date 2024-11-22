import { authenticator } from "~/services/auth.server";
import { ROUTE as DASHBOARD_ROUTE } from "./(app)._index";
import { ROUTE as LOGIN_ROUTE } from "./(auth).login";
import { LoaderFunctionArgs } from "@remix-run/node";
import { validateStrategy } from "./(auth)/lib/utils.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const strategy = await validateStrategy(params.strategy);
  return authenticator.authenticate(strategy, request, {
    successRedirect: DASHBOARD_ROUTE,
    failureRedirect: LOGIN_ROUTE,
  });
}
