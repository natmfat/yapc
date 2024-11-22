import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Router } from "remix-endpoint";
import { prisma } from "~/.server/prisma";
import { notFound } from "~/.server/routeUtils";

export async function loader({
  params: { username, postSlug },
}: LoaderFunctionArgs) {
  Router.assertResponse(username, notFound());
  Router.assertResponse(postSlug, notFound());

  const post = await prisma.post.findFirst({
    where: {
      author: { username },
      slug: postSlug,
    },
  });

  Router.assertResponse(post, notFound());

  return { post };
}

export default function PostPage() {
  const { post } = useLoaderData<typeof loader>();
  return <p>{JSON.stringify(post)}</p>;
}
