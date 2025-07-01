import { Track } from "@/api/types";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TrackItemProps {
  track: Track;
  themeIcon: any;
  onPress: () => void;
}

export default function TrackItem({
  track,
  themeIcon,
  onPress,
}: TrackItemProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    console.log("TrackItem pressed:", track.name);
    setIsSelected(!isSelected);
    onPress();
  };

  return (
    <TouchableOpacity style={styles.trackItem} onPress={handlePress}>
      <View
        style={[styles.trackItemInner, isSelected && styles.trackItemSelected]}
      >
        <View style={styles.trackIcon}>
          <Image
            source={themeIcon}
            style={styles.trackIconImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.trackInfo}>
          <Text style={styles.trackTitle}>{track.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  trackItem: {
    marginBottom: 12,
    padding: 2,
  },
  trackItemInner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 15,
    padding: 16,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  trackItemSelected: {
    borderWidth: 2,
    borderColor: "#ffff",
  },
  trackIcon: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  trackIconImage: {
    width: 24,
    height: 24,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "KimjungchulScript",
  },
});
