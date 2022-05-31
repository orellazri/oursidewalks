import { StyleSheet, Text, View } from "react-native";

export default function ReportRow({ hazard_type, freetext, created_at }) {
  // Truncate freetext if needed
  if (freetext.length > 100) {
    freetext = freetext.substring(0, 100) + "...";
  }

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "left", fontSize: 17, fontFamily: "Assistant-Bold" }}>{hazard_type}</Text>
      <Text style={{ textAlign: "left" }}>{freetext}</Text>
      <Text style={{ textAlign: "left", fontSize: 14, color: "#444" }}>
        {created_at.toDate().toLocaleDateString("he-IL").replaceAll(".", "/")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: "flex-start",
  },
});
