import { eq } from "drizzle-orm";
import DriveContents from "~/app/drive-contents";
import { db } from "~/server/db";
import { files_table, folders_table } from "~/server/db/schema";

async function getAllParents(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;
  while (currentId) {
    const folder = await db
      .selectDistinct()
      .from(folders_table)
      .where(eq(folders_table.id, currentId));
    if (!folder[0]) {
      throw new Error("Parent folder not found!");
    }
    parents.unshift(folder[0]);
    currentId = parents[0]?.parent!;
  }
  return parents;
}

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await props.params;
  const paresedFolderId = parseInt(folderId);
  if (isNaN(paresedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const filesPromise = db
    .select()
    .from(files_table)
    .where(eq(files_table.parent, paresedFolderId));
  const foldersPromise = db
    .select()
    .from(folders_table)
    .where(eq(folders_table.parent, paresedFolderId));
  const parentsPromise = getAllParents(paresedFolderId);

  const [folders, files, parents] = await Promise.all([
    foldersPromise,
    filesPromise,
    parentsPromise,
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
