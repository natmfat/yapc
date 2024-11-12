import { RemixLoader } from "remix-endpoint";
import { authenticator } from "~/services/auth.server";

import { z } from "zod";
import { ROUTE as LOGIN_ROUTE } from "./login";
import { UserProviderDataStrategy } from "~/.server/database/client";

export const loader = new RemixLoader()
  .register({
    validate: {
      params: z.object({ strategy: z.nativeEnum(UserProviderDataStrategy) }),
    },
    handler: ({ params: { strategy }, context: { request } }) => {
      return authenticator.authenticate(strategy, request, {
        successRedirect: "/",
        failureRedirect: LOGIN_ROUTE,
      });
    },
  })
  .create();
