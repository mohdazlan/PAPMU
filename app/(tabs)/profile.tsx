import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profile() {
  const insets = useSafeAreaInsets();
  const avatar = ""; // leave empty for placeholder

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 16 },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={48} color="#64748B" />
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Ahmad Zaki</Text>
          <Text style={styles.sub}>Class of 2018 • Mechanical Engineering</Text>
        </View>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text>Email: ahmad.zaki@example.com</Text>
        <Text>Phone: +60 12-3456789</Text>
        <Text>Location: Mukah, Sarawak</Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        <Text>- Petronas · Mechanical Engineer</Text>
        <Text>- InfinioTech · Project Manager</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, gap: 12 },
  header: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12 },
  avatar: { width: 72, height: 72, borderRadius: 36 },
  avatarPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  name: { fontSize: 22, fontWeight: "800" },
  sub: { color: "#64748B", marginTop: 2 },
  section: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 1,
  },
  sectionTitle: { fontWeight: "700", marginBottom: 6 },
});
