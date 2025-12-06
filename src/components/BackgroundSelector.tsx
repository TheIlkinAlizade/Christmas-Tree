import type { Background } from "../types/defaults";
import { DEFAULT_BACKGROUNDS } from "../types/defaults";
import "../styles/BackgroundSelector.css";

interface BackgroundSelectorProps {
  selectedBackground: Background;
  onSelectBackground: (background: Background) => void;
}

export default function BackgroundSelector({ selectedBackground, onSelectBackground }: BackgroundSelectorProps) {
  return (
    <div className="background-selector">
      <h3>Select Background</h3>
      <div className="background-grid">
        {DEFAULT_BACKGROUNDS.map((bg) => (
          <div
            key={bg.id}
            className={`background-item ${selectedBackground.id === bg.id ? "selected" : ""}`}
            onClick={() => onSelectBackground(bg)}
            title={bg.name}
          >
            <img src={bg.thumbnail || bg.src} alt={bg.name} />
            <p>{bg.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
