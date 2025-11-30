/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";

function App() {
  const [images, setImages] = useState<File[]>([]);
  const [audio, setAudio] = useState<File | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw Christmas tree with uploaded images
  const drawTree = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const bgImg = new Image();
    bgImg.src = "/images/ctree.jpg"; // make sure this is in public/images
    bgImg.onload = () => {
      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

      // Draw uploaded images as a pyramid
      const totalImages = images.length;
      let index = 0;
      for (let row = 0; index < totalImages; row++) {
        const numInRow = row + 1;
        const y = 50 + row * 100;
        const rowWidth = numInRow * 100;
        const startX = (canvas.width - rowWidth) / 2;

        for (let col = 0; col < numInRow && index < totalImages; col++) {
          const x = startX + col * 100;
          const imgFile = images[index];
          const img = new Image();
          img.src = URL.createObjectURL(imgFile);
          img.onload = () => ctx.drawImage(img, x, y, 80, 80);
          index++;
        }
      }
    };
  };

  useEffect(() => {
    drawTree();
  }, [images]);

  const generateVideo = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return alert("Canvas not found");
    if (!audio) return alert("Please upload an audio file");

    const audioUrl = URL.createObjectURL(audio);
    const audioEl = new Audio(audioUrl);
    audioEl.crossOrigin = "anonymous";

    // Wait until metadata (duration) is loaded
    await new Promise<void>((resolve, reject) => {
      const onLoaded = () => { audioEl.removeEventListener("loadedmetadata", onLoaded); resolve(); };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const onErr = (_e: Event) => { audioEl.removeEventListener("error", onErr); reject(); };
      audioEl.addEventListener("loadedmetadata", onLoaded);
      audioEl.addEventListener("error", onErr);
      audioEl.load();
    });

    const durationSec = audioEl.duration;
    if (!durationSec || isNaN(durationSec) || !isFinite(durationSec)) {
      return alert("Couldn't read audio duration.");
    }

    const fps = 30;
    const canvasStream = canvas.captureStream(fps);

    // Capture audio stream
    let audioStream: MediaStream | null = null;
    const audioElAny = audioEl as HTMLMediaElement & { captureStream?: () => MediaStream; mozCaptureStream?: () => MediaStream };
    if (typeof audioElAny.captureStream === "function") {
      audioStream = audioElAny.captureStream();
    } else if (typeof audioElAny.mozCaptureStream === "function") {
      audioStream = audioElAny.mozCaptureStream();
    } else {
      return alert("Your browser does not support capturing audio from an Audio element.");
    }

    audioStream?.getAudioTracks().forEach((t) => canvasStream.addTrack(t));

    // Prepare MediaRecorder
    let recorder: MediaRecorder;
    try {
      recorder = new MediaRecorder(canvasStream, { mimeType: "video/webm; codecs=vp9,opus" });
    } catch {
      try {
        recorder = new MediaRecorder(canvasStream, { mimeType: "video/webm; codecs=vp8,opus" });
      } catch {
        recorder = new MediaRecorder(canvasStream); // fallback
      }
    }

    const chunks: Blob[] = [];
    recorder.ondataavailable = (ev) => { if (ev.data && ev.data.size) chunks.push(ev.data); };
    const stopped = new Promise<void>((resolve) => { recorder.onstop = () => resolve(); });

    recorder.start(1000); // record chunks every 1s

    audioEl.volume = 1.0;
    audioEl.play().catch(() => {
      alert("Audio playback blocked by browser. Click Play on the page to allow recording.");
    });

    // Stop recording after audio ends
    setTimeout(() => {
      if (recorder.state === "recording") recorder.stop();
      audioEl.pause();
    }, durationSec * 1000 + 500);

    await stopped;

    // Download video
    const blob = new Blob(chunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "christmas_tree.webm";
    a.click();

    URL.revokeObjectURL(audioUrl);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🎄 Christmas Tree Video Generator</h1>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => setImages(Array.from(e.target.files || []))}
      />
      <br /><br />

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setAudio(e.target.files?.[0] || null)}
      />
      <br /><br />

      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        style={{ border: "1px solid #555" }}
      />
      <br /><br />

      <button onClick={generateVideo}>Generate Video</button>
    </div>
  );
}

export default App;
