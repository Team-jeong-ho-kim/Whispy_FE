import { backIcon, nextIcon, playIcon, stopIcon } from "@/assets";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Track } from "../api/types";

interface MusicPlayerProps {
  currentTrack?: Track;
  isPlaying?: boolean;
  loading?: boolean;
  onPlayPause?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function MusicPlayer({
  currentTrack,
  isPlaying = false,
  loading = false,
  onPlayPause,
  onPrevious,
  onNext,
}: MusicPlayerProps) {
  const defaultTrack = {
    id: 0,
    name: "Select a song to play",
    theme: "",
    s3Url: "",
    createdAt: "",
  };

  const displayTrack = currentTrack || defaultTrack;

  const handlePlayPause = () => {
    onPlayPause?.();
  };

  const handlePrevious = () => {
    onPrevious?.();
  };

  const handleNext = () => {
    onNext?.();
  };

  return (
    <View style={styles.musicPlayerContainer}>
      <Text style={styles.songTitle}>{displayTrack.name}</Text>

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
    padding: 10,
    marginBottom: "30%",
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
