import { Track } from "@/api/types";
import { BackgroundImg, WhispyLogo } from "@/assets";
import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { MusicPlayer, ThemeGrid } from "../components";

export default function Home() {
  const [selectedTrack, setSelectedTrack] = useState<Track | undefined>(
    undefined
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  // 백그라운드 재생 설정
  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: false,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
  }, []);

  const handleTrackSelect = async (track: Track) => {
    if (!track.s3_url) return;

    setLoading(true);
    try {
      // 기존 사운드 정리
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      // 새 사운드 생성 및 재생
      const { sound } = await Audio.Sound.createAsync(
        { uri: track.s3_url },
        { shouldPlay: true }
      );

      soundRef.current = sound;
      setSelectedTrack(track);
      setIsPlaying(true);

      // 재생 상태 모니터링
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setIsPlaying(status.isPlaying || false);
        }
      });
    } catch (error) {
      console.error("Audio error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayPause = async () => {
    if (!soundRef.current) return;

    try {
      if (isPlaying) {
        await soundRef.current.pauseAsync();
      } else {
        await soundRef.current.playAsync();
      }
    } catch (error) {
      console.error("PlayPause error:", error);
    }
  };

  const handlePrevious = () => {
    console.log("Previous track");
  };

  const handleNext = () => {
    console.log("Next track");
  };

  // 정리
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
