import { UserRole } from "@prisma/client";
import { Router } from "remix-endpoint";
import { authenticator } from "~/services/auth.server";

export function notFound() {
  return new Response(null, { status: 404 });
}

export function notAuthorized() {
  return new Response(null, { status: 401 });
}

/**
 * Protect route by requiring users to be logged in \
 *
 * Generally only useful in APIs, not so much for pages \
 * because we want our forum to be public
 * @param request
 */
export async function asssertUser(request: Request) {
  const user = await authenticator.isAuthenticated(request);
  Router.assertResponse(user, notAuthorized());
  return user;
}
