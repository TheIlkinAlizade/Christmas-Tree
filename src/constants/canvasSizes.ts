export interface CanvasSize {
  id: string;
  name: string;
  width: number;
  height: number;
}

export const CANVAS_SIZES: CanvasSize[] = [
  {
    id: "default",
    name: "Default (1080x1350)",
    width: 1080,
    height: 1350,
  },
  {
    id: "instagram-reel",
    name: "Instagram Reel (1080x1920)",
    width: 1080,
    height: 1920,
  },
];
