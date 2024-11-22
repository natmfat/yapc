import { ROUTE as LOGIN_ROUTE } from "./(auth).login";
import { authenticator } from "~/services/auth.server";

export const ROUTE = "/logout";

async function resource({ request }: { request: Request }) {
  await authenticator.logout(request, { redirectTo: LOGIN_ROUTE });
}

export { resource as action, resource as loader };
