import { Prisma } from "@prisma/client";

export function getStars(
  user: Pick<
    Prisma.UserGetPayload<{ include: { posts: true; comments: true } }>,
    "posts" | "comments"
  >
) {
  let stars = 0;
  for (const post of user.posts) {
    stars += post.stars;
  }
  for (const comment of user.comments) {
    stars += comment.stars;
  }
  return stars;
}
