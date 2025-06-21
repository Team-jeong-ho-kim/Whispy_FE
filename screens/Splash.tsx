import { BackgroundImg, WhispyLogo } from "@/assets";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Splash() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // 여기서 네비게이션 로직 추가가
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) {
    // 메인 화면 컴포넌트로 교체
    return null; // 임시
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackgroundImg}
        style={styles.backgroundContainer}
        resizeMode="cover"
      >
        <View style={styles.logoContainer}>
          <Image source={WhispyLogo} style={styles.logo} resizeMode="contain" />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090910",
  },
  backgroundContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: Math.min(width * 0.2, 80),
    height: Math.min(width * 0.2, 80),
  },
});