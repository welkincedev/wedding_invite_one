"use client";

import React, { useRef, useState, useEffect } from "react";
import { weddingConfig } from "@/data/weddingConfig";
import { Music2 } from "lucide-react";

interface AudioPlayerProps {
  onShowToast: (msg: string) => void;
  autoPlayTrigger?: boolean;
}

export default function AudioPlayer({ onShowToast, autoPlayTrigger }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      handlePlay(true);
    }
  }, [autoPlayTrigger]);
  
  const handlePlay = async (soft = false) => {
    if (!audioRef.current) return;
    try {
      audioRef.current.volume = 0.65;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      setIsPlaying(false);
      if (!soft) {
        onShowToast("Audio playback was blocked or audio file is missing.");
      }
    }
  };

  const handlePause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay(false);
    }
  };

  return (
    <aside
      className="fixed bottom-5 right-5 z-[990] transition-transform"
      aria-label="Background music controls"
    >
      <button
        type="button"
        onClick={toggleAudio}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all shadow-md backdrop-blur-md ${
          isPlaying
            ? "bg-[#FFFEFA]/95 text-[#343C32] border border-[#C6AD76] ring-2 ring-[#C6AD76]/30 shadow-lg"
            : "bg-[#F7F3E9]/90 text-[#343C32] border border-[#C6AD76]/50 hover:bg-[#FFFEFA]"
        }`}
      >
        <span className="w-5 h-5 flex items-center justify-center text-[#C6AD76]">
          {isPlaying ? (
            <span className="flex items-end gap-[2px] h-3.5">
              <span className="w-[2.5px] h-full bg-[#74866D] rounded animate-[pulse_0.8s_ease-in-out_infinite]" />
              <span className="w-[2.5px] h-2/3 bg-[#74866D] rounded animate-[pulse_1.1s_ease-in-out_infinite]" />
              <span className="w-[2.5px] h-4/5 bg-[#74866D] rounded animate-[pulse_0.9s_ease-in-out_infinite]" />
            </span>
          ) : (
            <Music2 className="w-4 h-4 text-[#74866D]" />
          )}
        </span>
        <span className="text-[0.75rem]">{isPlaying ? "Pause Ambience" : "Play Ambience"}</span>
      </button>

      <audio
        ref={audioRef}
        src={weddingConfig.audio.src}
        preload="auto"
        loop
        playsInline
      />
    </aside>
  );
}
