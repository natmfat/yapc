import { prisma } from "../app/.server/prisma";
import { PostType, UserProviderStrategy } from "@prisma/client";
import bcrypt from "bcryptjs";

async function promiseSequential(promises: Array<Promise<unknown>>) {
  for (const promise of promises) {
    await promise;
  }
}

async function main() {
  await promiseSequential([
    // create users
    prisma.user.create({
      data: {
        avatarUrl: "https://natmfat.com/logo.png",
        bannerUrl: "",
        username: "natmfat",
        email: "natmfat",
      },
    }),

    // create user providers
    prisma.userProvider.create({
      data: {
        strategy: UserProviderStrategy.FORM,
        userId: 1,
        profileId: "natmfat",
        profilePassword: await bcrypt.hash("lmao", 1),
      },
    }),
    prisma.userProvider.create({
      data: {
        strategy: UserProviderStrategy.GITHUB,
        userId: 1,
        profileId: "natmfat",
        profilePassword: "",
      },
    }),

    // create "approved" tags
    ...["python", "javascript", "ai", "app"].map((tag) =>
      prisma.tag.create({
        data: { name: tag, official: true },
      })
    ),

    // create user-defined tags
    ...["html", "fun", "game", "simple", "java"].map((tag) =>
      prisma.tag.create({
        data: { name: tag },
      })
    ),

    // create posts
    prisma.post.create({
      data: {
        heading: "IDE from the future",
        slug: "ide-from-the-future",
        body: "I've been really excited about Replit Desktop!",
        authorId: 1,
        thumbnailUrl: "",
        type: PostType.ARTICLE,
        tags: {
          connectOrCreate: [
            {
              create: {
                name: "lmao",
              },
              where: {
                name: "lmao",
              },
            },
          ],
        },
      },
    }),
    prisma.post.create({
      data: {
        heading: "Welcome to Yet Another Programming Community!",
        slug: "welcome-to-yet-another-programming-community",
        body: "Idk what to write here, worry about it later",
        authorId: 1,
        thumbnailUrl: "",
        type: PostType.ARTICLE,
      },
    }),
    // like your own post
    prisma.post.update({
      where: {
        id: 1,
      },
      data: {
        stars: {
          connect: [
            {
              id: 1,
            },
          ],
        },
      },
    }),
  ]);
  process.exit(0);
}

main();
