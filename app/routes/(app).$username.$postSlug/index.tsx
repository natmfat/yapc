import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { View } from "natmfat/components/View";
import { RemixAction, Router } from "remix-endpoint";
import { prisma } from "~/.server/prisma";
import { asssertUser, notAuthorized, notFound } from "~/.server/routeUtils";
import { Author } from "../(app)/components/Author";
import { Heading } from "natmfat/components/Heading";
import { Button } from "natmfat/components/Button";
import { RiShiningIcon } from "natmfat/icons/RiShiningIcon";
import { Timestamp } from "natmfat/components/Timestamp";
import { RiLinkIcon } from "natmfat/icons/RiLinkIcon";
import { MarkdownInput } from "./components/MarkdownInput";
import { Image } from "~/components/Image";
import { useToastContext } from "natmfat/components/Toast";
import { useCallback, useState } from "react";
import { copyToClipboard } from "natmfat/lib/copyToClipboard";
import { createIntent } from "remix-endpoint/react/createIntent";
import { zfd } from "zod-form-data";
import { authenticator } from "~/services/auth.server";
import { redirectBack } from "remix-utils/redirect-back";
import { ROUTE as DASHBOARD_ROUTE } from "../(app)._index";
import { Pill } from "natmfat/components/Pill";
import { Markdown } from "./components/Markdown";
import { Comment } from "./components/Comment";
import { MarkdownForm } from "./components/MarkdownForm";

export enum ActionIntent {
  CREATE_COMMENT = "create_comment",
  UPDATE_COMMENT = "update_comment",
  DELETE_COMMENT = "delete_comment",
  STAR_POST = "star_post",
}

export const Intent = createIntent<ActionIntent>();

// @todo catch in case post id/parent id does not exist

export const action = new RemixAction({ logError: console.log })
  .register({
    intent: ActionIntent.CREATE_COMMENT,
    validate: {
      formData: zfd.formData({
        parentId: zfd.numeric().optional(),
        postId: zfd.numeric(),
        body: zfd.text(),
      }),
    },
    handler: async ({
      formData: { parentId, postId, body },
      context: { request },
    }) => {
      const user = await asssertUser(request);
      await prisma.comment.create({
        data: {
          authorId: user.id,
          parentId,
          postId,
          body,
          // automatically upvote your own comment
          stars: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      // technically could return anything here and Remix would handle it fine,
      // but this should be a good form
      return redirectBack(request, {
        fallback: DASHBOARD_ROUTE,
      });
    },
  })
  .register({
    intent: ActionIntent.UPDATE_COMMENT,
    validate: {
      formData: zfd.formData({
        postId: zfd.numeric(),
        commentId: zfd.numeric(),
        body: zfd.text(),
      }),
    },
    handler: async () => {},
  })
  .register({
    intent: ActionIntent.DELETE_COMMENT,
    validate: {
      formData: zfd.formData({
        postId: zfd.numeric(),
        commentId: zfd.numeric(),
      }),
    },
    handler: async () => {},
  })
  .register({
    intent: ActionIntent.STAR_POST,
    validate: {
      formData: zfd.formData({ postId: zfd.numeric() }),
    },
    handler: async ({ formData: { postId }, context: { request } }) => {
      // require auth to upvote posts
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

      // link or unlink user from stars, which effectively toggles your upvote
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
      author: { select: { username: true, avatarUrl: true } },
      tags: {
        select: {
          name: true,
        },
      },
      comments: {
        where: {
          parentId: null,
        },
        include: {
          author: true,
          replies: {
            include: {
              author: { select: { username: true, avatarUrl: true } },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      _count: {
        select: {
          stars: true,
        },
      },
    },
  });

  Router.assertResponse(post, notFound());

  // add view (maybe in the future save this like stars, which would allow a "history" tab)
  await prisma.post.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  });

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
          <Form method="POST">
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

      <View className="flex-row flex-wrap gap-2">
        {post.tags.map(({ name }) => (
          <Pill key={name}>#{name}</Pill>
        ))}
      </View>

      {post.body ? <Markdown body={post.body} /> : null}

      <View asChild>
        <MarkdownForm method="POST">
          <Intent value={ActionIntent.CREATE_COMMENT} />
          <input type="hidden" name="postId" value={post.id} />
        </MarkdownForm>
      </View>

      <View className="gap-4">
        {post.comments.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </View>
    </View>
  );
}

// different view depending on type
