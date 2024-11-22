import { LoaderFunctionArgs } from "@remix-run/node";
import { Router } from "remix-endpoint";
import { notFound } from "~/.server/routeUtils";
import { UserProviderStrategy } from "@prisma/client";
import { z } from "zod";

const schema = z.nativeEnum(UserProviderStrategy);

export async function validateStrategy(strategy?: string): Promise<string> {
  Router.assertResponse(strategy, notFound());
  Router.assertResponse(
    (await schema.safeParseAsync(strategy)).success,
    notFound()
  );
  return strategy;
}
