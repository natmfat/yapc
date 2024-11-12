import { shitgen, UserProviderDataStrategy } from "./client";
import bcrypt from "bcrypt";
async function main() {
  await Promise.all([
    // create users
    shitgen.user.create({
      data: {
        avatar_url: "https://natmfat.com/logo.png",
        username: "natmfat",
      },
    }),

    // create user providers
    shitgen.userProvider.create({
      data: {
        strategy: UserProviderDataStrategy.FORM,
        user_id: 0,
        profile_id: "natmfat",
        profile_password: await bcrypt.hash("lmao", 1),
      },
    }),
    shitgen.userProvider.create({
      data: {
        strategy: UserProviderDataStrategy.GITHUB,
        user_id: 0,
        profile_id: "natmfat",
        profile_password: "",
      },
    }),

    // create user roles
    ...["moderator", "developer", "subscriber"].map((role) =>
      shitgen.role.create({ data: { name: role, description: "", level: 0 } })
    ),

    // create "approved" tags
    ...["python", "javascript", "ai", "app"].map((tag) =>
      shitgen.tag.create({
        data: { name: tag, approved: true },
      })
    ),

    // create user-defined tags
    ...["html", "fun", "game", "simple", "java"].map((tag) =>
      shitgen.tag.create({
        data: { name: tag },
      })
    ),

    // create update types
    ...["update", "project", "post"].map((type) =>
      shitgen.postUpdateType.create({
        data: {
          name: type,
        },
      })
    ),

    // create posts
    shitgen.post.create({
      data: {
        heading: "IDE from the future",
        body: "I've been really excited about Replit Desktop!",
        user_id: 0,
        update_type_id: 0,
      },
    }),
    shitgen.post.create({
      data: {
        heading: "Welcome to Yet Another Programming Community!",
        body: "Idk what to write here, worry about it later",
        user_id: 0,
        update_type_id: 0,
      },
    }),
  ]);
  process.exit(0);
}

main();
