import { DEFAULT_SOUNDS } from "../types/defaults";
import type { Sound } from "../types/defaults";
import "../styles/SoundSelector.css";

interface SoundSelectorProps {
  selectedSound: Sound;
  onSelectSound: (sound: Sound) => void;
  onCustomAudioChange?: (file: File | null) => void;
}

export default function SoundSelector({ 
  selectedSound, 
  onSelectSound,
  onCustomAudioChange 
}: SoundSelectorProps) {
  return (
    <div className="sound-selector-container">
      <h3>🎵 Select Sound</h3>
      <div className="sound-options">
        {DEFAULT_SOUNDS.map((sound) => (
          <button
            key={sound.id}
            className={`sound-option ${selectedSound.id === sound.id ? "selected" : ""}`}
            onClick={() => onSelectSound(sound)}
            title={sound.name}
          >
            <span className="sound-name">{sound.name}</span>
          </button>
        ))}
      </div>
      
      <div className="custom-audio-section">
        <p className="custom-audio-label">Or upload custom audio:</p>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => onCustomAudioChange?.(e.target.files?.[0] || null)}
          className="custom-audio-input"
        />
      </div>
    </div>
  );
}
