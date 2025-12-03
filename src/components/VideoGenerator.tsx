import ImageCanvas from "./ImageCanvas";
import VideoControls from "./VideoControls";
import { useChristmasTreeVideo } from "./useChristmasTreeVideo";

export default function VideoGenerator() {
  const { images, setImages, positions, setPositions, setAudio, generateVideo, loadingFFmpeg, canvasRef } =
    useChristmasTreeVideo();

  return (
    <div style={{ textAlign: "center", padding: 30, display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
      <div>
        <h1>Christmas Tree Video Generator</h1>
        <VideoControls images={images} setImages={setImages} setAudio={setAudio} generateVideo={generateVideo} loadingFFmpeg={loadingFFmpeg} />
      </div>
      <div>
        <ImageCanvas canvasRef={canvasRef} images={images} positions={positions} setPositions={setPositions} />
      </div>
    </div>
  );
}
