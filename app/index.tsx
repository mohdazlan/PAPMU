// app/index.tsx
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";

export default function LoadingScreen() {
  const router = useRouter();

  useEffect(() => {
    // reveal this screen (hide native splash), then wait N ms
    SplashScreen.hideAsync().catch(() => {});
    const t = setTimeout(() => router.replace("/(tabs)/directory"), 2000); // ← adjust delay
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  logo: { width: 160, height: 160 }, // tweak size as you like
});
