import { Track } from "@/api/types";
import { focusIcon, meditationIcon, restIcon, sleepIcon } from "@/assets";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { THEME_MAPPING } from "../constants/themes";
import ThemeItem from "./ThemeItem";
import TrackListScreen from "./TrackList";

interface ThemeGridProps {
  onTrackSelect: (track: Track) => void;
}

const themes = [
  { id: 1, title: "Sleep", icon: sleepIcon },
  { id: 2, title: "Focus", icon: focusIcon },
  { id: 3, title: "Rest", icon: restIcon },
  { id: 4, title: "Meditation", icon: meditationIcon },
];

export default function ThemeGrid({ onTrackSelect }: ThemeGridProps) {
  const [showTrackList, setShowTrackList] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedThemeIcon, setSelectedThemeIcon] = useState<any>(null);
  const [selectedApiTheme, setSelectedApiTheme] = useState<string | null>(null);

  const handleThemePress = (theme: any) => {
    const apiTheme = THEME_MAPPING[theme.title as keyof typeof THEME_MAPPING];
    setSelectedTheme(theme.title);
    setSelectedApiTheme(apiTheme);
    setSelectedThemeIcon(theme.icon);
    setShowTrackList(true);
  };

  const handleTrackPress = (track: Track) => {
    onTrackSelect(track);
    setShowTrackList(false);
  };

  const handleCloseTrackList = () => {
    setShowTrackList(false);
  };

  return (
    <>
      <View style={styles.gridContainer}>
        <View style={styles.gridRow}>
          <ThemeItem
            theme={themes[0]}
            onPress={() => handleThemePress(themes[0])}
          />
          <ThemeItem
            theme={themes[1]}
            onPress={() => handleThemePress(themes[1])}
          />
        </View>
        <View style={styles.gridRow}>
          <ThemeItem
            theme={themes[2]}
            onPress={() => handleThemePress(themes[2])}
          />
          <ThemeItem
            theme={themes[3]}
            onPress={() => handleThemePress(themes[3])}
          />
        </View>
      </View>

      <TrackListScreen
        visible={showTrackList}
        themeName={selectedTheme}
        themeIcon={selectedThemeIcon}
        apiTheme={selectedApiTheme}
        onTrackPress={handleTrackPress}
        onClose={handleCloseTrackList}
      />
    </>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    justifyContent: "center",
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
