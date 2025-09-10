// app/index.tsx
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function LoadingScreen() {
  const router = useRouter();
  const rotation = useSharedValue(0);

  useEffect(() => {
    // start spinner
    rotation.value = withRepeat(
      withTiming(360, { duration: 1200, easing: Easing.linear }),
      -1
    );

    // reveal loader (hide native splash) then wait N ms before tabs
    (async () => {
      await SplashScreen.hideAsync();
    })();

    const toTabs = setTimeout(() => {
      router.replace("/(tabs)/profile");
    }, 5000); // ← adjust duration (ms)

    return () => clearTimeout(toTabs);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/images/logo.png")}
        style={[styles.logo, animatedStyle]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" },
  logo: { width: 140, height: 140 },
});
