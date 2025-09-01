import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

// Add graceful shutdown
process.on("beforeExit", async () => {
  await db.$disconnect();
});
