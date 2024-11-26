import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { View } from "natmfat/components/View";
import { RemixAction, Router } from "remix-endpoint";
import { prisma } from "~/.server/prisma";
import { notAuthorized, notFound } from "~/.server/routeUtils";
import { Author } from "../(app)/components/Author";
import { Heading } from "natmfat/components/Heading";
import { Button } from "natmfat/components/Button";
import { RiShiningIcon } from "natmfat/icons/RiShiningIcon";
import { Timestamp } from "natmfat/components/Timestamp";
import { RiAddIcon } from "natmfat/icons/RiAddIcon";
import { tokens } from "natmfat/lib/tokens";
import { Text } from "natmfat/components/Text";
import { RiLinkIcon } from "natmfat/icons/RiLinkIcon";
import { Pill } from "natmfat/components/Pill";
import { MultilineInput } from "natmfat/components/MultilineInput";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "natmfat/components/Tabs";
import { MarkdownInput } from "./components/MarkdownInput";
import { Image } from "~/components/Image";
import { useToastContext } from "natmfat/components/Toast";
import { useCallback } from "react";
import { copyToClipboard } from "natmfat/lib/copyToClipboard";
import { createIntent } from "remix-endpoint/react/createIntent";
import { zfd } from "zod-form-data";
import { authenticator } from "~/services/auth.server";
import { redirectBack } from "remix-utils/redirect-back";
import { ROUTE as DASHBOARD_ROUTE } from "../(app)._index";

enum ActionIntent {
  STAR_POST = "star_post",
  CREATE_COMMENT = "create_comment",
}

const Intent = createIntent<ActionIntent>();

export const action = new RemixAction()
  .register({
    intent: ActionIntent.STAR_POST,
    validate: {
      formData: zfd.formData({ postId: zfd.numeric() }),
    },
    handler: async ({ formData: { postId }, context: { request } }) => {
      // require auth
      const user = await authenticator.isAuthenticated(request);
      Router.assertResponse(user, notAuthorized());

      // determine if user has starred or not
      const starred = await prisma.post
        .findFirst({
          select: { id: true },
          where: {
            id: postId,
            stars: {
              some: {
                id: user.id,
              },
            },
          },
        })
        .then((r) => Boolean(r));

      // update post with star
      await prisma.post.update({
        where: { id: postId },
        data: {
          stars: starred
            ? { disconnect: { id: user.id } }
            : { connect: { id: user.id } },
        },
      });

      return redirectBack(request, {
        fallback: DASHBOARD_ROUTE,
      });
    },
  })
  .create();

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
    include: {
      author: true,
      tags: true,
      _count: {
        select: {
          stars: true,
        },
      },
    },
  });

  Router.assertResponse(post, notFound());

  return { post };
}

export function createRoute(username: string, postSlug: string) {
  return `/${username}/${postSlug}`;
}

export default function PostPage() {
  const { post } = useLoaderData<typeof loader>();

  const route = createRoute(post.author.username, post.slug);
  const { addToast } = useToastContext();
  const copyLink = useCallback(() => {
    copyToClipboard(new URL(route, location.href).toString());
    addToast({
      type: "success",
      message: "Copied to clipboard",
    });
  }, [addToast]);

  return (
    <View className="gap-2">
      <Image src={post.thumbnailUrl} className="w-full aspect-[12/5]" />

      <View className="flex-row gap-2 justify-between">
        <Heading size="headerDefault" className="flex-1">
          {post.heading}
        </Heading>

        <View className="flex-row gap-2 flex-shrink-0">
          <Button onClick={copyLink}>
            <RiLinkIcon />
            Copy Link
          </Button>
          <Form action={route} method="POST">
            <Intent value={ActionIntent.STAR_POST} />
            <input type="hidden" name="postId" value={post.id} />
            <Button type="submit">
              <RiShiningIcon /> {post._count.stars}
            </Button>
          </Form>
        </View>
      </View>

      <View className="flex-row gap-1 items-center">
        <Author user={post.author} />
        <span className="text-foreground-dimmer flex flex-row items-center gap-1">
          published an {post.type.toLocaleLowerCase()}
          <span>•</span>
          <Timestamp date={post.createdAt} className="align-top" />
        </span>
      </View>

      {/* {post.tags.map(({ name }) => (
        <Pill>#{name}</Pill>
      ))} */}

      <View>{post.body}</View>

      <MarkdownInput placeholder="Add your comment here..." />
      <Button color="primary" className="w-fit self-end" disabled>
        Comment
      </Button>
    </View>
  );
}

// different view depending on type
