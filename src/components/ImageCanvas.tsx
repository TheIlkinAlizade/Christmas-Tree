import React, { useEffect, useState, useRef } from "react";

interface ImageCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  images: File[];
  positions: { x: number; y: number }[];
  setPositions: React.Dispatch<React.SetStateAction<{ x: number; y: number }[]>>;
}

const IMAGE_SIZE = 100;

export default function ImageCanvas({ canvasRef, images, positions, setPositions }: ImageCanvasProps) {
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const offset = useRef({ x: 0, y: 0 });
  const bgImage = useRef<HTMLImageElement | null>(null);

  // Load background
  useEffect(() => {
    const bg = new Image();
    bg.src = "/images/ctree.jpg";
    bg.onload = () => setBgLoaded(true);
    bgImage.current = bg;
  }, []);

  // Preload images
  useEffect(() => {
    const promises = images.map(
      (file) =>
        new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.src = URL.createObjectURL(file);
          img.onload = () => resolve(img);
        })
    );

    Promise.all(promises).then((imgs) => setLoadedImages(imgs));
  }, [images]);

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !bgLoaded) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (bgImage.current) ctx.drawImage(bgImage.current, 0, 0, canvas.width, canvas.height);

    loadedImages.forEach((img, i) => {
      const pos = positions[i];
      if (pos) ctx.drawImage(img, pos.x, pos.y, IMAGE_SIZE, IMAGE_SIZE);
    });
  }, [loadedImages, positions, bgLoaded, canvasRef]);

  // Drag logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getMousePos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if ("touches" in e && e.touches.length > 0) {
        return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
      } else if ("clientX" in e) {
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }
      return { x: 0, y: 0 };
    };

    const handleDown = (e: MouseEvent | TouchEvent) => {
      const pos = getMousePos(e);
      for (let i = loadedImages.length - 1; i >= 0; i--) {
        const imgPos = positions[i];
        if (!imgPos) continue;
        if (pos.x >= imgPos.x && pos.x <= imgPos.x + IMAGE_SIZE && pos.y >= imgPos.y && pos.y <= imgPos.y + IMAGE_SIZE) {
          setDragIndex(i);
          offset.current = { x: pos.x - imgPos.x, y: pos.y - imgPos.y };
          break;
        }
      }
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (dragIndex === null) return;
      const pos = getMousePos(e);
      setPositions((prev) => {
        const newPos = [...prev];
        newPos[dragIndex] = { x: pos.x - offset.current.x, y: pos.y - offset.current.y };
        return newPos;
      });
    };

    const handleUp = () => setDragIndex(null);

    canvas.addEventListener("mousedown", handleDown);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseup", handleUp);
    canvas.addEventListener("mouseleave", handleUp);
    canvas.addEventListener("touchstart", handleDown);
    canvas.addEventListener("touchmove", handleMove);
    canvas.addEventListener("touchend", handleUp);

    return () => {
      canvas.removeEventListener("mousedown", handleDown);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseup", handleUp);
      canvas.removeEventListener("mouseleave", handleUp);
      canvas.removeEventListener("touchstart", handleDown);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("touchend", handleUp);
    };
  }, [dragIndex, loadedImages, positions, canvasRef, setPositions]);

  return <canvas ref={canvasRef} width={600} height={600} style={{ border: "1px solid #555" }} />;
}
