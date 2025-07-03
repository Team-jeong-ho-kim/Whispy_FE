import { Track } from "@/api/types";
import { BackgroundImg } from "@/assets";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSoundsByTheme } from "../hooks/useSounds";
import TrackItem from "./TrackItem";

const { width, height } = Dimensions.get("window");

interface TrackListScreenProps {
  visible: boolean;
  themeName: string;
  themeIcon: any;
  apiTheme: string | null;
  onTrackPress: (track: Track) => void;
  onClose: () => void;
}

export default function TrackListScreen({
  visible,
  themeName,
  themeIcon,
  apiTheme,
  onTrackPress,
  onClose,
}: TrackListScreenProps) {
  const slideAnim = useRef(new Animated.Value(height * 0.75)).current;
  const { tracks, loading, error } = useSoundsByTheme(apiTheme);

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: height * 0.2,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: height * 0.75,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent={true}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleClose}
      >
        <Animated.View
          style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
        >
          <TouchableOpacity activeOpacity={1} style={{ flex: 1 }}>
            <ImageBackground
              source={BackgroundImg}
              style={styles.backgroundImage}
              resizeMode="cover"
            >
              <View style={styles.content}>
                <View style={styles.header}>
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleClose}
                  >
                    <Text style={styles.backButtonText}>←</Text>
                  </TouchableOpacity>
                  <Text style={styles.themeTitle}>{themeName}</Text>
                </View>

                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>
                    {loading ? "로딩 중..." : `${tracks.length}곡`}
                  </Text>
                </View>

                {error ? (
                  <Text style={styles.errorText}>{error}</Text>
                ) : (
                  <ScrollView
                    style={styles.trackList}
                    contentContainerStyle={styles.trackListContent}
                    showsVerticalScrollIndicator={false}
                    bounces={true}
                    nestedScrollEnabled={true}
                  >
                    {tracks.map((track) => (
                      <TrackItem
                        key={track.id}
                        track={track}
                        themeIcon={themeIcon}
                        onPress={() => onTrackPress(track)}
                      />
                    ))}
                  </ScrollView>
                )}
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    position: "absolute",
    bottom: 0,
    width: width,
    height: height * 0.75,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: "rgba(9, 9, 16, 0.3)",
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    height: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  backButtonText: {
    color: "#ffff",
    fontSize: 24,
    fontWeight: "300",
  },
  themeTitle: {
    fontSize: 20,
    fontWeight: "300",
    color: "#ffff",
    textAlign: "center",
    flex: 1,
    marginRight: 60,
  },
  sectionHeader: {
    marginBottom: 20,
    height: 30,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "400",
    opacity: 0.8,
    fontFamily: "KimjungchulScript",
  },
  trackList: {
    flex: 1,
    backgroundColor: "transparent",
  },
  trackListContent: {
    paddingBottom: 140,
    minHeight: "100%",
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
