import { eq } from "drizzle-orm";
import DriveContents from "~/app/drive-contents";
import { db } from "~/server/db";
import { files_table, folders_table } from "~/server/db/schema";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await props.params;
  const paresedFolderId = parseInt(folderId);
  if (isNaN(paresedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const files = await db
    .select()
    .from(files_table)
    .where(eq(files_table.parent, paresedFolderId));
  const folders = await db
    .select()
    .from(folders_table)
    .where(eq(folders_table.parent, paresedFolderId));

  return <DriveContents files={files} folders={folders} />;
}
