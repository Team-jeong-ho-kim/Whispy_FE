import { BackgroundImg, WhispyLogo } from "@/assets";
import { useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { MusicPlayer, ThemeGrid } from "../components";

interface Track {
  id: number;
  title: string;
}

export default function Home() {
  const [selectedTrack, setSelectedTrack] = useState<Track | undefined>(
    undefined
  );

  const handleTrackSelect = (track: Track) => {
    console.log("Before setState:", selectedTrack); // 현재 상태
    setSelectedTrack(track);
    console.log("Selected track in Home:", track.title);
  };
  const handlePlayPause = (isPlaying: boolean) => {
    console.log("Music playing:", isPlaying);
  };

  const handlePrevious = () => {
    console.log("Previous track");
  };

  const handleNext = () => {
    console.log("Next track");
  };

  return (
    <ImageBackground
      source={BackgroundImg}
      style={styles.container}
      resizeMode="cover"
    >
      {/* Whispy 로고/타이틀 */}
      <View style={styles.headerContainer}>
        <Image style={styles.title} source={WhispyLogo} resizeMode="contain" />
      </View>

      {/* 4개 테마 그리드 컴포넌트 */}
      <ThemeGrid onTrackSelect={handleTrackSelect} />

      <MusicPlayer
        currentTrack={selectedTrack}
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
