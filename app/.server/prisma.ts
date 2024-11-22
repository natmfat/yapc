import { PrismaClient } from "@prisma/client";
import invariant from "invariant";

invariant(process.env.DATABASE_URL, "Expected database url");

declare global {
  // @audit-ok actually necessary var magic
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.__prisma__) {
    global.__prisma__ = new PrismaClient();
  }
  prisma = global.__prisma__;
  prisma.$connect();
}

export { prisma };
