import "../styles/CanvasSizeSelector.css";
import { CANVAS_SIZES, type CanvasSize } from "../constants/canvasSizes";

interface CanvasSizeSelectorProps {
  selectedSize: CanvasSize;
  onSelectSize: (size: CanvasSize) => void;
}

export default function CanvasSizeSelector({ selectedSize, onSelectSize }: CanvasSizeSelectorProps) {
  return (
    <div className="canvas-size-selector">
      <h3>Canvas Size</h3>
      <div className="size-buttons">
        {CANVAS_SIZES.map((size) => (
          <button
            key={size.id}
            className={`size-button ${selectedSize.id === size.id ? "selected" : ""}`}
            onClick={() => onSelectSize(size)}
            title={`${size.width}x${size.height}`}
          >
            {size.name}
          </button>
        ))}
      </div>
    </div>
  );
}
