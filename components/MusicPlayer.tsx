import { backIcon, nextIcon, playIcon, stopIcon } from "@/assets";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Track {
  id: number;
  title: string;
}

interface MusicPlayerProps {
  currentTrack?: Track;
  onPlayPause?: (isPlaying: boolean) => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function MusicPlayer({
  currentTrack,
  onPlayPause,
  onPrevious,
  onNext,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const defaultTrack = {
    id: 0,
    title: "Select a song to play",
  };

  const displayTrack = currentTrack || defaultTrack;

  const handlePlayPause = () => {
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);
    onPlayPause?.(newPlayingState);
  };

  const handlePrevious = () => {
    onPrevious?.();
  };

  const handleNext = () => {
    onNext?.();
  };

  return (
    <View style={styles.musicPlayerContainer}>
      <Text style={styles.songTitle}>{displayTrack.title}</Text>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={handlePrevious}>
          <Image
            source={backIcon}
            style={styles.controlIconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause}>
          <Image
            source={isPlaying ? stopIcon : playIcon}
            style={styles.playIconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={handleNext}>
          <Image
            source={nextIcon}
            style={styles.controlIconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  musicPlayerContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 20,
    marginBottom: 50,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    width: "98%",
    alignSelf: "center",
  },
  trackInfoContainer: {
    alignSelf: "flex-start",
    marginBottom: 50,
    gap: 100,
  },
  songTitle: {
    color: "#A6A6A6",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 30,
    textAlign: "left",
    fontFamily: "KimjungchulScript",
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
    alignSelf: "center",
  },
  controlButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  playIconImage: {
    width: 24,
    height: 24,
  },
  controlIconImage: {
    width: 25,
    height: 25,
  },
});
