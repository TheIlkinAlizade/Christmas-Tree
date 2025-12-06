// Import all background images
import cbg1 from "../assets/images/cbg1.jpg";
import cbg2 from "../assets/images/cbg2.jpg";
import cbg3 from "../assets/images/cbg3.jpg";
import cbg4 from "../assets/images/cbg4.jpg";

// Import all tree images
import ctree1 from "../assets/images/ctree1.png";
import ctree2 from "../assets/images/ctree2.png";
import ctree3 from "../assets/images/ctree3.png";
import ctree4 from "../assets/images/ctree4.png";

export interface Background {
  id: string;
  name: string;
  src: string;
  thumbnail?: string;
}

export interface TreeStyle {
  id: string;
  name: string;
  src: string;
  thumbnail?: string;
}

export interface Sound {
  id: string;
  name: string;
  src: string;
}

export const DEFAULT_BACKGROUNDS: Background[] = [
  {
    id: "bg-1",
    name: "Background 1",
    src: cbg1,
    thumbnail: cbg1,
  },
  {
    id: "bg-2",
    name: "Background 2",
    src: cbg2,
    thumbnail: cbg2,
  },
  {
    id: "bg-3",
    name: "Background 3",
    src: cbg3,
    thumbnail: cbg3,
  },
  {
    id: "bg-4",
    name: "Background 4",
    src: cbg4,
    thumbnail: cbg4,
  },
];

export const DEFAULT_TREES: TreeStyle[] = [
  {
    id: "tree-1",
    name: "Tree 1",
    src: ctree1,
    thumbnail: ctree1,
  },
  {
    id: "tree-2",
    name: "Tree 2",
    src: ctree2,
    thumbnail: ctree2,
  },
  {
    id: "tree-3",
    name: "Tree 3",
    src: ctree3,
    thumbnail: ctree3,
  },
  {
    id: "tree-4",
    name: "Tree 4",
    src: ctree4,
    thumbnail: ctree4,
  },
];

export const DEFAULT_SOUNDS: Sound[] = [
  {
    id: "sound-default",
    name: "Default",
    src: "/audio/default.mp3",
  },
];
