import { redirect } from "@remix-run/node";
import { RemixAction } from "remix-endpoint";
import { UserProviderStrategy } from "@prisma/client";
import { authenticator } from "~/services/auth.server";
import { z } from "zod";
import { ROUTE as LOGIN_ROUTE } from "./login";

export function createRoute(strategy: UserProviderStrategy) {
  return `/auth/${strategy}`;
}

export async function loader() {
  return redirect(LOGIN_ROUTE);
}

export const action = new RemixAction()
  .register({
    validate: {
      params: z.object({ strategy: z.nativeEnum(UserProviderStrategy) }),
    },
    handler: ({ params: { strategy }, context: { request } }) => {
      return authenticator.authenticate(strategy, request);
    },
  })
  .create();
