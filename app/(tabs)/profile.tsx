import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profile() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: insets.top + 12,
        paddingBottom: insets.bottom + 24,
        paddingHorizontal: 16,
      }}
    >
      <Text style={styles.title}>Ahmad Zaki</Text>
      <Text>Class of 2018 • Mechanical Engineering</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text>Email: ahmad.zaki@example.com</Text>
        <Text>Phone: +60 12-3456789</Text>
        <Text>Location: Mukah, Sarawak</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        <Text>• Petronas · Mechanical Engineer</Text>
        <Text>• InfinioTech · Project Manager</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "800", marginBottom: 8 },
  section: { padding: 12, borderRadius: 12, backgroundColor: "#fff", elevation: 1, marginTop: 10 },
  sectionTitle: { fontWeight: "700", marginBottom: 6 },
});
