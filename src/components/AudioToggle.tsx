import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface AudioToggleProps {
  className?: string;
}

export const AudioToggle: React.FC<AudioToggleProps> = ({ className = '' }) => {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setIsMuted(sound.getMuted());
  }, []);

  const handleToggle = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={() => sound.playHover()}
      title={isMuted ? 'Enable Tactical Audio Feedback' : 'Mute Audio Feedback'}
      aria-label={isMuted ? 'Enable Tactical Audio Feedback' : 'Mute Audio Feedback'}
      className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded border transition-all duration-200 ${
        isMuted
          ? 'bg-graphite-900/60 border-graphite-700 text-silver-muted hover:text-white hover:border-silver-muted'
          : 'bg-reactor-cyan/10 border-reactor-cyan text-reactor-cyan glow-cyan'
      } ${className}`}
    >
      {isMuted ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-silver-dark" />
          <span className="hidden sm:inline">AUDIO: OFF</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 animate-pulse text-reactor-cyan" />
          <span className="hidden sm:inline">AUDIO: ACTIVE</span>
        </>
      )}
    </button>
  );
};
