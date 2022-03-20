import { SafeAreaView, Text, StyleSheet, View, TextInput } from "react-native";

import { useReport } from "../utils/ReportContext";

export default function ReportSummaryScreen({ navigation }) {
  const { photos, hazardType, freetext } = useReport();

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>סיכום הדיווח שלך</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F4F4F4",
  },
  title: {
    fontFamily: "Assistant-Bold",
    fontSize: 20,
    marginTop: 20,
  },
});
