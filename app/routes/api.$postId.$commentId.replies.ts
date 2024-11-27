import { LoaderFunctionArgs } from "@remix-run/node";
import { RemixLoader, Router } from "remix-endpoint";
import { z } from "zod";
import { prisma } from "~/.server/prisma";

export function createRoute(postId: number, commentId: number) {
  return `/api/${postId}/${commentId}/replies`;
}

export const loader = new RemixLoader()
  .register({
    validate: {
      params: z.object({
        postId: z.number({ coerce: true }),
        commentId: z.number({ coerce: true }),
      }),
    },
    handler: async ({ params: { postId, commentId } }) => {
      try {
        const replies = await prisma.comment.findMany({
          where: { postId, parentId: commentId },
          include: {
            author: true,
            _count: {
              select: {
                replies: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return Router.standardResponse(
          true,
          "Successfully retreived comment replies",
          {
            replies,
          }
        );
      } catch (error) {
        console.error(error);
        return Router.standardResponse(
          false,
          "Failed to retreive comment replies, check logs"
        );
      }
    },
  })
  .create();
