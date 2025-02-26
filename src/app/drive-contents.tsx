"use client";

import { ChevronRight } from "lucide-react";
import { FileRow, FolderRow } from "./file-row";
import Link from "next/link";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/components/uploadthing";
import { useRouter } from "next/navigation";

export default function DriveContents(props: {
  files: any[];
  folders: any[];
  parents: any[];
  currentFolderId: number;
}) {
  const router = useRouter();
  const { files, folders, parents } = props;

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link href={"/f/1"} className="mr-2 text-gray-300 hover:text-white">
              My Drive
            </Link>
            {parents.map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link
                  href={`/f/${folder.id}`}
                  className="text-gray-300 hover:text-white"
                >
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Size</div>
            </div>
          </div>
          <ul>
            {folders.map((folder) => (
              <FolderRow folder={folder} key={folder.id} />
            ))}
            {files.map((file) => (
              <FileRow file={file} key={file.id} />
            ))}
          </ul>
        </div>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={() => {
            router.refresh();
          }}
          input={{ folderId: props.currentFolderId }}
        />
      </div>
    </div>
  );
}
