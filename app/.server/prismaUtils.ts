import { Prisma } from "@prisma/client";
import slugify from "slugify";
import { prisma } from "./prisma";

export function getStars(
  user: Pick<
    Prisma.UserGetPayload<{
      include: {
        posts: {
          select: {
            _count: {
              select: {
                stars: true;
              };
            };
          };
        };
        comments: {
          select: {
            _count: {
              select: {
                stars: true;
              };
            };
          };
        };
      };
    }>,
    "posts" | "comments"
  >
) {
  let stars = 0;
  for (const post of user.posts) {
    stars += post._count.stars;
  }
  for (const comment of user.comments) {
    stars += comment._count.stars;
  }
  return stars;
}

// max url length is 2048 characters, this seems reasonable
const MAX_SLUG_LENGTH = 1000;

export async function slugifyPostHeading(heading: string) {
  let slug = slugify(heading).substring(0, MAX_SLUG_LENGTH);
  let attempt = 0;

  while ((await prisma.post.count({ where: { slug } })) > 0) {
    attempt += 1;
    slug = `${slug}-${attempt}`;
  }

  return slug;
}
