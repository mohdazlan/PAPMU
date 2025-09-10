import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const EVENTS = [
  { id: "e1", title: "Alumni Networking Mixer", when: "Sat, 25 Oct 2024 · 10:00 AM", where: "Politeknik Mukah Hall" },
  { id: "e2", title: "Career Development Workshop", when: "Sat, 2 Nov 2024 · 2:00 PM", where: "Online via Zoom" },
  { id: "e3", title: "Alumni Social Gathering", when: "Fri, 15 Nov 2024 · 6:00 PM", where: "Riverside Majestic Hotel" },
];

export default function Events() {
  const insets = useSafeAreaInsets();

  return (
    <FlatList
      data={EVENTS}
      keyExtractor={(i) => i.id}
      contentContainerStyle={{
        paddingTop: insets.top + 8,
        paddingBottom: insets.bottom + 16,
        paddingHorizontal: 16,
      }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.sub}>{item.when}</Text>
          <Text style={styles.sub}>{item.where}</Text>
          <TouchableOpacity style={styles.rsvp}>
            <Text style={styles.rsvpText}>RSVP</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: { gap: 6, padding: 12, borderRadius: 14, backgroundColor: "#fff", marginBottom: 12, elevation: 1 },
  title: { fontSize: 16, fontWeight: "700" },
  sub: { color: "#64748B" },
  rsvp: { alignSelf: "flex-start", backgroundColor: "#0EA5E9", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, marginTop: 6 },
  rsvpText: { color: "#fff", fontWeight: "700" },
});
