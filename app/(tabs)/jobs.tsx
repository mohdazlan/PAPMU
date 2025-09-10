import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const JOBS = [
  { id: "j1", title: "Software Engineer", company: "Tech Solutions", city: "Kuala Lumpur", cover: "https://picsum.photos/seed/papmu1/90/60" },
  { id: "j2", title: "Graphic Designer", company: "Design Studio", city: "Petaling Jaya", cover: "https://picsum.photos/seed/papmu2/90/60" },
  { id: "j3", title: "Financial Analyst", company: "Finance Group", city: "Kuching", cover: "https://picsum.photos/seed/papmu3/90/60" },
];

export default function Jobs() {
  const insets = useSafeAreaInsets();

  return (
    <FlatList
      data={JOBS}
      keyExtractor={(i) => i.id}
      contentContainerStyle={{
        paddingTop: insets.top + 8,
        paddingBottom: insets.bottom + 16,
        paddingHorizontal: 16,
      }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.sub}>{item.company}</Text>
            <Text style={styles.sub}>{item.city}</Text>
          </View>
          <Image source={{ uri: item.cover }} style={styles.cover} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", gap: 12, padding: 12, borderRadius: 14, backgroundColor: "#fff", marginBottom: 12, elevation: 1, alignItems: "center" },
  title: { fontSize: 16, fontWeight: "700" },
  sub: { color: "#64748B", marginTop: 2 },
  cover: { width: 90, height: 60, borderRadius: 10 },
});
