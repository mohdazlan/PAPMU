import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ALUMNI = [
  { id: "1", name: "Ahmad bin Hassan", major: "Mechanical Eng, 2018", role: "Project Manager", avatar: "" },
  { id: "2", name: "Nurul binti Ismail", major: "Civil Eng, 2017", role: "Site Engineer", avatar: "" },
  { id: "3", name: "Mohd Ali Abdullah", major: "Electrical Eng, 2019", role: "Automation Specialist", avatar: "" },
];

export default function Directory() {
  const insets = useSafeAreaInsets();

  return (
    <FlatList
      contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 16, paddingTop: insets.top + 8 }}
      data={ALUMNI}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {/* Avatar or placeholder */}
          {item.avatar ? (
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={24} color="#64748B" />
            </View>
          )}

          {/* Text */}
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.sub}>{item.major}</Text>
            <Text style={styles.sub}>{item.role}</Text>
          </View>

          {/* CTA */}
          <TouchableOpacity style={styles.cta}>
            <Text style={styles.ctaText}>Contact</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "#fff",
    marginBottom: 12,
    elevation: 1,
  },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  avatarPlaceholder: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: "center", justifyContent: "center",
    backgroundColor: "#E5E7EB", // light gray circle
  },
  name: { fontSize: 16, fontWeight: "700" },
  sub: { color: "#64748B", marginTop: 2 },
  cta: { backgroundColor: "#10B981", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  ctaText: { color: "#fff", fontWeight: "700" },
});
