import { Audio } from "expo-av";
import { useCallback, useEffect, useRef, useState } from "react";
import { Track } from "../api/types";

export const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  const playTrack = useCallback(async (track: Track) => {
    setLoading(true);

    try {
      // 기존 사운드 정리
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      // 새 트랙 로드 및 재생
      const { sound } = await Audio.Sound.createAsync(
        { uri: track.s3_url },
        { shouldPlay: true }
      );

      soundRef.current = sound;
      setCurrentTrack(track);
      setIsPlaying(true);
    } catch (error) {
      console.error("Audio error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const togglePlayPause = useCallback(async () => {
    if (!soundRef.current) return;

    try {
      if (isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Toggle error:", error);
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  return {
    isPlaying,
    currentTrack,
    loading,
    playTrack,
    togglePlayPause,
  };
};
