import { RemixLoader } from "remix-endpoint";
import { authenticator } from "~/services/auth.server";

import { z } from "zod";
import { ROUTE as LOGIN_ROUTE } from "./(auth).login";
import { UserProviderStrategy } from "@prisma/client";

export const loader = new RemixLoader()
  .register({
    validate: {
      params: z.object({ strategy: z.nativeEnum(UserProviderStrategy) }),
    },
    handler: ({ params: { strategy }, context: { request } }) => {
      return authenticator.authenticate(strategy, request, {
        successRedirect: "/",
        failureRedirect: LOGIN_ROUTE,
      });
    },
  })
  .create();
