import { playIcon } from "@/assets";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface Theme {
  id: number;
  title: string;
  icon: any;
}

interface ThemeItemProps {
  theme: Theme;
  onPress: () => void;
}

export default function ThemeItem({ theme, onPress }: ThemeItemProps) {
  return (
    <TouchableOpacity style={styles.gridItem} onPress={onPress}>
      <Image style={styles.gridIcon} source={theme.icon} resizeMode="contain" />
      <Text style={styles.gridText}>{theme.title}</Text>
      <View style={styles.bottomBox}>
        <Image
          style={styles.playIconImage}
          source={playIcon}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    width: width * 0.45,
    height: width * 0.4,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  gridIcon: {
    width: width * 0.1,
    height: width * 0.1,
    marginBottom: 16,
  },
  gridIconImage: {
    width: 48,
    height: 48,
    marginBottom: 16,
    resizeMode: "contain",
  },
  gridText: {
    color: "#b3b3b3",
    fontSize: width * 0.04,
    fontWeight: "300",
    textAlign: "center",
    opacity: 0.9,
    marginBottom: 12,
    fontFamily: "KimjungchulScript",

  },
  bottomBox: {
    width: "80%",
    height: width * 0.11,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.15)",
    marginHorizontal: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginInline: 10,
  },
  playIconImage: {
    width: width * 0.04,
    height: width * 0.04,
  },
});
