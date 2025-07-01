import { useEffect, useState } from "react";
import { soundService } from "../api/soundService";
import { Track } from "../api/types";

export const useSoundsByTheme = (theme: string | null) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!theme) return;

    const fetchSounds = async () => {
      setLoading(true);
      try {
        const data = await soundService.getSoundsByTheme(theme);
        setTracks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "오류 발생");
      } finally {
        setLoading(false);
      }
    };

    fetchSounds();
  }, [theme]);

  return { tracks, loading, error };
};
