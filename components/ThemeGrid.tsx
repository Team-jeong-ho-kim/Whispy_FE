import { focusIcon, meditationIcon, restIcon, sleepIcon } from "@/assets";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ThemeItem from "./ThemeItem";
import TrackListScreen from "./TrackList";

interface Track {
  id: number;
  title: string;
}

interface ThemeGridProps {
  onTrackSelect: (track: Track) => void;
}

const themes = [
  { id: 1, title: "Sleep", icon: sleepIcon },
  { id: 2, title: "Focus", icon: focusIcon },
  { id: 3, title: "Rest", icon: restIcon },
  { id: 4, title: "Meditation", icon: meditationIcon },
];

const themeTracksData: { [key: string]: Track[] } = {
  Sleep: [
    { id: 1, title: "꿈의 파동" },
    { id: 2, title: "달빛 소나타" },
    { id: 3, title: "별빛 세레나데" },
    { id: 4, title: "고요한 밤" },
    { id: 5, title: "잠들기 전 명상" },
    { id: 6, title: "구름 위의 꿈" },
    { id: 7, title: "새벽 이슬" },
    { id: 8, title: "평화로운 숲" },
  ],
  Focus: [
    { id: 1, title: "집중의 리듬" },
    { id: 2, title: "생산성 부스터" },
    { id: 3, title: "마인드 플로우" },
    { id: 4, title: "딥 워크" },
    { id: 5, title: "창의적 사고" },
    { id: 6, title: "몰입의 시간" },
    { id: 7, title: "효율성 향상" },
    { id: 8, title: "정신 집중" },
  ],
  Rest: [
    { id: 1, title: "평온한 휴식" },
    { id: 2, title: "자연의 소리" },
    { id: 3, title: "힐링 멜로디" },
    { id: 4, title: "편안한 시간" },
    { id: 5, title: "바다의 파도" },
    { id: 6, title: "새소리 합창" },
    { id: 7, title: "따뜻한 햇살" },
    { id: 8, title: "산들바람" },
  ],
  Meditation: [
    { id: 1, title: "명상의 시간" },
    { id: 2, title: "마음챙김" },
    { id: 3, title: "내면의 평화" },
    { id: 4, title: "깊은 호흡" },
    { id: 5, title: "정신적 치유" },
    { id: 6, title: "영혼의 여행" },
    { id: 7, title: "균형과 조화" },
    { id: 8, title: "무념무상" },
  ],
};

export default function ThemeGrid({ onTrackSelect }: ThemeGridProps) {
  const [showTrackList, setShowTrackList] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
  const [selectedThemeIcon, setSelectedThemeIcon] = useState<any>(null);

  const handleThemePress = (theme: any) => {
    console.log("Theme pressed:", theme.title);
    setSelectedTheme(theme.title);
    setSelectedTracks(themeTracksData[theme.title] || []);
    setSelectedThemeIcon(theme.icon);
    setShowTrackList(true);
  };

  const handleTrackPress = (track: Track) => {
    console.log("Selected track:", track.title);
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
        tracks={selectedTracks}
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
