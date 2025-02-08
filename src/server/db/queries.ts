// import "server-only";

import { eq } from "drizzle-orm";
import { db } from ".";
import { folders_table, files_table } from "./schema";

export const QUERIES = {
  getAllParentsForFolder: async function (folderId: number) {
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
  },
  getFolders: async function (folderId: number) {
    return db
      .select()
      .from(folders_table)
      .where(eq(folders_table.parent, folderId));
  },
  getFolderById: async function (folderId: number) {
    const folders = await db
      .select()
      .from(folders_table)
      .where(eq(folders_table.id, folderId));
    return folders[0];
  },
  getFilesByParent: async function (parentId: number) {
    return db
      .select()
      .from(files_table)
      .where(eq(files_table.parent, parentId));
  },
};
export const MUTATIONS = {
  createFile: async function (input: {
    file: {
      name: string;
      size: number;
      url: string;
      parent: number;
    };
    userId: string;
  }) {
    return await db
      .insert(files_table)
      .values({ ...input.file, ownerId: input.userId });
  },
};
