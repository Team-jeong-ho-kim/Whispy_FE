import { Track } from "@/api/types";
import { BackgroundImg, WhispyLogo } from "@/assets";
import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";
import {
  AppState,
  AppStateStatus,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import { soundService } from "../api/soundService";
import { MusicPlayer, ThemeGrid } from "../components";
import Toast from "../components/Toast";

export default function Home() {
  const [selectedTrack, setSelectedTrack] = useState<Track | undefined>(
    undefined
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentThemeTracks, setCurrentThemeTracks] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  // ✅ 백그라운드 재생 설정
  useEffect(() => {
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: false,
          playThroughEarpieceAndroid: false,
          staysActiveInBackground: true,
          interruptionModeIOS: 1,
          interruptionModeAndroid: 1,
        });
      } catch (error) {
        console.error("Audio setup error:", error);
      }
    };

    setupAudio();
  }, []);

  // ✅ 앱이 포그라운드로 돌아오면 재생 재개
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      async (nextAppState: AppStateStatus) => {
        if (nextAppState === "active" && soundRef.current) {
          try {
            const status = await soundRef.current.getStatusAsync();
            if (status.isLoaded && !status.isPlaying) {
              await soundRef.current.playAsync();
              setIsPlaying(true);
            }
          } catch (error) {
            console.error("포그라운드 복귀 후 재생 오류:", error);
          }
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const displayToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  const playTrack = async (track: Track, index: number) => {
    if (!track.s3_url) return;

    setLoading(true);
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: track.s3_url },
        {
          shouldPlay: true,
          isLooping: true,
          volume: 1.0,
        }
      );

      soundRef.current = sound;
      setSelectedTrack(track);
      setCurrentTrackIndex(index);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setIsPlaying(status.isPlaying || false);
          setLoading(false);
        }
      });

      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        setIsPlaying(status.isPlaying);
      }
    } catch (error) {
      console.error("Audio error:", error);
      displayToast("음원 재생에 실패했습니다");
      setLoading(false);
    }
  };

  const handleTrackSelect = async (track: Track) => {
    if (!track.s3_url) return;

    try {
      const tracks = await soundService.getSoundsByTheme(track.theme);
      setCurrentThemeTracks(tracks);

      const index = tracks.findIndex((t) => t.id === track.id);
      if (index !== -1) {
        await playTrack(track, index);
      }
    } catch (error) {
      console.error("Failed to fetch tracks:", error);
      displayToast("트랙 목록을 불러올 수 없습니다");
    }
  };

  const handlePlayPause = async () => {
    if (!soundRef.current) return;

    try {
      const status = await soundRef.current.getStatusAsync();

      if (!status.isLoaded) {
        console.log("Sound is not loaded yet");
        return;
      }

      if (status.isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("PlayPause error:", error);
      displayToast("재생/일시정지 중 오류가 발생했습니다");
    }
  };

  const handlePrevious = async () => {
    if (currentThemeTracks.length === 0) {
      displayToast("재생 중인 음원이 없습니다");
      return;
    }

    if (currentTrackIndex <= 0) {
      displayToast("이전 음원이 없습니다");
      return;
    }

    const previousIndex = currentTrackIndex - 1;
    const previousTrack = currentThemeTracks[previousIndex];
    await playTrack(previousTrack, previousIndex);
  };

  const handleNext = async () => {
    if (currentThemeTracks.length === 0) {
      displayToast("재생 중인 음원이 없습니다");
      return;
    }

    if (currentTrackIndex >= currentThemeTracks.length - 1) {
      displayToast("다음 음원이 없습니다");
      return;
    }

    const nextIndex = currentTrackIndex + 1;
    const nextTrack = currentThemeTracks[nextIndex];
    await playTrack(nextTrack, nextIndex);
  };

  // ✅ 컴포넌트 unmount 시 cleanup
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  return (
    <ImageBackground
      source={BackgroundImg}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.headerContainer}>
        <Image style={styles.title} source={WhispyLogo} resizeMode="contain" />
      </View>

      <ThemeGrid onTrackSelect={handleTrackSelect} />

      <MusicPlayer
        currentTrack={selectedTrack}
        isPlaying={isPlaying}
        loading={loading}
        onPlayPause={handlePlayPause}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      <Toast message={toastMessage} visible={showToast} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
    backgroundColor: "#090910",
  },
  headerContainer: {
    alignItems: "center",
  },
  title: {
    width: 70,
    height: 70,
  },
});
