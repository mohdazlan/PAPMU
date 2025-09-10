import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const MENTORS = [
  { id: "m1", name: "Ahmad bin Hassan", field: "Engineering", bio: "Lead Mechanical Engineer, 10+ yrs", avatar: "https://i.pravatar.cc/100?img=5" },
  { id: "m2", name: "Nurul binti Ismail", field: "Business", bio: "E-commerce startup founder", avatar: "https://i.pravatar.cc/100?img=49" },
  { id: "m3", name: "Chong Wei Ling", field: "Technology", bio: "Software developer at tech company", avatar: "https://i.pravatar.cc/100?img=26" },
];

export default function Mentorship() {
  return (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={MENTORS}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.sub}>{item.field}</Text>
            <Text style={styles.sub}>{item.bio}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", gap: 12, padding: 12, borderRadius: 14, backgroundColor: "#fff", marginBottom: 12, elevation: 1 },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  name: { fontSize: 16, fontWeight: "700" },
  sub: { color: "#64748B", marginTop: 2 },
});
