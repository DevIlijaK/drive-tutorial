export interface File {
  id: string;
  name: string;
  type: "file";
  url: string;
  parent: string;
  size: string;
}

export interface Folder {
  id: string;
  name: string;
  type: "folder";
  parent: string | null;
}

export const mockFolders: Folder[] = [
  { id: "root", name: "root", type: "folder", parent: null },
  { id: "1", name: "Projects", type: "folder", parent: "root" },
  { id: "2", name: "Music", type: "folder", parent: "root" },
  { id: "3", name: "Downloads", type: "folder", parent: "root" },
  { id: "8", name: "Coding Resources", type: "folder", parent: "3" },
];

export const mockFiles: File[] = [
  {
    id: "4",
    name: "Portfolio.pdf",
    type: "file",
    url: "/files/portfolio.pdf",
    parent: "1",
    size: "2.3 MB",
  },
  {
    id: "5",
    name: "Client Brief.docx",
    type: "file",
    url: "/files/client-brief.docx",
    parent: "1",
    size: "1.7 MB",
  },
  {
    id: "6",
    name: "Beethoven.mp3",
    type: "file",
    url: "/files/beethoven.mp3",
    parent: "2",
    size: "6.4 MB",
  },
  {
    id: "7",
    name: "Chill Vibes.mp3",
    type: "file",
    url: "/files/chill-vibes.mp3",
    parent: "2",
    size: "4.2 MB",
  },
  {
    id: "9",
    name: "Algorithms.pdf",
    type: "file",
    url: "/files/algorithms.pdf",
    parent: "8",
    size: "3.9 MB",
  },
  {
    id: "10",
    name: "Frameworks.docx",
    type: "file",
    url: "/files/frameworks.docx",
    parent: "3",
    size: "2.1 MB",
  },
];
