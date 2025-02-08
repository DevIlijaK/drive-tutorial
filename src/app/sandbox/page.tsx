import { auth } from "@clerk/nextjs/server";
import { mockFolders } from "~/lib/mock-data";
import { db } from "~/server/db";
import { folders_table } from "~/server/db/schema";

export default function SandboxPage() {
  return (
    <div className="flex flex-col gap-4">
      Seed function
      <form
        action={async () => {
          "use server";
          const user = await auth();
          if (!user.userId) {
            throw new Error("User not found!");
          }
          const rootFolder = await db
            .insert(folders_table)
            .values({ name: "root", ownerId: user.userId, parent: null })
            .$returningId();

          await db.insert(folders_table).values(
            mockFolders.map((folder) => ({
              name: folder.name,
              parent: rootFolder[0]!.id,
              ownerId: user.userId,
            })),
          );
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
