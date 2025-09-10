import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PEOPLE = [
  { id: "1", name: "Ahmad bin Hassan", major: "Mechanical Eng, 2018", role: "Project Manager", avatar: "https://i.pravatar.cc/100?img=12" },
  { id: "2", name: "Nurul binti Ismail", major: "Civil Eng, 2017", role: "Site Engineer", avatar: "https://i.pravatar.cc/100?img=47" },
  { id: "3", name: "Mohd Ali Abdullah", major: "Electrical Eng, 2019", role: "Automation Specialist", avatar: "https://i.pravatar.cc/100?img=20" },
];

export default function Directory() {
  const insets = useSafeAreaInsets();

  return (
    <FlatList
      data={PEOPLE}
      keyExtractor={(i) => i.id}
      contentContainerStyle={{
        paddingTop: insets.top + 8,
        paddingBottom: insets.bottom + 16,
        paddingHorizontal: 16,
      }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.sub}>{item.major}</Text>
            <Text style={styles.sub}>{item.role}</Text>
          </View>
          <TouchableOpacity style={styles.cta}>
            <Text style={styles.ctaText}>Contact</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", gap: 12, padding: 12, borderRadius: 14, backgroundColor: "#fff", marginBottom: 12, elevation: 1 },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  name: { fontSize: 16, fontWeight: "700" },
  sub: { color: "#64748B", marginTop: 2 },
  cta: { backgroundColor: "#10B981", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, alignSelf: "center" },
  ctaText: { color: "#fff", fontWeight: "700" },
});
