import { PostUpdateType, shitgen, UserProviderStrategy } from "./client";
import bcrypt from "bcryptjs";

/**
 * Execute an array of promises in order \
 * Use when order of data actually matters in seeding process (anywhere where you hard code an ID)
 * @param promises Array of promises
 */
async function sequential(promises: Array<Promise<unknown>>) {
  for (const promise of promises) {
    await promise;
  }
}

async function main() {
  // create user & providers
  await shitgen.user.create({
    data: {
      avatar_url: "https://natmfat.com/logo.png",
      username: "natmfat",
    },
  });
  await shitgen.userProvider.create({
    data: {
      strategy: UserProviderStrategy.FORM,
      user_id: 1,
      profile_id: "natmfat",
      profile_password: await bcrypt.hash("lmao", 1),
    },
  });
  await shitgen.userProvider.create({
    data: {
      strategy: UserProviderStrategy.GITHUB,
      user_id: 1,
      profile_id: "natmfat",
      profile_password: "",
    },
  });

  // create user roles
  await sequential(
    ["moderator", "developer", "subscriber"].map((role) =>
      shitgen.role.create({ data: { name: role, description: "", level: 0 } })
    )
  );

  // create tags
  await sequential(
    ["python", "javascript", "ai", "app"].map((tag) =>
      shitgen.tag.create({
        data: { name: tag, approved: true },
      })
    )
  );

  await sequential(
    ["html", "fun", "game", "simple", "java"].map((tag) =>
      shitgen.tag.create({
        data: { name: tag },
      })
    )
  );

  // create posts
  await shitgen.post.create({
    data: {
      heading: "IDE from the future",
      body: "I've been really excited about Replit Desktop!",
      user_id: 1,
      thumbnail_url: "https://natmfat.com/logo.png",
      update_type: PostUpdateType.UPDATE,
    },
  });
  await shitgen.post.create({
    data: {
      heading: "Welcome to Yet Another Programming Community!",
      body: "Idk what to write here, worry about it later",
      user_id: 1,
      thumbnail_url: "https://natmfat.com/logo.png",
      update_type: PostUpdateType.UPDATE,
    },
  });

  process.exit(0);
}

main();
